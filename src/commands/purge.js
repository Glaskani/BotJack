const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");
const config = require("../config.json");

module.exports = new Command("purge", function(message) { //Error log
    let str = 'fail to correctly execute the command';
    let usage = 'Usage: `purge <amount> <@mention>[Optional]`';
    let msg = message.content.split(" ");
    let args = msg.slice(1);
    let author = message.author;
    let guild = message.guild;
    function log(string) {
        Print.log(msg[0] + ' command call, ' + string, message);
    }
    async function purge() {
        //Help
        args.forEach(element => {if (element.toLowerCase() === 'help') {Print.reply(usage, message);return;}});
        //Verification
        if (!message.member.roles.find("name", config.botCommander)) {Print.permission(config.botCommander, message);str = "fail, the user don't have the permission require";log(str);return;} //Permission
        else if (args.length < 1) {Print.reply('Argument missing\n' + usage, message);log(str);return;} //Arg missing
        else if (args.length > 2) {Print.reply('Too much argument given\n' + usage, message);log(str);return;} //Args missings
        else if (isNaN(args[0])) {Print.reply('The first argument must be a number\n' + usage, message);log(str);return;} //Args incorrect
        else if (isNaN(args[0]) || args[0] < 2 || args[0] > 100) {Print.reply('Please enter a number between 2 and 100\n' + usage, message);log(str);return;} //Arg not correct
        //Main methode
        const fetched = await message.channel.fetchMessages({limit: args[0]})
            .catch(error => Print.logUser(error, message));;
        message.channel.bulkDelete(fetched)
            .catch(error => Print.logUser(error, message));
        Print.replyNoDelete(fetched.size + ' messages found and delete', message);
        str = 'succes, ' + fetched.size +' messages found and delete';
        log(str);
    } purge();
});
