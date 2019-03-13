const Command = require("./command.js")
const Discord = require("discord.js");

module.exports = new Command("dice", function(receivedMessage, primaryCommand, argumentsCommand) {
    if (argumentsCommand.length != 1) {return 7} //Arg missing
    else if (isNaN(argumentsCommand[0])) {return 5} //Args incorrect

    var integer = parseInt(argumentsCommand[0], 10);
    var numberList = [];
    var average = 0;
    for (let i=0; i < 5; i++) {
        var temp = Math.floor(Math.random() * (integer+1));
        numberList.push(temp);
        average += temp;
    }
    average /= 5;
    var res = argumentsCommand[0] + ': ' + numberList.toString().replace(/,/g, ', ') + ' - average: ' + average;
    Command.embed("Result", '🎲 ' + res, receivedMessage, false);
	return 'the roll numbers are ' + res;
});
