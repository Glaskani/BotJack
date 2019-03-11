const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");

module.exports = new Command("ping", function(message) {
	let msg = message.content.split(" ");
	Print.log(msg[0] + " command call", message);
    let args = msg.slice(1);
    let author = message.author;
	let guild = message.guild;
	//Main methode
	Print.embed('🏓 Pong', message);
});