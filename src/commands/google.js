const Command = require('./command');
const Discord = require("discord.js");
const Print = require("./print.js");

module.exports = new Command("google", function(message) {
    let str = 'fail to correctly execute the command';
    let usage = 'Usage: `google <research>`';
    let msg = message.content.split(" ");
    let args = msg.slice(1);
    let author = message.author;
    let guild = message.guild;
    //Help
    args.forEach(element => {if (element.toLowerCase() === 'help') {Print.reply(usage);return;}});
    //Verification
    if (args < 1) {Print.reply('Argument missing\n' + usage, message);return;} //Arg missing
    //Main methode
    args.shift();
    Print.embed('[' + args.join(' ')+ '](https://www.google.com/#q=' + args.join('%20') + ')', message, true);
    Print.log(msg[0] + ' command call, link: https://www.google.fr/#q=' + args.join('%20'), message);
});
