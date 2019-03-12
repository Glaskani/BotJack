const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");

module.exports = new Command("fly", function(receivedMessage, primaryCommand, argumentsCommand) {
    let guild = receivedMessage.guild;
    if (argumentsCommand.length  != 1) {return 7} //Arg missing
    else if (receivedMessage.mentions.users.array()[0] === undefined) {return 10} //There is no Mention found

    const messageMentions = receivedMessage.mentions.users.array()[0];
    const channels = guild.channels.array();
    const userVoiceRoom = receivedMessage.member.voiceChannelID;
    for (var j = 0; j < channels.length; j++) {
        if (channels[j].type === "voice" && channels[j].id !== userVoiceRoom) {
            guild.member(messageMentions.id).setVoiceChannel(channels[j].id).catch(error => Print.logUser(error, receivedMessage));
        }
    }
    guild.member(messageMentions.id).setVoiceChannel(userVoiceRoom).catch(error => Print.logUser(error, receivedMessage));
    Print.embed("Elected", messageMentions + ', has been elected!', receivedMessage, false);
    return messageMentions.username + ', has been elected!';
});
