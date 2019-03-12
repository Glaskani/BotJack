const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");
const config = require("../config.json");

module.exports = new Command("broadcast", function(receivedMessage, primaryCommand, argumentsCommand) {
    let guild = receivedMessage.guild;
    if (argumentsCommand.length < 1) {return 3}
    let embed = new Discord.RichEmbed()
        .setColor(config.embedColor)
        .addField('Broadcast', argumentsCommand.toString().replace(/,/g, ' '));
    const channels = guild.channels.array();
    for (var j=0; j < channels.length; j++) {
        if (channels[j].type === "text") {
            channels[j].send(embed).catch(error => Print.logUser(error, receivedMessage));
        }
    }
    receivedMessage.delete(100).catch(error => Print.logUser(error, receivedMessage));
    return "'" + argumentsCommand.toString().replace(/,/g, ' ') + "' has been broadcast in all text channels";
});
