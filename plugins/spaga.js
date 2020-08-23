
//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
const eco = require("discord-economy");

module.exports = {
	name: 'spaga',
	description: 'Ia-ti spaga',
async	execute(message, args){
		    var output = await eco.Daily(message.author.id)
		    //output.updated will tell you if the user already claimed his/her daily yes or no.

		    if (output.updated) {

		      var profile = await eco.AddToBalance(message.author.id, 100)
		      message.reply(`Ti-ai primit spaga pe ziua de azi! Ai ${profile.newbalance} monede.`);

		    } else {
		      message.channel.send(`Ai luat deja spaga pe ziua de azi!\nAsteapta ${output.timetowait} pana sa iei din nou!`)
		    }

	}
};
 
// <Guild>.members Guild>.members.array() .cache
