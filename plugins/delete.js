
//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
const eco = require("discord-economy");
var settings = require("../config.json");

module.exports = {
	name: 'delete',
	description: 'Ia-ti spaga',
async	execute(message, args){

  if (settings.admin == message.author.id){ //You want to make this command admin only!

    var user = message.mentions.users.first()
    if (!user) return message.reply('Please specify a user I have to delete in my database!')

    var output = await eco.Delete(user.id)
    if (output.deleted == true) return message.reply('Successfully deleted the user out of the database!')

    message.reply('Error: Could not find the user in database.')

  }

	}
};
