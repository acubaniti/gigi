
//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
const eco = require("discord-economy");

module.exports = {
	name: 'transfer',
	// description: 'Ia-ti spaga',
async	execute(message, args){
    var user = message.mentions.users.first()
    var amount = args[1]

		if (!user) return message.reply('Cui ii trimiti bani?')
		if (!amount) return message.reply('Cati bani vrei sa trimiti?')

    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('N-ai bani saracule!')

    var transfer = await eco.Transfer(message.author.id, user.id, amount)
    // message.reply(`Am transferat banii!\nBalanc e from ${message.author.tag}: ${transfer.FromUser}\nBalance from ${user.tag}: ${transfer.ToUser}`);
    message.reply(`Am transferat ${amount} de mei catre ${user}`);

	}
};
