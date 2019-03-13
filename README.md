# Discord Bot

A discord bot is something that'll help you make do things in your guild easier. It provides various functions ranging from playing music to sending memes. It can also help you in administrating your discord guild when you're away.

![Sample](../master/res/bot.jpg)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Requirements

DiscordBot requires the following to run:

- [node.js](https://nodejs.org/en/)
- [discord.js](https://discord.js.org/#/)

To run on linux server yo can use:

- [Forever](https://www.npmjs.com/package/forever)

### Building

You will need to edit the config.json file, you will need a [token](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token). The rank is the basic rank that people will have on the first connect.

```json
{
  "token" : "MyToken"
}
```

### Deploy

To start the bot on Linux with Forever:

```
cd <To the folder that contains main.js>

forever start main.js
forever list
forever stop <INDEX>
```

### Information

#### Permissions

You can add to you some Permissions to control the bot editable in the config file:

- bot-commander: execute admin command like the purge or fly commands.
- bot-play: execute dj commands.

## What I Learned

- JavaScript
- Discord API

## Authors & Contributors

* **Hachard Victor** - *Initial work* - [VictorHachard](https://github.com/VictorHachard)

I want to thank everyone who contributed to the project.
See the list of [contributors](https://github.com/VictorHachard/DiscordBot/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](../master/LICENSE) file for details.
