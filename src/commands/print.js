const Discord = require("discord.js");

module.exports.embed = function (string, link) {
    var embed = new Discord.RichEmbed();
    //if (author !== undefined) {embed.setAuthor(author.username, author.avatarURL);};
    embed.setColor('#318EEA')
        .setDescription(string);
    //send the embed
    link.channel.send(embed)
    .catch(/*Error handling if the Message isn't returned, sent, etc.*/);
};
module.exports.logUser = function(string, link) {
    link.reply('Please show this message to the administrator of this server.```' + string + '```')
    .catch(/*Error handling if the Message isn't returned, sent, etc.*/);
};
module.exports.log = function(string, link) {
    var botChannel = link.guild.channels.find(channel => channel.name === "bot");
    botChannel.send('Log from ' + link.author.username + ', `' + string + '`')
    .catch(/*Error handling if the Message isn't returned, sent, etc.*/);
};
module.exports.reply = function(string, link) {
    link.reply(string + ' *This message auto delete in 10 seconds*')
    .then(msg => {
        msg.delete(10000)
    })
    .catch(/*Error handling if the Message isn't returned, sent, etc.*/);
};
module.exports.permission = function(string, link) {
    link.reply('You need the \`' + string + '\` role to use this command. *This message auto delete in 10 seconds*')
    .then(msg => {
        msg.delete(10000)
    })
    .catch(/*Error handling if the Message isn't returned, sent, etc.*/);
};