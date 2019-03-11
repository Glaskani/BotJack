const Command = require('./command');
const Discord = require("discord.js");
const Print = require("./print.js");

module.exports = new Command("google",function(message) {
    let msg = message.content.split(" ");
    let args = msg.slice(1);
    let author = message.author;
    let guild = message.guild;
    args.shift();
    message.channel.send({embed: {
        color: 3447003,
        author: {
            name: message.author.username,
            icon_url: message.author.avatarURL
          },
        description: 'https://www.google.fr/#q=' + args.join('%20'),
      }});
      Print.log(msg[0] + ' command call, link: https://www.google.fr/#q=' + args.join('%20'), message);
});