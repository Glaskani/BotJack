const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");
const config = require("../config.json");
const commandJson = require("../command.json");

module.exports = new Command("help", function(receivedMessage, primaryCommand, argumentsCommand) {
    var embed = new Discord.RichEmbed();
    let res = '';
    let res1 = '';
    for (let i=0; i < commandJson.length; i++) {
        if (commandJson[i].permission == '') {
            res += '- ' + commandJson[i].name + ': ' + commandJson[i].usage + ' -- ' + commandJson[i].description + ' \n';
        }
    }
    for (let i=0; i < commandJson.length; i++) {
        if (commandJson[i].permission == 'botCommander') {
            res1 += '- ' + commandJson[i].name + ': ' + commandJson[i].usage + ' -- ' + commandJson[i].description + ' \n';
        }
    }

    embed.setColor(config.embedColor)
        .setAuthor(receivedMessage.author.username, receivedMessage.author.avatarURL)
        .addField("Command for everyone:", res)
        .addField("Command for the elite:", res1);
    receivedMessage.author.send(embed).catch(error => Print.logUser(error, receivedMessage));
    receivedMessage.delete(100).catch(error => Print.logUser(error, receivedMessage));
    return 0;
});
