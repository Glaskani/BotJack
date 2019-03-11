const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");
const config = require("../config.json");

module.exports = new Command("fly", function(message) {
    let str = 'fail to correctly execute the command';
    let usage = 'Usage: `fly <@mention>`';
    let msg = message.content.split(" ");
    let args = msg.slice(1);
    let author = message.author;
    let guild = message.guild;
    async function fly() {
        //Help
        args.forEach(element => {if (element.toLowerCase() === 'help') {Print.reply(usage);return;}});
        //Verification
        if (!message.member.roles.find("name", config.botCommander)) {Print.permission(config.botCommander, message);return;} //Permission
        else if (args < 1 || args > 1) {Print.reply('Only one argument can be taken\n' + usage, message);return;} //Arg missing
        else if (message.mentions.users.array()[0] === undefined) {Print.reply('Please @mention someone that will be elected?\n' + usage, message);return;} //There is no Mention found
        //else if (message.mentions.users.array()[0].roles.find("name", config.botWhiteList)) {Print.reply('This user cannot fly', message);return;} //Permission
        //Main methode
        const messageMentions = message.mentions.users.array()[0];
        const channel = guild.channels.array();
        const userVoiceRoom = message.member.voiceChannelID;
        Print.embed(messageMentions + ', has been elected!', message);
        for (var j = 0; j < channel.length; j++) {
            if (channel[j].type === "voice" && channel[j].id !== userVoiceRoom) {
                guild.member(messageMentions.id).setVoiceChannel(channel[j].id);
            }
        }
        guild.member(messageMentions.id).setVoiceChannel(userVoiceRoom);
        str = 'succes';
  } fly();
  //Log the command call succes or the fail
  Print.log(msg[0] + ' command call, ' + str, message);
});
