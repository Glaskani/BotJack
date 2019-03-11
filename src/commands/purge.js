const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");
const config = require("../config.json");

module.exports = new Command("purge", function(message) {
    let str = 'fail to correctly execute the command';
    let usage = 'Usage: `purge <amount> <@mention>[Optional]`';
    let msg = message.content.split(" ");
    let args = msg.slice(1);
    let author = message.author;
    let guild = message.guild;
    async function purge() {
        //Help
        args.forEach(element => {if (element.toLowerCase() === 'help') {Print.reply(usage);return;}});
        //Verification
        if (!message.member.roles.find("name", config.botCommander)) {Print.permission(config.botCommander, message);return;} //Permission
        else if (args < 1) {Print.reply('Argument missing\n' + usage, message);return;} //Arg missing
        else if (args > 2) {Print.reply('Too much argument given\n' + usage, message);return;} //Args missings
        else if (isNaN(args[0]) || args[0] < 2 || args[0] > 100) {Print.reply('Please enter a number between 2 and 100\n' + usage, message);return;} //Arg not correct
        //Main methode
        const messageMentions = message.mentions.users.array()[0];
        if (messageMentions !== undefined) { //Mention present

        } else {
            const fetched = await message.channel.fetchMessages({limit: args[0]});
            message.channel.bulkDelete(fetched)
                .catch(error => Print.logUser(error, message));
            Print.reply(fetched.size + ' messages found and delete', message);
            str = 'succes, ' + fetched.size +' messages found and delete, in the ' + message.channel.name + ' channel';
        }
    } purge();
    //Log the command call succes or the fail
    Print.log(msg[0] + ' command call, ' + str, message);
});
