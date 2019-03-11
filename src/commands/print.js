const Discord = require("discord.js");
const config = require("../config.json");

function deleteInfo(time) {
  return ' *auto delete in ' + time + ' seconds*';
}

module.exports.embed = function (title, string, link, authorBol) {
    var embed = new Discord.RichEmbed();
    if (authorBol) {embed.setAuthor(link.author.username, link.author.avatarURL);};
    embed.setColor(config.embedColor)
        .addField(title, string);
    //send the embed
    link.channel.send(embed)
        .catch(/*Error handling if the Message isn't returned, sent, etc.*/);
    link.delete(100);
};
module.exports.logUser = function(string, link) {
    var botChannel = link.guild.channels.find(channel => channel.name === config.botChannel);
    var res = 'Please show this message to the administrator of this server```' + string + '```';
    link.reply(res)
        .catch();
    botChannel.send(res)
        .catch();
    console.log('Error: ' + string);
};
module.exports.log = function(string, link) {
    var botChannel = link.guild.channels.find(channel => channel.name === config.botChannel);
    var res = '**Log**: Request by *' + link.author.username + '*, in *' + link.channel.name + '*, `' + string + '`';
    botChannel.send(res)
        .catch();
    console.log(res);
};
module.exports.reply = function(string, link) {
    link.reply(string + deleteInfo(10))
    .then(msg => {
        msg.delete(9000)
    }).catch();
    link.delete(10000).catch();
};
module.exports.replyNoDelete = function(string, link) {
    link.reply(string + deleteInfo(10))
    .then(msg => {
        msg.delete(10000)
    }).catch();
};
module.exports.permission = function(string, link) {
    link.reply('You need the \`' + string + '\` role to use this command,' + deleteInfo(10))
    .then(msg => {
        msg.delete(9000)
    }).catch();
    link.delete(10000); //Deleting the user message
};
