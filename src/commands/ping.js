const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");

module.exports = new Command("ping", function(message) {
	let str = 'fail to correctly execute the command';
	let usage = 'Usage: `ping`';
	let msg = message.content.split(" ");
	let args = msg.slice(1);
	let author = message.author;
	let guild = message.guild;
	async function ping() {
		//Help
		args.forEach(element => {if (element.toLowerCase() === 'help') {Print.reply(usage, message);return;}});
		//Main methode
		message.channel.send("Pinging ...")
			.then((msg) => {
				msg.edit("<@" + author.id + ">, pong: " + (Date.now() - msg.createdTimestamp + 'ms'))
			}).catch(error => Print.logUser(error, message));
		message.delete(100).catch(error => Print.logUser(error, message));
		str = 'succes';
	} ping();
	//Log the command call succes or the fail
	Print.log(msg[0] + ' command call, ' + str, message);
});
