const Command = require("./command.js")
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = new Command("info", function(receivedMessage, primaryCommand, argumentsCommand) {
    if (argumentsCommand.length  != 1) {return 7} //Arg missing
    else if (receivedMessage.mentions.users.array()[0] === undefined) {return 10} //There is no Mention found

    const messageMentions = receivedMessage.mentions.users.array()[0];
    var embed = new Discord.RichEmbed();

    embed.setColor(config.embedColor)
        .setAuthor(messageMentions.username, messageMentions.avatarURL)
        .setThumbnail(messageMentions.avatarURL)
        .setTitle("Information about " + messageMentions.username)
        .addField("presence", messageMentions.presence.status)
        .addField("isBot", messageMentions.bot)
        .addField("createdAt", messageMentions.createdAt)
        .addField("discriminator", messageMentions.discriminator)
        .addField("id", messageMentions.id)
        .addField("note", messageMentions.note)
        .addField("tag", messageMentions.tag);
    receivedMessage.author.send(embed).catch(error => Command.logError(error, receivedMessage));
    return 'send information of ' + messageMentions.username;
});
