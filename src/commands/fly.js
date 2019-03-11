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
        args.forEach(element => {if (element.toLowerCase() === 'help') {Print.reply(usage, message);return;}});
        //Verification
        if (!message.member.roles.find("name", config.botCommander)) {Print.permission(config.botCommander, message);str = "fail, the user don't have the permission require";return;} //Permission
        else if (args.length  != 1) {Print.reply('Only one argument can be taken\n' + usage, message);return;} //Arg missing
        else if (message.mentions.users.array()[0] === undefined) {Print.reply('Please @mention someone that will be elected?\n' + usage, message);return;} //There is no Mention found
        //else if (message.mentions.users.array()[0].roles.find("name", config.botWhiteList)) {Print.reply('This user cannot fly', message);return;} //Permission
        //Main methode
        const messageMentions = message.mentions.users.array()[0];
        const channel = guild.channels.array();
        const userVoiceRoom = message.member.voiceChannelID;
        Print.embed("Elected", messageMentions + ', has been elected!', message, false);
        for (var j = 0; j < channel.length; j++) {
            if (channel[j].type === "voice" && channel[j].id !== userVoiceRoom) {
                guild.member(messageMentions.id).setVoiceChannel(channel[j].id).catch(error => Print.logUser(error, message));;
            }
        }
        guild.member(messageMentions.id).setVoiceChannel(userVoiceRoom).catch(error => Print.logUser(error, message));;
        str = 'succes, ' + messageMentions.username +', has been elected!';
  } fly();
  //Log the command call succes or the fail
  Print.log(msg[0] + ' command call, ' + str, message);
});
