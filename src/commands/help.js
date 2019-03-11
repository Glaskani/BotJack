const Command = require('./command')
const Discord = require("discord.js");

module.exports = new Command("help",function(message) {
    let str = 'fail to correctly execute the command';
    let usage = 'Usage: `help`';
    let msg = message.content.split(" ");
    let args = msg.slice(1);
    let author = message.author;
    let guild = message.guild;
    async function help() {
        //Help
        args.forEach(element => {if (element.toLowerCase() === 'help') {Print.reply(usage);return;}});
        //Main methode
        let content = ''
            + 'Command for everyone:\n'
            + '    - help: `help`\n'
            + '    - ping: `ping`\n'
            + '    - google: `google <research>`\n'
            + '    - invite: `invite`\n'
            + 'Command for the elit\n'
            + '    - fly: `fly <@mention>`\n'
            + '    - purge: `purge <amount> <@mention>[Optional]`\n';
        Print.embed(content, message, true);
        str = 'succes';
    } help();
    //Log the command call succes or the fail
    Print.log(msg[0] + ' command call, ' + str, message);
});
