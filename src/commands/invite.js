const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");
const config = require("../config.json");

module.exports = new Command("invite", function(receivedMessage, primaryCommand, argumentsCommand) {
    Print.embed('Link', '[Add me!](' + config.invite + ')\n[GitHub](' + config.gitHub + ')', receivedMessage, false);
    return 0;
});
