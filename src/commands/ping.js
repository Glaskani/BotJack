const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");

module.exports = new Command("ping", function(receivedMessage, primaryCommand, argumentsCommand) {
	receivedMessage.channel.send("Pinging ...")
		.then((msg) => {
			msg.edit("<@" + receivedMessage.author.id + ">, pong: " + (Date.now() - msg.createdTimestamp + 'ms'))
		}).catch(error => Print.logUser(error, receivedMessage));
		receivedMessage.delete(1000).catch(error => Print.logUser(error, receivedMessage));
	return 0;
});
