
//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
const eco = require("discord-economy");

module.exports = {
	name: 'portofel',
	// description: 'Ia-ti spaga',
async	execute(message, args){
  var output = await eco.FetchBalance(message.author.id)
  message.reply(`ai ${output.balance} monede.`)}
};
