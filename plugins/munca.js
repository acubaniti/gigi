
//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
const eco = require("discord-economy");

module.exports = {
	name: 'munca',
	// description: 'Ia-ti spaga',
async	execute(message, args){

    var output = await eco.Work(message.author.id)
    //50% chance to fail and earn nothing. You earn between 1-100 coins. And you get one out of 20 random jobs.
    if (output.earned == 0) return message.reply('Cu fata aia vrei tu sa muncesti?! Mai incearca.')
    message.channel.send(`${message.author.username} ai lucrat ca \`${output.job}\` si ai facut ${output.earned} de mei`)


    var output = await eco.Work(message.author.id, {
      failurerate: 1,
      money: Math.floor(Math.random() * 2),
			jobs:['prostituata', 'bulangiu', 'mecanic', 'corporatist', 'ziarist', 'streamer', 'gunoier', 'sclavete']
    })


	}
};
