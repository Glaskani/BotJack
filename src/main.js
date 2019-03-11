const Discord = require("discord.js");
const client = new Discord.Client();
const Print = require("./commands/print.js");
const config = require("./config.json");
const google = require("./commands/google.js");
const help = require("./commands/help.js");
const play = require("./commands/play.js");
const ping = require("./commands/ping.js");
const purge = require("./commands/purge.js");
const fly = require("./commands/fly.js");
const dice = require("./commands/dice.js");
const invite = require("./commands/invite.js");

client.on("ready", () => {
	console.log("--------------------------------------");
	client.user.setPresence({ game: { name: config.play,type: 0 }});
});

client.on("message", function(message) {
	let commandUsed =
		google.parse(message) ||
		play.parse(message) ||
		ping.parse(message) ||
		fly.parse(message) ||
		help.parse(message) ||
		invite.parse(message) ||
		dice.parse(message) ||
		purge.parse(message);
});

client.on("guildMemberAdd", member => {
	var role = member.guild.roles.find('name', config.rank);
	member.addRole(role);
	member.send("Welcome to this server, you can user help if you need me or ²help if you need Rythm");
});

client.login(config.token);
