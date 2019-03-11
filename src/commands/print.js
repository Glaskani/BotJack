const Discord = require("discord.js");
const config = require("../config.json");

function deleteInfo(time) {
  return ' `*auto delete in ' + time + ' seconds*`';
}

function errorSend(string, link) {};

module.exports.embed = function (string, link, authorBol) {
    var embed = new Discord.RichEmbed();
    if (author !== undefined || authorBol) {embed.setAuthor(link.author.username, link.author.avatarURL);};
    embed.setColor(confid.embedColor)
        .setDescription(string);
    //send the embed
    link.channel.send(embed)
        .catch(error => errorSend(error, link));
    link.delete(100); //Deleting the user message
};
module.exports.logUser = function(string, link) {
    var botChannel = link.guild.channels.find(channel => channel.name === config.botChannel);
    var res = 'Please show this message to the administrator of this server```' + string + '```';
    link.reply(res)
        .catch(error => errorSend(error, link));
    botChannel.send(res)
        .catch(error => errorSend(error, link));
    console.log('Error: ' + string);
};
module.exports.log = function(string, link) {
    var botChannel = link.guild.channels.find(channel => channel.name === config.botChannel);
    var res = '**Log**: Request by *' + link.author.username + '*, in *' + link.channel.name + '*, `' + string + '`';
    botChannel.send(res)
        .catch(error => errorSend(error, link));
    console.log(res);
};
module.exports.reply = function(string, link) {
    link.reply(string + deleteInfo(10))
    .then(msg => {
        msg.delete(10000)
    }).catch(error => errorSend(error, link));
    link.edit(link.toString() + ' ,' + deleteInfo(10));
    link.delete(10000);
};
module.exports.permission = function(string, link) {
    link.reply('You need the \`' + string + '\` role to use this command,' + deleteInfo(10))
    .then(msg => {
        msg.delete(10000)
    }).catch(error => errorSend(error, link));
    link.delete(100); //Deleting the user message
};
