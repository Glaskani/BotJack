const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");

module.exports = new Command("google", function(receivedMessage, primaryCommand, argumentsCommand) {
    if (argumentsCommand.length  == 0) {return 3} //Arg missing

    res = 'link: https://www.google.fr/#q=' + argumentsCommand.join('%20');
    Print.embed("Yout link", '[' + argumentsCommand.join(' ') + '](https://www.google.com/#q=' + argumentsCommand.join('%20') + ')', receivedMessage, false);
    return res;
});