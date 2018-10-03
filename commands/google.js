const Command = require('./command')

module.exports = new Command("google",function(message) {
    let args = message.content.split(' ')
    args.shift()
    message.delete()
    message.channel.send({embed: {
        color: 3447003,
        author: {
            name: message.author.username,
            icon_url: message.author.avatarURL
          },
        description: 'https://www.google.fr/#q=' + args.join('%20'),
      }});
    console.log("Commands google demandée !");
});