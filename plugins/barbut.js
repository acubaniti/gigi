
//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
const eco = require("discord-economy");

module.exports = {
	name: 'barbut',
	// description: 'Ia-ti spaga',
async	execute(message, args){

			var roll = args[0] //Should be a number between 1 and 6
			var amount = args[1] //Coins to gamble

			var output = await eco.FetchBalance(message.author.id)
	    if (output.balance < amount) return message.reply('Esti sarac, n-ai bani!')

		if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Zi un numar intre 1-6')
			// if (!amount) return message.reply('Cat vrei sa joci bastanule?!')
		if (!amount) var amount = 10


			var gamble = await eco.Dice(message.author.id, roll, amount).catch(console.error)
			message.reply(`Ai dat \`${gamble.dice}\`. Ai ${gamble.output}`)

	}
};
