/*
If you want to make discord-economy guild based you have to use message.author.id + message.guild.id as ID for example:
eco.Daily(message.author.id + message.guild.id)

This will create a unique ID for each guild member
*/


//Requiring Packages
const fs = require('fs');
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
const eco = require("discord-economy");

//Create the bot client
const client = new Discord.Client();

// Command handler
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./plugins').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./plugins/${file}`);
	client.commands.set(command.name, command);
	console.log(`${file} loaded`);
}

//Set the prefix and token of the bot.
// Get authentication data
try {
	var settings = require("./config.json");
} catch (e){
	console.log("Please create an config.json like config.json.example with a bot token or an email and password.\n"+e.stack); // send message for error - no token
	process.exit();
}

// var Permissions = {};
// try{
// 	Permissions = require("./permissions.json");
// } catch(e){
// 	console.log("Please create an permissions.json like auth.json.example with a bot token or an email and password.\n"+e.stack); // send message for error - no token
//  	process.exit();
// }


client.on('message', async message => {
  // if (message.author != client.user && message.isMentioned(client.user)) {
  //     var vadimQuotes = [
  //     "Aşa cum Austria e o ţară de doctori, România e o ţară de preşedinţi – fiecare neisprăvit e preşedinte pe undeva.",
  //     "Recunosc că în materie de politică sunt zero. Kilometrul zero, am vrut să spun.",
  //     "Am consultat un medic: era grav bolnav!"
  //     ];
  // var vadimQuote = Math.floor(Math.random() * vadimQuotes.length);
  // msg.channel.send(vadimQuotes[vadimQuote]); //using a mention here can lead to looping
  //
  // }


  //This reads the first part of your message behind your prefix to see which command you want to use.
  var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];

  //These are the arguments behind the commands.
  var args = message.content.split(' ').slice(1);


		const dropRate = 2;
		function randomDrop() {
			const dropRange = [
			"🥇",
			"🥈",
			"🥉",

			];
			const dropValue = [
			"25",
			"15",
			"5"
			];

			var r = Math.floor(Math.random() * dropRange.length);
			message.react(dropRange[r])
			.catch(() => console.error('One of the emojis failed to react.'));
			eco.AddToBalance(message.author.id, dropValue[r]);
			// message.reply(' ai castigat ' + dropValue[r] + ' mei')
			}

			 if(message.author != client.user && message.author.id != 723002601066594376 && Math.floor(Math.random() * 3) == dropRate && !message.content.startsWith(settings.prefix)){
		  randomDrop();
	 }



// Load commands
 if (!client.commands.has(command)) return;

 try {
 	client.commands.get(command).execute(message, args);
 } catch (error) {
 	console.error(error);
 	message.reply('there was an error trying to execute that command!');
 }
  //If the message does not start with your prefix return.
  //If the user that types a message is a bot account return.
  if (!message.content.startsWith(settings.prefix) || message.author.bot) return;
  if(message.author == client.user){
      return true; //returning true to prevent feedback from commands
  }

});
// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'gambling-house');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Ai primit 100 de mei, ${member}, scrie $ajutor pentru a vedea comenzile de joc.`);
	var amount = 100;
	var transfer = eco.SetBalance(member.id, amount)
	var balance = eco.FetchBalance(member.id)
});


//Your secret token to log the bot in. (never show this to anyone!)
client.login(settings.token)
