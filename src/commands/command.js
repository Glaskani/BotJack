const Discord = require("discord.js");
const config = require("../config.json");
const commandJson = require("../command.json");  

/**
 * Represent any command, simplify the creation of a command, link a command name with a function
 */
class Command {

    constructor(commande, func) {
        this.__com=commande;
        this.__func=func;
    }

    /**
     * Sort the receivedMessage
     * @param {*} receivedMessage the message received by the bot
     * @returns bollean - true if the receivedMessage is a command, false otherwise
     */
    parse(receivedMessage) {
        if (this.match(receivedMessage)) {
            this.action(receivedMessage);
            return true;
        } return false;
    }

    /**
     * Verify is the receivedMessage is a command, authorized uppercase
     * @param {*} receivedMessage the message received by the bot
     * @returns bollean - true if the receivedMessage match with a command + prefix, false otherwise
     */
    match(receivedMessage) {
        return config.prefix + this.__com == receivedMessage.content.split(" ")[0].toLowerCase();
    }

    /**
     * Lunch the command, delete the receivedMessage, handle any error
     * @param {*} receivedMessage the message received by the bot
     */
    action(receivedMessage) {
        let fullCommand = receivedMessage.content;
        let splitCommand = fullCommand.split(" "); //array of the receivedMessage split by ' '
        let primaryCommand = splitCommand[0].toLowerCase().substring(config.prefix.length);
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
        //If in the second arguments is 'help'
        if (argumentsCommand[0] != null && argumentsCommand[0].toLowerCase() === 'help') {
            reply('Usage: ' + usageCommand + ' -- ' + descriptionCommand, receivedMessage);
            logCode = 2;
        }
        //If the user have the permission
        if (permissionCommand == 'botCommander' && !receivedMessage.member.roles.find("name", config.botCommander)) {logCode = 8} //Permission
        if (permissionCommand == 'botPlay' && !receivedMessage.member.roles.find("name", config.botPlay)) {logCode = 9} //Permission

        if (logCode != 2 && logCode != 8 && logCode != 9) {
            logCode = this.__func(receivedMessage, primaryCommand, argumentsCommand);
        }
        this.logCode(logCode, splitCommand, receivedMessage);
        //deleteing message
        if (primaryCommand === 'purge') {
            receivedMessage.delete(0).catch(error => logError(error, link));
        } else {
            receivedMessage.delete(10000).catch(error => logError(error, link));
        }
    }

   /**
    * 
    * @param {*} logCode int or string
    * @param {*} splitCommand array of the receivedMessage split by ' '
    * @param {*} receivedMessage the message received by the bot
    * Error:
    *   0 = Succes
    *   1 = Error unknown
    *   2 = Help call
    *   3 = Missing arguments
    *   4 = Too mutch arguments
    *   5 = Arguments must be a number
    *   6 = Arguments must be a string
    *   7 = Only one arguments
    *   8 = User dont't have the permission botCommander
    *   9 = User dont't have the permission botPlay
    *   10 = Argument must be a '@mention'
    *  100 = Error already reply
    */
    logCode(logCode, splitCommand, receivedMessage) {
        let logMessage = 'command call: `' + splitCommand.toString().replace(/,/g, ' ') + '` -- ';
        let logTemp;
        if (!isNaN(logCode)) {
            switch (logCode) {
                case 0:
                    logMessage += 'Succes'
                    break;
                case 1:
                    logTemp = 'Error: unknown error';
                    logMessage += logTemp; reply(logTemp, receivedMessage);
                    break;
                case 2:
                    logTemp = 'Succes: help for a command';
                    logMessage += logTemp;
                    break;
                case 3:
                    logTemp = 'Error: missing argument';
                    logMessage += logTemp; reply(logTemp, receivedMessage);
                    break;
                case 4:
                    logTemp = 'Error: too much argument given';
                    logMessage += logTemp; reply(logTemp, receivedMessage);
                    break;
                case 5:
                    logTemp = 'Error: the argument must be a number';
                    logMessage += logTemp; reply(logTemp, receivedMessage);
                    break;
                case 6:
                    logTemp = 'Error: the argument must be a string';
                    logMessage += logTemp; reply(logTemp, receivedMessage);
                    break;
                case 7:
                    logTemp = 'Error: only one argument can be taken';
                    logMessage += logTemp; reply(logTemp, receivedMessage);
                    break;
                case 8:
                    logTemp = 'Error: ' + config.botCommander + ' permission missing to execute that command'
                    logMessage += logTemp; permissionError(config.botCommander, receivedMessage);
                    break;
                case 9:
                    logTemp = 'Error: ' + config.botPlay + ' permission missing to execute that command'
                    logMessage += logTemp; permissionError(config.botPlay, receivedMessage);
                    break;
                case 10:
                    logTemp = 'Error: the argument must be a @mention';
                    logMessage += logTemp; reply(logTemp, receivedMessage);
                    break;
                case 100: //The reply is already done, for special case
                    logTemp = 'Error: error already reply';
                    logMessage += logTemp;
                    break;
                default:
                    logTemp = 'Error: ' + logCode + ' is not handle';
                    logMessage += logTemp; logError(logTemp, receivedMessage);
                    break;
            }
        } else if (logCode == 'undefined' || logCode === null) {
            logTemp = 'Error: undefined or null' + logCode;
            logMessage += logTemp;
            logError(logTemp, receivedMessage)
        } else {
            logMessage += 'Succes: ' + logCode;
        }
        log(logMessage, receivedMessage);
    }
};

