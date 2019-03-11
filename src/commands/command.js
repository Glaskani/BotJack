const Discord = require("discord.js");

class Command {
    constructor(commande, func) {
        this.__com=commande;
        this.__func=func;
    }
    parse (message) {
        if (this.match(message)) {
            this.action(message)
            return true;
        }
        return false;
    }
    match (message) {
        return this.__com==message.content.split(" ")[0];
    }
    action (message) {
        this.__func(message);
    }
}
    
module.exports = Command;