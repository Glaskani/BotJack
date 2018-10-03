const Command = require("./command.js")
const Discord = require("discord.js");


module.exports = new Command("pong",function(message) {
	message.delete(4000)
	this.embed0arg(message, "🏓 Ping", "",'#318EEA',0);
	console.log("Commands pong demandée !");
});