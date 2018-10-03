const Command = require('./command')

module.exports = class Play extends Command {
	
	static match (message) {
		return message.content.startsWith('debug')
	}

	static action (message) {
        .leave();
	}
}