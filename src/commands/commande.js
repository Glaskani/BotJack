const Discord = require("discord.js");



class Commande {
    
    constructor(commande,func){
        this.__com=commande;
        this.__func=func;
        }
    
    parse (message) {
        if (this.match(message.content.split(" ")[0])) {
            this.__func(message);
            return true
        }
        return false
    }
    match (com) {
        return this.__com==com;
    }
	//message, color, author, arg1, arg1prime(, arg2, arg2prime(, arg3, arg3prime))
	embed(message, color, author,...args){
		var help_embed = new Discord.RichEmbed()
        if (author == 0) {
				help_embed.setColor(color)
				for(i=0;i<args.length;i+=2)
					help_embed.addField(args[i], args[i+1])
        } else if (author === 1 || 2){
                help_embed.setAuthor(message.author.username, message.author.avatarURL)
                .setColor(color)
				if(author == 1){
					for(i=0;i<args.length;i+=2)
						help_embed.addField(arg1, arg1prime)
				}else{
					for(i=0;i<args.length;i+=2)
					help_embed.addField(args[i]+args[i+1])
				}
        }
        message.channel.sendEmbed(help_embed);
    }
}
    
module.exports = Command;