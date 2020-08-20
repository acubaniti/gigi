//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
const eco = require("discord-economy");

module.exports = {
	name: 'pacanele',
	// description: 'Ia-ti spaga',
async	execute(message, args){


    var amount = args[0] //Coins to gamble

    if (!amount) return message.reply('Cat vrei sa joci?')

    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('Esti sarac, n-ai bani!')

    var gamble = await eco.Slots(message.author.id, amount, {
      width: 3,
      height: 1
    }).catch(console.error)

    message.channel.send(gamble.grid)
    message.channel.send(`Ai ${gamble.output}!`)



	}
};
