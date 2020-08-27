
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
// const user = message.mentions.users.first();
// // Parse Amount
// const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
// if (!amount) return message.reply('Must specify an amount to delete!');
// if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
// // Fetch 100 messages (will be filtered and lowered up to max amount requested)
// message.channel.fetchMessages({
//  limit: 100,
// }).then((messages) => {
//  if (user) {
//  const filterBy = user ? user.id : Client.user.id;
//  messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
//  }
//  message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
// });
