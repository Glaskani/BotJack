const Discord = require("discord.js");
const client = new Discord.Client();
//const logger = new Discord.Client();
const Command = require("./commands/command.js")
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
	client.user.setPresence({game: {name: config.prefix + 'help'}, status: 'online'}).catch();
});

client.on("message", message => {
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
	member.send(new Discord.RichEmbed().setColor(config.embedColor).addField('Welcome', "Welcome to this server, you can use the command help if you need me or ²help if you need Rythm for the music.")).catch();
	let ask = ' <@'+member.guild.ownerID+'>, message for the administrator of this server\n';
	if (config.rank == "") {
		member.guild.members.find(m => m.id === member.guild.ownerID).send(ask + "Error: rank is not defined in 'config.json'").catch();
		member.send("You role can't be added, please contact an administrator\nError: rank is not defined in 'config.json'").catch();
    } else {
        let role = member.guild.roles.find('name', config.rank);
        if (role === null) {
			member.guild.members.find(m => m.id === member.guild.ownerID).send(ask + "Error: " + role + " was not found on this server'").catch();
            member.send("You role can't be added, please contact an administrator\nError: " + role + " was not found on this server'").catch();
        } else {
			member.addRole(role).catch();
		}
    }
});

client.login(config.token);
//logger.login(config.tokenLogger)
