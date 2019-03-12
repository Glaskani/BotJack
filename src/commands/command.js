const Discord = require("discord.js");
const config = require("../config.json");
const Print = require("./print.js");
const commandJson = require("../command.json");  

class Command {

    constructor(commande, func) {
        this.__com=commande;
        this.__func=func;
    }

    parse(receivedMessage) {
        if (this.match(receivedMessage)) {
            this.action(receivedMessage);
            return true;
        } return false;
    }

    match(receivedMessage) {
        return config.prefix + this.__com == receivedMessage.content.split(" ")[0].toLowerCase();
    }

    action(receivedMessage) {
        let fullCommand = receivedMessage.content;
        let splitCommand = fullCommand.split(" ");
        let primaryCommand = splitCommand[0].toLowerCase();
        let argumentsCommand = splitCommand.slice(1);
        let logCode = 1;

        let descriptionCommand;
        let permissionCommand;
        let usageCommand;
        for (let i=0; i < commandJson.length; i++) {
            if (commandJson[i].name == primaryCommand) {
                descriptionCommand = commandJson[i].description;
                permissionCommand = commandJson[i].permission;
                usageCommand = commandJson[i].usage;
                break;
            }
        }
        //If in the arguments there is 'help'
		for (let i=0; i < argumentsCommand.length; i++) {if (argumentsCommand[i].toLowerCase() === 'help') {
            Print.reply('Usage: ' + usageCommand + ' -- ' + descriptionCommand, receivedMessage);
            logCode = 2;
            break;
        }}
        //If the user have the permission
        if (permissionCommand == 'botCommander' && !receivedMessage.member.roles.find("name", config.botCommander)) {logCode = 8} //Permission
        if (permissionCommand == 'botPlay' && !receivedMessage.member.roles.find("name", config.botPlay)) {logCode = 9} //Permission

        if (logCode != 2 && logCode != 8 && logCode != 9) {logCode = this.__func(receivedMessage, primaryCommand, argumentsCommand);}
        this.log(logCode, splitCommand, receivedMessage);
    }

    /*
        Return code error
        0 = Succes
        1 = Error unknown
        2 = Help call
        3 = Missing arguments
        4 = Too mutch arguments
        5 = Arguments must be a number
        6 = Arguments must be a string
        7 = Only one arguments
        8 = User dont't have the permission botCommander
        9 = User dont't have the permission botPlay
        10 = Argument must be a @mention
        100 = Error take care before
    */
    log(logCode, splitCommand, receivedMessage) {
        let logMessage = 'command call: `' + splitCommand.toString().replace(/,/g, ' ') + '` -- ';
        let logTemp;
        if (!isNaN(logCode)) {
        switch (logCode) {
            case 0:
                logMessage += 'Succes'
                break;
            case 1:
                logTemp = 'Error: unknown error';
                logMessage += logTemp; Print.reply(logTemp, receivedMessage);
                break;
            case 2:
                logTemp = 'Succes: help for a command';
                logMessage += logTemp;
                break;
            case 3:
                logTemp = 'Error: missing argument';
                logMessage += logTemp; Print.reply(logTemp, receivedMessage);
                break;
            case 4:
                logTemp = 'Error: too much argument given';
                logMessage += logTemp; Print.reply(logTemp, receivedMessage);
                break;
            case 5:
                logTemp = 'Error: the argument must be a number';
                logMessage += logTemp; Print.reply(logTemp, receivedMessage);
                break;
            case 6:
                logTemp = 'Error: the argument must be a string';
                logMessage += logTemp; Print.reply(logTemp, receivedMessage);
                break;
            case 7:
                logTemp = 'Error: only one argument can be taken';
                logMessage += logTemp; Print.reply(logTemp, receivedMessage);
                break;
            case 8:
                logTemp = 'Error: ' + config.botCommander + ' permission need to execute that command'
                logMessage += logTemp; Print.permission(config.botCommander, receivedMessage);
                break;
            case 9:
                logTemp = 'Error: ' + config.botPlay + ' permission need to execute that command'
                logMessage += logTemp; Print.permission(config.botPlay, receivedMessage);
                break;
            case 10:
                logTemp = 'Error: the argument must be a @mention';
                logMessage += logTemp; Print.reply(logTemp, receivedMessage);
                break;
            case 100:
                logTemp = 'Error: take care before';
                logMessage += logTemp;
                break;
            default:
                break;
        }
        } else if (logCode == 'undefined') {
            logMessage += 'Error: ' + logCode;
            Print.logUser('Error: undefined', receivedMessage)
        } else {
            logMessage += 'Succes: ' + logCode;
        }
        Print.log(logMessage, receivedMessage);
    }
};

module.exports = Command;