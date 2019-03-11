const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");
const config = require("../config.json");
const commandJson = require("../command.json");

module.exports = new Command("help",function(message) {
    let str = 'fail to correctly execute the command';
    let msg = message.content.split(" ");
    let args = msg.slice(1);
    let author = message.author;
    let guild = message.guild;
    async function help() {
        //Help
        for (let index=0; index < args.length; index++) {if (args[index].toLowerCase() === 'help') {
            Print.reply(commandJson.help.usage + commandJson.inBetween + commandJson.help.description, message);return;}}
        //Main methode
        var embed = new Discord.RichEmbed();
        embed.setColor(config.embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .addField("Command for everyone:",'- help: `help`'+commandJson.inBetween+commandJson.help.description+'\n- ping: `ping`'+commandJson.inBetween+commandJson.ping.description+'\n- google: `google <research>`'+commandJson.inBetween+commandJson.google.description+'\n- dice: `dice <max>`'+commandJson.inBetween+commandJson.dice.description+'\n- invite: `invite`'+commandJson.inBetween+commandJson.invite.description+'\n')
            .addField("Command for the elite:",'- fly: `fly <@mention>`'+commandJson.inBetween+commandJson.fly.description+'\n- purge: `purge <amount> <@mention>[Optional]`'+commandJson.inBetween+commandJson.purge.description+'\n');
        //send the embed
        message.channel.send(embed).catch(error => Print.logUser(error, message));;
        message.delete(100).catch(error => Print.logUser(error, message));;
        str = 'succes';
    } help();
    //Log the command call succes or the fail
    Print.log(msg[0] + ' ' + args.toString().replace(/,/g, ' ') + ' command call, ' + str, message);
});
