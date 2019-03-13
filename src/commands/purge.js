const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");

module.exports = new Command("purge", function(receivedMessage, primaryCommand, argumentsCommand) {
    if (argumentsCommand.length < 1) {return 3} //Arg missing
    else if (argumentsCommand.length > 2) {return 4} //too much
    else if (isNaN(argumentsCommand[0])) {return 5} //Args incorrect
    else if (argumentsCommand[0] < 2 || argumentsCommand[0] > 100) {Print.reply('Please enter a number between 2 and 100', receivedMessage);return 100;} //Arg not correct
    let res = '';

    async function purge() {
        const fetched = await receivedMessage.channel.fetchMessages({limit: argumentsCommand[0]})
            .catch(error => Print.logUser(error, receivedMessage));
        receivedMessage.channel.bulkDelete(fetched)
            .catch(error => Print.logUser(error, receivedMessage));
        res = fetched.size.toString() + ' messages found and delete';
        Print.replyNoDelete(res, receivedMessage);
    } purge();
    return res;
});
