const Command = require("./command.js")
const Discord = require("discord.js");
const Print = require("./print.js");
const commandJson = require("../command.json");

module.exports = new Command("dice", function(message) {
	let str = 'fail to correctly execute the command';
	let msg = message.content.split(" ");
	let args = msg.slice(1);
	let author = message.author;
	let guild = message.guild;
	function dice() {
		//Help
		for (let index=0; index < args.length; index++) {if (args[index].toLowerCase() === 'help') {
            Print.reply(commandJson.dice.usage + commandJson.inBetween + commandJson.dice.description, message);return;}}
        //Main methode
        if (args.length  != 1) {Print.reply('Only one argument can be taken\n' + commandJson.dice.usage, message);return;} //Arg missing
        var integer = parseInt(args[0], 10);
        var numberList = [];
        var average = 0;
        for (let index = 0; index < 5; index++) {
            var temp = Math.floor(Math.random() * (integer+1));
            numberList.push(temp);
            average += temp;
        }
        average /= 5;
        var res = args[0] + ': ' + numberList.toString().replace(/,/g, ', ') + ' - average: ' + average;
        Print.embed("Result", res, message, false);
		str = 'succes, the roll numbers are ' + res;
	} dice();
	//Log the command call succes or the fail
	Print.log(msg[0] + ' ' + args.toString().replace(/,/g, ' ') + ' command call, ' + str, message);
});
