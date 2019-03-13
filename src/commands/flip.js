const Command = require("./command.js")
const Discord = require("discord.js");

module.exports = new Command("flip", function(receivedMessage, primaryCommand, argumentsCommand) {
    let chance = Math.floor(Math.random() * 2);
    let chanceSide = Math.floor(Math.random() * 100);
    let res = 'The coin landed on the ';
    if (chanceSide == 0) {
        res += '**Side**'
        Command.embed("Result", '🤞 ' + res, receivedMessage, false);
    } else if (chance == 0) {
        res += '**Heads**'
        Command.embed("Result", '🤞 ' + res, receivedMessage, false);
    } else {
        res += '**Tails**'
        Command.embed("Result", '🤞 ' + res, receivedMessage, false);
    }
	return res.replace('T', 't');
});