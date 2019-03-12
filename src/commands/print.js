const Discord = require("discord.js");
const config = require("../config.json");

function deleteInfo(time) {
  return ' *auto delete in ' + time + ' seconds*';
}

function logUserP(string, link) {
    var botChannel = link.guild.channels.find(channel => channel.name === config.botChannel);
    if (botChannel === null) {link.reply('please show this message to the administrator of this server``` Error: In the Print file, the channel ' + config.botChannel + ' doest existe```', link);return;};
    var res = 'please show this message to the administrator of this server```' + string + '```';
    link.reply(res)
        .catch();
    botChannel.send(res)
        .catch();
    console.log('Error: ' + string);
};
function embedP(title, string, link, authorBol) {
    var embed = new Discord.RichEmbed();
    if (authorBol) {embed.setAuthor(link.author.username, link.author.avatarURL);};
    embed.setColor(config.embedColor).addField(title, string);
    link.channel.send(embed).catch(/*Error handling if the Message isn't returned, sent, etc.*/);
    link.delete(100);
};
function logP(string, link) {
    var botChannel = link.guild.channels.find(channel => channel.name === config.botChannel);
    if (botChannel === null) {logUserP('Error: In the Print file, the channel ' + config.botChannel + ' doest existe', link);return;};
    var res = '**Log**: Request by *' + link.author.username + '*, in *' + link.channel.name + '*, ' + string;
    botChannel.send(res).catch(/*Error handling if the Message isn't returned, sent, etc.*/);
    console.log(res);
};
function replyP(string, link) {
    link.reply(string + deleteInfo(10))
    .then(msg => {
        msg.delete(9000)
    }).catch();
    link.delete(10000).catch();
};
function permissionP(string, link) {
    link.reply('This command requires you to have a role named \`' + string + '\` to use it,' + deleteInfo(10))
    .then(msg => {
        msg.delete(9000)
    }).catch();
    link.delete(10000);
};

module.exports.embed = function (title, string, link, authorBol) {
    embedP(title, string, link, authorBol);
};
module.exports.logUser = function(string, link) {
    logUserP(string, link);
};
module.exports.log = function(string, link) {
    logP(string, link);
};
module.exports.reply = function(string, link) {
    replyP(string, link);
};
module.exports.replyNoDelete = function(string, link) {
    link.reply(string + deleteInfo(10))
    .then(msg => {
        msg.delete(10000)
    }).catch();
};
module.exports.permission = function(string, link) {
    permissionP(string, link);
};
