const Command = require('./command');
const Discord = require("discord.js");
const Print = require("./print.js");
const data = require("./data/data.json");
const config = require("../config.json");

var isPlay = false;
var dis;
var volume = 1.0;

function genDisp(message, path, gesFin) {
	var toEnd;
	switch(gesFin) {
		case 1:
			toEnd = function() {
				dis = connection.playFile(path);
			}
			break;
		default:
			toEnd= function() {
				isPlay = false;
			}
	}
	message.member.voiceChannel.join()
	.then(connection => {
		isPlay=true;
		dis = connection.playFile(path);
		dis.setvolume(volume);
		dis.on('end', toEnd);
	});
}

function getRandPlayFile() {
	return './commands/data/sonds/' + data.sonds[Math.floor(Math.random() * data.sonds.length)].path;
}

module.exports = new Command("play", function(message) {
	let str = 'fail to correctly execute the command';
	let usage = 'Usage: `play <meme>` play a meme\n'
		+ '       `play meme` list of availble meme\n'
		+ '       `play random` play a random meme\n'
		+ '       `play resume`\n'
		+ '       `play pause`\n'
		+ '       `play stop`\n'
		+ '       `play volume <value>[0.0 - 1.0]`\n';
	let msg = message.content.split(" ");
	let args = msg.slice(1);
	let author = message.author;
	let guild = message.guild;
	async function play() {Print.logUser("Error, the command is actually not available", message);return;
		//Help
		args.forEach(element => {if (element.toLowerCase() === 'help') {Print.reply(usage, message);return;}});
		//Verification
		if (!message.member.roles.find("name", config.botPlay)) {Print.permission(config.botPlay, message);return;} //Permission
		else if (!message.member.voiceChannel) {Print.reply('You need to join a voice channel first!', message);return;} //User not in voice channel
		else if (args.length < 1) {Print.reply('Argument missing', message);return;} //Args missings
		else if (args.length > 2) {Print.reply('Too much argument given', message);return;} //Args missings
		//Main methode
		if (args[0]=="volume" && args.length === 2) {
			Print.embed("🔊 Jack volume ", volume + " to " + args[1], message);
			str = 'succes, the volume change from ' + volume + " to " + args[1];
			volume = args[1];
		} else if (args[0] === "meme") {
			var txt = "";
			for (i=0; i < data.sonds.length; i++) {
				txt += data.sonds[i].name + "\n";
			}
			Print.embed('The availble meme are:\n', message);
			str = 'succes, print the meme list';
		} else if (!isPlay) {
			if (args[0] === "random") {
				var tmp = genDisp(message, getRandPlayFile(), 0);
			str = 'succes, play random meme';
			} else {
				str = 'succes, play the meme selected'; //not correct to place it there
				var find = false;
				var i = 0;
				while (!find && i < data.sonds.length) {
					find=msg[1]==data.sonds[i].name;
					i = find ? i : i+1 ;
				}
				if (find) {
					var ph = './commands/data/sonds/'+ data.sonds[i].path;
					var tmp = genDisp(message,ph,0);
				} else {Print.reply("The meme you ask for doesn't exist", message);return;}
			}
		} else if (isPlay) {
			if (args[0] === "stop") {
				dis.end();
				Print.embed("⏹ Stop Jack", message);
				str = 'succes, stop the bot';
			} else if (args[0] === "pause") {
				dis.pause();
				Print.embed("⏸ Jack pause", message);
				str = 'succes, pause the bot';
			} else if (args[0] === "resume") {
				dis.resume();
				Print.embed("▶️ Jack resume.", message);
				str = 'succes, resume the bot';
			}
		} else {Print.reply('You does something wrong\n' + usage, message);return;}
	} play();
	//Log the command call succes or the fail
	Print.log(msg[0] + ' command call, ' + str, message);
});
