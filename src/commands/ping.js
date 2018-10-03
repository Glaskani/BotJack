const Command = require("./command.js")
const Discord = require("discord.js");


module.exports = new Command("ping",function(message) {
	message.delete(4000)
	this.embed0arg(message, "🏓 Pong", "",'#318EEA',0);
	console.log("Commands ping demandée !");
});