const Command = require("./command.js")
const Discord = require("discord.js");

module.exports = new Command("purge",function(message) {
    async function purge() {
        let msg = message.content.split(" ");
        let args = msg.slice(1);
            message.delete(); 
            if (!message.member.roles.find("name", "bot-commander")) { 
                message.reply('You need the \`bot-commander\` role to use this command.');
                return; 
            }
            else if ((msg[1])==!'jack') {
                message.reply('Please use a number as your arguments, You must provide at least 2 and at most 100 messages. \n Usage: purge <amount>'); 
                return;
            }
            else if ((msg[1])=='jack') {
                //let botmsg = message.author.client;
                const test = await message.channel.fetchMessages().then(messages => messages.map(m => m.author.client))
                message.channel.bulkDelete(test)

                var help_embed = new Discord.RichEmbed()
                    .setColor('#318EEA')
                    .setDescription('Messages jack found and delete')
                message.channel.sendEmbed(help_embed);
                return;
            }
            else if (isNaN(args[0]) || (args[0])==1 || (args[0])==0 || (msg[1])==!'jack') {
                message.reply('Please use a number as your arguments, You must provide at least 2 and at most 100 messages. \n Usage: purge <amount>'); 
                return;
            } 
            const fetched = await message.channel.fetchMessages({limit: args[0]}); 
            console.log(fetched.size + ' messages found'); 
            message.channel.bulkDelete(fetched)
            var help_embed = new Discord.RichEmbed()
                .setColor('#318EEA')
                .setDescription(fetched.size + ' Messages found and delete')
            message.channel.sendEmbed(help_embed);
    }
    purge();
    console.log("Commande purge call !")
});