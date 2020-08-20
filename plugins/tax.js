
//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
const eco = require("discord-economy");

module.exports = {
	name: 'tax',
	// description: 'Ia-ti spaga',
async	execute(message, args){
      var user = message.mentions.users.first()
			var amount = args[1]

			if (!user) return message.reply('Cui ii trimiti bani?')
			if (!amount) return message.reply('Cati bani vrei sa trimiti?')

			var transfer = await eco.SubtractFromBalance(user.id, amount)
			var balance = await eco.FetchBalance(user.id)
			message.reply(amount + " tax la " + user.id + "n\ portofel: "+ balance.balance);

	}
};
