const Command = require("./command.js")
const Discord = require("discord.js");

module.exports = new Command("ping", function(receivedMessage, primaryCommand, argumentsCommand) {
	receivedMessage.channel.send("Pinging ...")
		.then((msg) => {
			msg.edit("<@" + receivedMessage.author.id + ">, pong: " + (Date.now() - msg.createdTimestamp + 'ms'))
		}).catch(error => Command.logError(error, receivedMessage));
	return 0;
});
