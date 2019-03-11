const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");
const config = require("../config.json");
const commandJson = require("../command.json");

module.exports = new Command("google", function(message) {
    let str = 'fail to correctly execute the command';
    let usage = 'Usage: `google <research>`';
    let msg = message.content.split(" ");
    let args = msg.slice(1);
    let author = message.author;
    let guild = message.guild;
    function google() {
        //Help
        for (let index=0; index < args.length; index++) {if (args[index].toLowerCase() === 'help') {
            Print.reply(commandJson.google.usage + commandJson.inBetween + commandJson.google.description, message);return;}}
        //Verification
        if (args.length != 1) {Print.reply('Argument missing\n' + commandJson.google.usage, message);return;} //Arg missing
        //Main methode
        str = 'succes, link: https://www.google.fr/#q=' + args.join('%20');
        Print.embed("Yout link", '[' + args.join(' ') + '](https://www.google.com/#q=' + args.join('%20') + ')', message, false);
    } google();
    Print.log(msg[0] + ' ' + args.toString().replace(/,/g, ' ') + ' command call, ' + str, message);
});