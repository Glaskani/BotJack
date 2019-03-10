const Command = require("./command.js")
const Discord = require("discord.js");


module.exports = new Command("vole",function(message) {
  async function vole() {
        let msg = message.content.split(" ");
        let args = msg.slice(1);
        const guild = message.guild;
        const messageMentions = message.mentions.users.array();
        const channel = guild.channels.array();
        const userVoiceRoomID = message.member.voiceChannelID;
        if (!message.member.roles.find("name", "bot-commander")) {
            message.reply('You need the \`bot-commander\` role to use this command.');
            return;
        } else if (args < 1) {
            message.channel.send('I think you forgot to @mention someone?');
        }
        console.log(userVoiceRoomID)
        for (var i = 0; i < messageMentions.length; i++) {
            for (var j = 0; j < channel.length; j++) {
                if (channel[j].type === "voice" && channel[j].id !== userVoiceRoomID) {
                    console.log(channel[j]);
                    guild.member(messageMentions[i].id).setVoiceChannel(channel[j].id);
                }
            }
            guild.member(messageMentions[i].id).setVoiceChannel(userVoiceRoomID);
        }
  }
  vole();
  message.delete();
  console.log("Commande vole call !")
});
