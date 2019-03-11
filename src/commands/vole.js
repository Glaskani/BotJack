const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");

module.exports = new Command("vole", function(message) {
    async function vole() {
        let msg = message.content.split(" ");
        let args = msg.slice(1);
        let author = message.author;
        let guild = message.guild;
        //Verification
        if (!message.member.roles.find("name", "bot-commander")) {Print.permission("bot-commander", message);return;} //Permission
        else if (args.length < 1 || args.length > 1) {Print.reply('Only one argument can be taken.\nUsage: `vole <@mention>`', message);return;} //Arg missing
        else if (message.mentions.users.array()[0] === undefined) {Print.reply('Please @mention someone to be elected?\nUsage: `vole <@mention>`', message);return;} //There is no Mention found
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
        Print.log(msg[0] + " command call, " + messageMentions + ', has been elected!', message);
  } vole();
});
