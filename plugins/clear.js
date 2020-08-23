
//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
// const eco = require("discord-economy");
var settings = require("../config.json");
module.exports = {
	name: 'clear',
	// description: 'Ia-ti spaga',
execute(message, args){

	  if (settings.admin == message.author.id && !args[0] ) {
		   message.channel.bulkDelete(20);
		}
		else if (settings.admin == message.author.id && args[0] ) {
			 message.channel.bulkDelete(args[0]);
		}
		else {
			message.channel.send('Nu ai voie sa stergi mesaje, trimite mesaj unui admin.')
		}
	  }
};
