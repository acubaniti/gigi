
//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
// const eco = require("discord-economy");
var settings = require("../config.json");
module.exports = {
	name: 'reload',
	// description: 'Ia-ti spaga',
async	execute(message, args){

	  if (settings.admin == message.author.id) {
			const commandName = args[0].toLowerCase();
				const command = message.client.commands.get(commandName)
					|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

				if (!command) {
					return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
				}

				delete require.cache[require.resolve(`./${command.name}.js`)];

				try {
					const newCommand = require(`./${command.name}.js`);
					message.client.commands.set(newCommand.name, newCommand);
					message.channel.send(`Command \`${command.name}\` was reloaded!`);
				} catch (error) {
					console.log(error);
					message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
				}
		}
	  }
};
