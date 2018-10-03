const Command = require('./command')
const Discord = require("discord.js");
const data = require("./data/data.json")
var isPlay = false;
var dis;
var volu=1.0;

function genDisp(message,path,gesFin){
	var toEnd;
	switch(gesFin){
		case 1:
		toEnd= function(){
			dis = connection.playFile(path);
		}
			break;
		case 0:
		default:
			toEnd= function(){
				//setTimeout(test(message), 10000);
				isPlay=false;
			}
	}
	
	message.member.voiceChannel.join()
	.then(connection => {
		isPlay=true;
		dis = connection.playFile(path);
		dis.setVolume(volu);
		dis.on('end',toEnd);
	});
}

function test (message,t){
	message.member.voiceChannel.leave()
}

function getRandPlayFile(){
	return './commands/data/sonds/'+data.sonds[Math.floor(Math.random() * data.sonds.length)].path;
}

module.exports = new Command("jack",function(message) {
	if (!message.member.roles.find("name", "bot-jack")) { 
		message.reply('You need the \`bot-jack\` role to use this command.');
	} else {
		var msg = message.content.split(" ");
		if (message.member.voiceChannel && msg[1]=="volume" && msg.length==3){
			this.embed0arg(message, "🔊 Jack volume ", volu + " to " + msg[2],'#318EEA',0);
			volu = msg[2]
		} 
		else if (message.member.voiceChannel && msg[1]=="meme"){
			var txt = ""
			for(i=0;i<data.sonds.length;i++){
				txt += data.sonds[i].name + "\n";
			}
			this.embed1arg(message,"Les memes disponibles :",txt,'#FF0080',1)
		}
		else if (message.member.voiceChannel && !isPlay) {
			if(msg[1]=="random"){
				var tmp = genDisp(message,getRandPlayFile(),0);
				//this.embed0arg(message,msg[1], ' is back','#318EEA',0);
			} 
			else {
				var find=false;
				var i=0;
				while(!find && i<data.sonds.length){
					find=msg[1]==data.sonds[i].name;
					i = find ? i : i+1 ;
				}
				if(find){
					var ph = './commands/data/sonds/'+ data.sonds[i].path;
					var tmp = genDisp(message,ph,0);
					//this.embed0arg(message, msg[1], ' is back','#318EEA',0);
				} else {
					message.reply("\nThe meme doesn't exist, if you need help type : help jack and jack meme")
				}
			}
		}
		else if(message.member.voiceChannel && isPlay){
			if (msg[1]=="stop") {
				dis.end();
				this.embed0arg(message, "⏹ Stop Jack.", "",'#318EEA',0)
			} else if (msg[1]=="pause") {
				dis.pause();
				this.embed0arg(message, "⏸ Jack pause.", "",'#318EEA',0)
			} else if (msg[1]=="resume") {
				dis.resume();
				this.embed0arg(message, "▶️ Jack resume.", "",'#318EEA',0)
			} else{
				message.reply(message + "\nThe command doesn't exist or Jack is already here, if you need help type : help jack");
			}
		}
		else if (!message.member.voiceChannel){
			this.embed1arg(message, 'Error !','You need to join a voice channel first !','#FF0000',0)
		}
		else {
			message.reply('Error contact someone.');
		} 
	}
	message.delete(4000);
	console.log("Commande Jack call !")
});