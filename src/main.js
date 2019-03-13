const Discord = require("discord.js");
const client = new Discord.Client();
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
	client.user.setPresence({ game: { name: config.play,type: 0 }});
});

client.on("message", function(message) {
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

/*client.on("guildMemberAdd", member => {
	member.send(new Discord.RichEmbed().setColor(config.embedColor).addField('Welcome', "Welcome to this server, you can use the command help if you need me or ²help if you need Rythm for the music")).catch();
	if (config.rank !== '') {
		var role = member.guild.roles.find('name', config.rank);
		if (role === null) {
			Command.logError("Error: botChannel was not found on this server", link);
		} else {
			member.addRole(role).catch();
		}
	} else {
		member.send("You role can't be added, please contact an administrator");
		//Get the Admin private chat
		if (config.adminID !== "") {
			var adminPrivateChannel = link.guild.members.find(m => m.id === config.adminID);
			if (adminPrivateChannel === null) {
				Command.logError("Error: adminID was not found on this server", link);
			} else {
				adminPrivateChannel.send(res + '**Log**: Request by *' + link.author.username + '*, in *' + link.channel.name + '*').catch();
			}
		}
	}
});*/

client.login(config.token);
