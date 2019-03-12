const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");

module.exports = new Command("flip", function(receivedMessage, primaryCommand, argumentsCommand) {
    let chance = Math.floor(Math.random() * 2);
    let res = 'The coin landed on the ';
    if (chance == 0) {
        res += '**Heads**'
        Print.embed("Result", '🤞 ' + res, receivedMessage, false);
    } else {
        res += '**Tails**'
        Print.embed("Result", '🤞 ' + res, receivedMessage, false);
    }
	return res.replace('T', 't');
});