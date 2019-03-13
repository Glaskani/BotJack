const Discord = require("discord.js");
const config = require("../config.json");

function logErrorP(string, link) {
    //Get the botChanel
    if (config.botChannel === "") {return}
    var botChannel = link.guild.channels.find(channel => channel.name === config.botChannel);
    if (botChannel === null) {return}
    //Get the Admin private chat
    if (config.adminID === "") {return}
    var adminPrivateChannel = link.guild.members.find(m => m.id === config.adminID);;
    if (adminPrivateChannel === null) {return}
    var res = 'please show this message to the administrator of this server```' + string + '```';
    link.reply(res).catch();
    botChannel.send('<@'+config.adminID+'> ' + res).catch();
    adminPrivateChannel.send(res + '**Log**: Request by *' + link.author.username + '*, in *' + link.channel.name + '*').catch();
    console.log('Error: ' + string);
};
function embedP(title, string, link, authorBol) {
    var embed = new Discord.RichEmbed();
    if (authorBol) {embed.setAuthor(link.author.username, link.author.avatarURL);};
    embed.setColor(config.embedColor).addField(title, string);
    link.channel.send(embed).catch(/*Error handling if the Message isn't returned, sent, etc.*/);
    link.delete(1000);
};
function logP(string, link) {
    if (config.botChannel === "") {return}
    var botChannel = link.guild.channels.find(channel => channel.name === config.botChannel);
    if (botChannel === null) {return}
    var res = '**Log**: Request by *' + link.author.username + '*, in *' + link.channel.name + '*, ' + string;
    botChannel.send(res).catch(/*Error handling if the Message isn't returned, sent, etc.*/);
    console.log(res);
};
function replyP(string, link) {
    link.reply(string)
    .then(msg => {
        msg.delete(9000)
    }).catch();
    link.delete(10000).catch();
};
function permissionP(string, link) {
    link.reply('This command requires you to have a role named \`' + string + '\` to use it,')
    .then(msg => {
        msg.delete(9000)
    }).catch();
    link.delete(10000);
};

module.exports.embed = function (title, string, link, authorBol) {
    embedP(title, string, link, authorBol);
};
module.exports.logUser = function(string, link) {
    logErrorP(string, link);
};
module.exports.log = function(string, link) {
    logP(string, link);
};
module.exports.reply = function(string, link) {
    replyP(string, link);
};
module.exports.replyNoDelete = function(string, link) {
    link.reply(string).catch();
};
module.exports.permission = function(string, link) {
    permissionP(string, link);
};