/**
 * Log the string given in the botChannel defined in 'config.json' and in the console
 * @param {*} string the string to log, concatenated with the author and channel where the command was send
 * @param {*} link the message received by the bot
 * Error: If the botChannel is not defined, call logError and return
 * Error: if the botChannel is not found on the server, call logError and return
 */
function log(string, link) {
    let res = '**Log**: Request by *' + link.author.username + '*, in *' + link.channel.name + '*, ' + string;
    console.log(res);
    //Get the botChannel
    if (config.botChannel == "") {
        logError("Error: botChannel is not defined in 'config.json'", link);
        return;
    }
    let botChannel = link.guild.channels.find(channel => channel.name === config.botChannel);
    if (botChannel === null) {
        logError("Error: botChannel was not found on this server", link);
        return;
    }
    //Send
    botChannel.send(res).catch(error => logError(error, link));
};

/**
 * Log the string given in the botChannel defined in 'config.json', in adminID private chat, reply to the author of the command and in the console
 * @param {*} string the string to log, concatenated with a warning, the author and channel where the command was send
 * @param {*} link the message received by the bot
 *  Error: If the botChannel is not defined, reply a Fatal Error and continue
 *  Error: if the botChannel is not found on the server, reply a Fatal Error and continue
 *  Error: If the adminID is not defined, reply a Fatal Error and continue
 *  Error: if the adminID is not found on the server, reply a Fatal Error and continue
 */
function logError(string, link) {
    let ask = 'please show this message to the administrator of this server\n';
    let res = '```' + string + '```';
    console.log('Error: ' + string);
    link.reply(ask + res).catch();
    //Get the botChannel
    if (config.botChannel == "") {
        link.reply(ask + "**Fatal Error**: botChannel is not defined in 'config.json'").catch()
    } else {
        let botChannel = link.guild.channels.find(channel => channel.name === config.botChannel);
        if (botChannel === null) {
            link.reply(ask + "**Fatal Error**: botChannel was not found on this server").catch()
        } else { //Send in botChannel
            botChannel.send('<@'+config.adminID+'> ' + ask + res).catch()
        }
    }
    //Get the Admin private chat
    if (config.adminID == "") {
        link.reply(ask + "**Fatal Error**: adminID is not defined in 'config.json'").catch();
    } else {
        let adminPrivateChannel = link.guild.members.find(m => m.id === config.adminID);
        if (adminPrivateChannel === null) {
            link.reply(ask + "**Fatal Error**: adminID was not found on this server").catch();
        } else { //Send in private chat
            adminPrivateChannel.send(ask + res + '**Log**: Request by *' + link.author.username + '*, in *' + link.channel.name + '*').catch()
        }
    }
};

/**
 * Reply to the author that he don't have the permission name string given, then delete it in 8000 milliseconds
 * @param {*} string the name of the permission missing
 * @param {*} link the message received by the bot
 * Error: If the message have an error, call logError
 */
function permissionError(string, link) {
    link.reply('This command requires you to have a role named \`' + string + '\` to use it,')
    .then(msg => {
        msg.delete(8000)
    }).catch(error => logError(error, link));
};

/**
 * Reply to the author the string given, then delete it in 8000 milliseconds
 * @param {*} string the message to reply to the author
 * @param {*} link the message received by the bot
 * @param {*} delete
 * Error: If the message have an error, call logError
 */
function reply(string, link, deleteBool=true) {
    link.reply(string)
    .then(msg => {
        if (deleteBool) {
            msg.delete(8000)
        }
    }).catch(error => logError(error, link));
};

/**
 * Send an embed in the channel where the command was send
 * @param {*} string the title to add in a embed field
 * @param {*} string the message to add in a embed field
 * @param {*} link the message received by the bot
 * @param {*} authorBol boolean - if true add the author in the embed autherwise don't add it
 * Error: If the message have an error, call logError
 */
function embed(title, string, link, authorBol) {
    var embed = new Discord.RichEmbed();
    if (authorBol) {
        embed.setAuthor(link.author.username, link.author.avatarURL);
    };
    embed.setColor(config.embedColor).addField(title, string);
    link.channel.send(embed).catch(error => logError(error, link));
};

module.exports = Command;
module.exports.log = (string, link) => {log(string, link)};
module.exports.logError = (string, link) => {logError(string, link)};
module.exports.permissionError = (string, link) => {permissionError(string, link)};
module.exports.reply = (string, link, deleteBool) => {reply(string, link, deleteBool)};
module.exports.embed = (title, string, link, authorBol) => {embed(title, string, link, authorBol)};