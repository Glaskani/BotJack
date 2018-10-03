const Discord = require("discord.js");



class Command {
    
    constructor(commande,func){
        this.__com=commande;
        this.__func=func;
        }
    
    parse (message) {
        if (this.match(message)) {
            this.action(message)
            return true
        }
        return false
    }
    match (message) {
        return this.__com==message.content.split(" ")[0];
    }
    action (message){
        this.__func(message);
    }
    embed4arg(message, arg1, arg1prime, arg2, arg2prime, arg3, arg3prime, arg4, arg4prime, color, author){
        if (author == 0) {
            var help_embed = new Discord.RichEmbed()
                .setColor(color)
                .addField(arg1, arg1prime)
                .addField(arg2, arg2prime)
                .addField(arg3, arg3prime)
                .addField(arg4, arg4prime)
        } else if (author == 1)	{
            var help_embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setColor(color)
                .addField(arg1, arg1prime)
                .addField(arg2, arg2prime)
                .addField(arg3, arg3prime)
                .addField(arg4, arg4prime)
        }
        message.channel.sendEmbed(help_embed);
    }
    embed3arg(message, arg1, arg1prime, arg2, arg2prime, arg3, arg3prime, color, author){
        if (author == 0) {
            var help_embed = new Discord.RichEmbed()
                .setColor(color)
                .addField(arg1, arg1prime)
                .addField(arg2, arg2prime)
                .addField(arg3, arg3prime)
        } else if (author == 1)	{
            var help_embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setColor(color)
                .addField(arg1, arg1prime)
                .addField(arg2, arg2prime)
                .addField(arg3, arg3prime)
        }
        message.channel.sendEmbed(help_embed);
    }
    embed2arg(message, arg1, arg1prime, arg2, arg2prime, color, author){
        if (author == 0) {
            var help_embed = new Discord.RichEmbed()
                .setColor(color)
                .addField(arg1, arg1prime)
                .addField(arg2, arg2prime)
        } else if (author == 1)	{
            var help_embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setColor(color)
                .addField(arg1, arg1prime)
                .addField(arg2, arg2prime)
        }
        message.channel.sendEmbed(help_embed);
    }
    embed1arg(message, arg1, arg1prime, color, author){
        if (author == 0) {
            var help_embed = new Discord.RichEmbed()
                .setColor(color)
                .addField(arg1, arg1prime)
        } else if (author == 1)	{
            var help_embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setColor(color)
                .addField(arg1, arg1prime)
        }
        message.channel.sendEmbed(help_embed);
    }
    embed0arg(message, arg0, arg0prime, color, author){
        if (author == 0) {
            var help_embed = new Discord.RichEmbed()
                .setColor(color)
                .setDescription(arg0 + arg0prime)
        } else if (author == 1)	{
            var help_embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setColor(color)
                .setDescription(arg0 + arg0prime)
        }
        message.channel.sendEmbed(help_embed);
    }
}
    
module.exports = Command;