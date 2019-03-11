const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");
const config = require("../config.json");

module.exports = new Command("help",function(message) {
    let str = 'fail to correctly execute the command';
    let usage = 'Usage: `help`';
    let msg = message.content.split(" ");
    let args = msg.slice(1);
    let author = message.author;
    let guild = message.guild;
    async function help() {
        console.log("test");
        //Help
        args.forEach(element => {if (element.toLowerCase() === 'help') {Print.reply(usage, message);return;}});
        //Main methode
        var embed = new Discord.RichEmbed();
        embed.setColor(config.embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .addField("Command for everyone:",'- help: `help`\n- ping: `ping`\n- google: `google <research>`\n- invite: `invite`\n')
            .addField("Command for the elit:",'- fly: `fly <@mention>`\n- purge: `purge <amount> <@mention>[Optional]`\n');
        //send the embed
        message.channel.send(embed).catch(error => Print.logUser(error, message));;
        message.delete(100).catch(error => Print.logUser(error, message));;
        str = 'succes';
    } help();
    //Log the command call succes or the fail
    Print.log(msg[0] + ' command call, ' + str, message);
});
