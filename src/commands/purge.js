const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");

module.exports = new Command("purge", function(message) {
    async function purge() {
        let msg = message.content.split(" ");
        let args = msg.slice(1);
        let author = message.author;
        let guild = message.guild;
        //Verification
        if (!message.member.roles.find("name", "bot-commander")) {Print.permission("bot-commander", message);return;} //Permission
        else if (args.length < 1 || args.length > 1) {Print.reply('Only one argument can be taken.\nUsage: `purge <amount>`', message);return;} //Arg missing
        else if (isNaN(args[0]) || args[0]< 2 || args[0]> 100) {Print.reply('Please enter a number between 2 and 100.\nUsage: `purge <amount>`', message);return;} //Arg not correct
        //Main methode
        const fetched = await message.channel.fetchMessages({limit: args[0]});
        message.channel.bulkDelete(fetched);
        Print.embed(fetched.size + ' Messages found and delete', message);
        Print.log(msg[0] + " command call, " + fetched.size + ' Messages found and delete, in the ' + message.channel.name + " channel", message);
    } purge();
});