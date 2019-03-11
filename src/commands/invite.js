const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");
const config = require("../config.json");
const commandJson = require("../command.json");

module.exports = new Command("invite", function(message) {
    let str = 'fail to correctly execute the command';
    let msg = message.content.split(" ");
    let args = msg.slice(1);
    async function invite() {
        //Help
        for (let index=0; index < args.length; index++) {if (args[index].toLowerCase() === 'help') {
            Print.reply(commandJson.invite.usage + commandJson.inBetween + commandJson.invite.description, message);return;}}
        //Verification
        //Main methode
        Print.embed('Link', '[Add me!](' + config.invite + ')\n[GitHub](' + config.gitHub + ')', message, false);
        str = 'succes';
  } invite();
  //Log the command call succes or the fail
  Print.log(msg[0] + ' ' + args.toString().replace(/,/g, ' ') + ' command call, ' + str, message);
});
