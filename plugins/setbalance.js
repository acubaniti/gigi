
//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
const eco = require("discord-economy");
var settings = require("../config.json");
module.exports = {
	name: 'setbalance',
	description: 'Ia-ti spaga',
async	execute(message, args){
  if (settings.admin == message.author.id) {
    var user = message.mentions.users.first()
    var amount = args[1]

    if (!user) return message.reply('Cui ii trimiti bani?')
    if (!amount) return message.reply('Cati bani vrei sa trimiti?')

    var transfer = await eco.SetBalance(user.id, amount)
    var balance = await eco.FetchBalance(user.id)
    message.reply(`Am setat portofelul la ${amount} de mei pentru ${user}`)

  }

	}
};
