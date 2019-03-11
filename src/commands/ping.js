const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");
const commandJson = require("../command.json");

module.exports = new Command("ping", function(message) {
	let str = 'fail to correctly execute the command';
	let msg = message.content.split(" ");
	let args = msg.slice(1);
	let author = message.author;
	let guild = message.guild;
	async function ping() {
		//Help
		for (let index=0; index < args.length; index++) {if (args[index].toLowerCase() === 'help') {
            Print.reply(commandJson.ping.usage + commandJson.inBetween + commandJson.ping.description, message);return;}}
		//Main methode
		message.channel.send("Pinging ...")
			.then((msg) => {
				msg.edit("<@" + author.id + ">, pong: " + (Date.now() - msg.createdTimestamp + 'ms'))
			}).catch(error => Print.logUser(error, message));
		message.delete(100).catch(error => Print.logUser(error, message));
		str = 'succes';
	} ping();
	//Log the command call succes or the fail
	Print.log(msg[0] + ' ' + args.toString().replace(/,/g, ' ') + ' command call, ' + str, message);
});
