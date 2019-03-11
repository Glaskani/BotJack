const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");
const config = require("../config.json");

module.exports = new Command("invite", function(message) {
    let str = 'fail to correctly execute the command';
    let usage = 'Usage: `invite`';
    let msg = message.content.split(" ");
    let args = msg.slice(1);
    let author = message.author;
    let guild = message.guild;
    async function invite() {
        //Help
        args.forEach(element => {if (element.toLowerCase() === 'help') {Print.reply(usage);return;}});
        //Verification
        //Main methode
        Print.embed('[Add me!](https://www.google.com)\n[GitHub](https://www.google.com)', message);
        str = 'succes';
  } invite();
  //Log the command call succes or the fail
  Print.log(msg[0] + ' command call, ' + str, message);
});
