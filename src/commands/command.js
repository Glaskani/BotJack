const Discord = require("discord.js");
const config = require("../config.json");

class Command {
    constructor(commande, func) {
        this.__com=commande;
        this.__func=func;
    }
    parse (message) {
        if (this.match(message)) {
            this.action(message);
            return true;
        }
        return false;
    }
    match (message) {
        return config.prefix + this.__com==message.content.split(" ")[0].toLowerCase();
    }
    action (message) {
        this.__func(message);
    }
}
    
module.exports = Command;