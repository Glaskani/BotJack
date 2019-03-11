const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");
const config = require("../config.json");
const commandJson = require("../command.json");

module.exports = new Command("fly", function(message) {
    let str = 'fail to correctly execute the command';
    let msg = message.content.split(" ");
    let args = msg.slice(1);
    let guild = message.guild;
    async function fly() {
        //Help
        for (let index=0; index < args.length; index++) {if (args[index].toLowerCase() === 'help') {
            Print.reply(commandJson.fly.usage + commandJson.inBetween + commandJson.fly.description, message);return;}}
        //Verification
        if (!message.member.roles.find("name", config.botCommander)) {Print.permission(config.botCommander, message);str = commandJson.strPermission;return;} //Permission
        else if (args.length  != 1) {Print.reply('Only one argument can be taken\n' + commandJson.fly.usage, message);return;} //Arg missing
        else if (message.mentions.users.array()[0] === undefined) {Print.reply('Please @mention someone that will be elected?\n' + commandJson.fly.usage, message);return;} //There is no Mention found
        //Main methode
        const messageMentions = message.mentions.users.array()[0];
        const channel = guild.channels.array();
        const userVoiceRoom = message.member.voiceChannelID;
        for (var j = 0; j < channel.length; j++) {
            if (channel[j].type === "voice" && channel[j].id !== userVoiceRoom) {
                guild.member(messageMentions.id).setVoiceChannel(channel[j].id).catch(error => Print.logUser(error, message));;
            }
        }
        guild.member(messageMentions.id).setVoiceChannel(userVoiceRoom).catch(error => Print.logUser(error, message));;
        Print.embed("Elected", messageMentions + ', has been elected!', message, false);
        str = 'succes, ' + messageMentions.username +', has been elected!';
  } fly();
  //Log the command call succes or the fail
  Print.log(msg[0] + ' ' + args.toString().replace(/,/g, ' ') + ' command call, ' + str, message);
});
