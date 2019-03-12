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
const broadcast = require("./commands/broadcast.js");
const info = require("./commands/info.js");
const flip = require("./commands/flip.js");

client.on("ready", () => {
	console.log("--------------------------------------");
	client.user.setPresence({ game: { name: config.play,type: 0 }});
});

client.on("message", function(message) {
	console.log(message);
	if (message.author.bot) {return} //if(message.author.id === client.user.id) return;
	if (message.guild === null) { //verifier avec DMchanel plutot
		message.reply("I can't answer you in private")    
		.then(msg => {
			msg.delete(10000)
		}).catch();;
		return;
	}
	let commandUsed =
		google.parse(message) ||
		info.parse(message) ||
		play.parse(message) ||
		ping.parse(message) ||
		fly.parse(message) ||
		help.parse(message) ||
		invite.parse(message) ||
		dice.parse(message) ||
		flip.parse(message) ||
		broadcast.parse(message) ||
		purge.parse(message);
});

client.on("guildMemberAdd", member => {
	var role = member.guild.roles.find('name', config.rank);
	member.addRole(role);
	member.send("Welcome to this server, you can use the command help if you need me or ²help if you need Rythm for the music");
});

client.login(config.token);
