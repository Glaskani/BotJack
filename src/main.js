const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const google = require("./commands/google.js");
const help = require("./commands/help.js");
const play = require("./commands/play.js");
const ping = require("./commands/ping.js");
const purge = require("./commands/purge.js");
const vole = require("./commands/vole.js");

client.on("ready", () => {
	console.log("--------------------------------------");
	client.user.setPresence( { game: { name: config.play,type: 0 }});
});

client.on("message", function (message) {
	let commandUsed =
		google.parse(message) ||
		play.parse(message) ||
		ping.parse(message) ||
		vole.parse(message) ||
		help.parse(message) ||
		purge.parse(message)
});

client.on("guildMemberAdd", member => {
	var role = member.guild.roles.find('name', config.rank);
	member.addRole(role)
});

client.login(config.token);
