// /*
// If you want to make discord-economy guild based you have to use message.author.id + message.guild.id as ID for example:
// eco.Daily(message.author.id + message.guild.id)
//
// This will create a unique ID for each guild member
// */
//
//
// //Requiring Packages
// const fs = require('fs');
// const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
// const eco = require("discord-economy");
//
// //Create the bot client
// const client = new Discord.Client();
//
// // Command handler
// client.commands = new Discord.Collection();
// const commandFiles = fs.readdirSync('./plugins').filter(file => file.endsWith('.js'));
// for (const file of commandFiles) {
// 	const command = require(`./plugins/${file}`);
// 	client.commands.set(command.name, command);
// 	console.log(`${file} loaded`);
// }
//
// //Set the prefix and token of the bot.
// // Get authentication data
// try {
// 	var settings = require("./config.json");
// } catch (e){
// 	console.log("Please create an config.json like config.json.example with a bot token or an email and password.\n"+e.stack); // send message for error - no token
// 	process.exit();
// }
//
// // var Permissions = {};
// // try{
// // 	Permissions = require("./permissions.json");
// // } catch(e){
// // 	console.log("Please create an permissions.json like auth.json.example with a bot token or an email and password.\n"+e.stack); // send message for error - no token
// //  	process.exit();
// // }
//
//
// client.on('message', async message => {
//   // if (message.author != client.user && message.isMentioned(client.user)) {
//   //     var vadimQuotes = [
//   //     "Aşa cum Austria e o ţară de doctori, România e o ţară de preşedinţi – fiecare neisprăvit e preşedinte pe undeva.",
//   //     "Recunosc că în materie de politică sunt zero. Kilometrul zero, am vrut să spun.",
//   //     "Am consultat un medic: era grav bolnav!"
//   //     ];
//   // var vadimQuote = Math.floor(Math.random() * vadimQuotes.length);
//   // msg.channel.send(vadimQuotes[vadimQuote]); //using a mention here can lead to looping
//   //
//   // }
//
//
//   //This reads the first part of your message behind your prefix to see which command you want to use.
//   var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];
//
//   //These are the arguments behind the commands.
//   var args = message.content.split(' ').slice(1);
//
// 	const dropRate = 4;
//
//   if(message.author != client.user && message.author.id != 723002601066594376 && Math.floor(Math.random() * 3) == dropRate && !message.content.startsWith(settings.prefix)){
// 		function randomDrop() {
// 			const dropRange = [
// 			"🥇",
// 			"🥈",
// 			"🥉",
//
// 			];
// 			const dropValue = [
// 			"50",
// 			"25",
// 			"1"
// 			];
//
// 		  var r = Math.floor(Math.random() * dropRange.length);
// 		  message.react(dropRange[r])
// 		  .catch(() => console.error('One of the emojis failed to react.'));
// 		  eco.AddToBalance(message.author.id, dropValue[r]);
// 			// message.reply(' ai castigat ' + dropValue[r] + ' mei')
// 		  }
//
// 	  randomDrop();
//
// 		// const filter = (reaction, user) => {
// 		// 	return reaction.emoji.name === '🥉' && user.id === message.author.id;
// 		// };
// 		//
// 		// message.awaitReactions(filter, { max: 30, time: 10000, errors: ['time'] })
// 		// 	.then(collected => console.log(collected.size))
// 		// 	.catch(collected => {
// 		// 		console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
// 		// 		message.reply(`After a minute, only ${collected.size} out of 4 reacted.`)
// 		// 		eco.AddToBalance(message.author.id, collected.size);
// 		// 	});
//
//  }
// // Load commands
//  if (!client.commands.has(command)) return;
//
//  try {
//  	client.commands.get(command).execute(message, args);
//  } catch (error) {
//  	console.error(error);
//  	message.reply('there was an error trying to execute that command!');
//  }
//   //If the message does not start with your prefix return.
//   //If the user that types a message is a bot account return.
//   if (!message.content.startsWith(settings.prefix) || message.author.bot) return;
//
//
//   // if (command === 'portofel') {
// 	//
//   //   var output = await eco.FetchBalance(message.author.id)
//   //   message.reply(` ai ${output.balance} monede.`);
//   // }
// 	//
// 	// if (command === 'ping') {
//  	// 	client.commands.get('ping').execute();
//  	// }
// 	//
//   // if (command === 'spaga') {
// 	//
//   //   var output = await eco.Daily(message.author.id)
//   //   //output.updated will tell you if the user already claimed his/her daily yes or no.
// 	//
//   //   if (output.updated) {
// 	//
//   //     var profile = await eco.AddToBalance(message.author.id, 100)
//   //     message.reply(`Ti-ai primit spaga pe ziua de azi! Ai ${profile.newbalance} monede.`);
// 	//
//   //   } else {
//   //     message.channel.send(`Ai luat deja spaga pe ziua de azi!\nAsteapta ${output.timetowait} pana sa iei din nou!`)
//   //   }
// 	//
//   // }
// 	//
//   // if (command === 'spagareset' &&  settings.admin == message.author.id) {
// 	//
//   //   var output = await eco.ResetDaily(message.author.id)
// 	//
//   //   message.reply(output) //It will send 'Daily Reset.'
// 	//
//   // }
//
// 	  // if (command === 'setbalance' &&  settings.admin == message.author.id) {
// 		// 	var user = message.mentions.users.first()
// 		// 	var amount = args[1]
// 		//
// 		// 	if (!user) return message.reply('Cui ii trimiti bani?')
// 		// 	if (!amount) return message.reply('Cati bani vrei sa trimiti?')
// 		//
// 		// 	var transfer = await eco.SetBalance(user.id, amount)
// 		// 	var balance = await eco.FetchBalance(user.id)
// 		// 	message.reply("portofel: "+ balance.balance);
// 		//
// 	  // }
//
// 		if (command === 'addbalance' &&  settings.admin  == message.author.id) {
// 			var user = message.mentions.users.first()
// 			var amount = args[1]
//
// 			if (!user) return message.reply('Cui ii trimiti bani?')
// 			if (!amount) return message.reply('Cati bani vrei sa trimiti?')
//
// 			var transfer = await eco.AddToBalance(user.id, amount)
// 			var balance = await eco.FetchBalance(user.id)
// 			message.reply(amount + " spaga la " + user.id + "n\ portofel: "+ balance.balance);
//
// 	  }
// 		if (command === 'taxeaza' &&  settings.admin  == message.author.id) {
// 			var user = message.mentions.users.first()
// 			var amount = args[1]
//
// 			if (!user) return message.reply('Cui ii trimiti bani?')
// 			if (!amount) return message.reply('Cati bani vrei sa trimiti?')
//
// 			var transfer = await eco.SubtractFromBalance(user.id, amount)
// 			var balance = await eco.FetchBalance(user.id)
// 			message.reply(amount + " spaga la " + user.id + "n\ portofel: "+ balance.balance);
//
// 		}
//
//   if (command === 'top') {
//
//     //If you use discord-economy guild based you can use the filter() function to only allow the database within your guild
//     //(message.author.id + message.guild.id) can be your way to store guild based id's
//     //filter: x => x.userid.endsWith(message.guild.id)
//
//     //If you put a mention behind the command it searches for the mentioned user in database and tells the position.
//     if (message.mentions.users.first()) {
//
//       var output = await eco.Leaderboard({
//         filter: x => x.balance > 50,
//         search: message.mentions.users.first().id
//       })
//       message.channel.send(`${message.mentions.users.first().tag} e numarul ${output}!`);
//
//     } else {
// 			 message.channel.send(`Pe cine vrei sa verifici cumetre?`)
// //
// //       eco.Leaderboard({
// //         limit: 3, //Only takes top 3 ( Totally Optional )
// //         // filter: x => x.balance > 50 //Only allows people with more than 100 balance ( Totally Optional )
// //       }).then(async users => { //make sure it is async
// //
// //         if (users[0]) var firstplace = await client.fetchUser(users[0].userid) //Searches for the user object in discord for first place
// //         if (users[1]) var secondplace = await client.fetchUser(users[1].userid) //Searches for the user object in discord for second place
// //         if (users[2]) var thirdplace = await client.fetchUser(users[2].userid) //Searches for the user object in discord for third place
// //
// //         message.channel.send(`My leaderboard:
// //
// // 1 - ${firstplace && firstplace.tag || 'Nobody Yet'} : ${users[0] && users[0].balance || 'None'}
// // 2 - ${secondplace && secondplace.tag || 'Nobody Yet'} : ${users[1] && users[1].balance || 'None'}
// // 3 - ${thirdplace && thirdplace.tag || 'Nobody Yet'} : ${users[2] && users[2].balance || 'None'}`)
//
//       // })
//
//     }
//   }
//
//   if (command === 'transfer') {
//
//     var user = message.mentions.users.first()
//     var amount = args[1]
//
// 		if (!user) return message.reply('Cui ii trimiti bani?')
// 		if (!amount) return message.reply('Cati bani vrei sa trimiti?')
//
//     var output = await eco.FetchBalance(message.author.id)
//     if (output.balance < amount) return message.reply('N-ai bani saracule!')
//
//     var transfer = await eco.Transfer(message.author.id, user.id, amount)
//     message.reply(`Transfering coins successfully done!\nBalance from ${message.author.tag}: ${transfer.FromUser}\nBalance from ${user.tag}: ${transfer.ToUser}`);
//   }
// 	//
//   // if (command === 'moneda') {
// 	//
//   //   var flip = args[0] //Heads or Tails
//   //   var amount = args[1] //Coins to gamble
// 	//
//   //   if (!flip || !['cap', 'pajura'].includes(flip)) return message.reply('Cap sau pajura?')
//   //   // if (!amount) return message.reply('Cat vrei sa joci bastanule?!')
// 	// 	if (!amount) var amount = 10
// 	//
//   //   var output = await eco.FetchBalance(message.author.id)
//   //   if (output.balance < amount) return message.reply('N-ai bani, esti sarac!')
// 	//
//   //   var gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error)
//   //   message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`)
// 	//
//   // }
//
//   // if (command === 'barbut') {
// 	//
//   //   var roll = args[0] //Should be a number between 1 and 6
//   //   var amount = args[1] //Coins to gamble
// 	//
//   //   if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Zi un numar intre 1-6')
// 	// 	// if (!amount) return message.reply('Cat vrei sa joci bastanule?!')
// 	// 	if (!amount) var amount = 10
// 	//
//   //   var output = eco.FetchBalance(message.author.id)
//   //   if (output.balance < amount) return message.reply('N-ai bani, saracie!')
// 	//
//   //   var gamble = await eco.Dice(message.author.id, roll, amount).catch(console.error)
//   //   message.reply(`Ai dat \`${gamble.dice}\`. Ai ${gamble.output}! Portofel: ${gamble.newbalance}`)
// 	//
//   // }
//
//   if (command == 'delete' && settings.admin == message.author.id){ //You want to make this command admin only!
//
//     var user = message.mentions.users.first()
//     if (!user) return message.reply('Please specify a user I have to delete in my database!')
//
//     var output = await eco.Delete(user.id)
//     if (output.deleted == true) return message.reply('Successfully deleted the user out of the database!')
//
//     message.reply('Error: Could not find the user in database.')
//
//   }
//
//   if (command === 'munca') { //I made 2 examples for this command! Both versions will work!
//
//     var output = await eco.Work(message.author.id)
//     //50% chance to fail and earn nothing. You earn between 1-100 coins. And you get one out of 20 random jobs.
//     if (output.earned == 0) return message.reply('Mai incearca!')
//     message.channel.send(`${message.author.username} ai lucrat ca \`${output.job}\` si ai facut ${output.earned} de mei`)
//
//
//     var output = await eco.Work(message.author.id, {
//       failurerate: 10,
//       money: Math.floor(Math.random() * 2),
// 			jobs:['curva', 'bulangiu', 'mecanic', 'corporatist', 'ziarist', 'streamer', 'gunoier', 'sclavete']
//     })
//
//
//   }
//
//   if (command === 'pacanele') {
//
//     var amount = args[0] //Coins to gamble
//
//     if (!amount) return message.reply('Cat vrei sa joci?')
//
//     var output = await eco.FetchBalance(message.author.id)
//     if (output.balance < amount) return message.reply('Esti sarac, n-ai bani!')
//
//     var gamble = await eco.Slots(message.author.id, amount, {
//       width: 3,
//       height: 1
//     }).catch(console.error)
//     message.channel.send(gamble.grid)//Grid checks for a 100% match vertical or horizontal.
//     message.reply(`You ${gamble.output}! portofel: ${gamble.newbalance}`)
//
//   }
//
//
//
//   if(message.author == client.user){
//       return true; //returning true to prevent feedback from commands
//   }
//
// 	// if (message.isMemberMentioned(client.user)) {
// 	// // 		var vadimQuotes = [
// 	// // 		"Aşa cum Austria e o ţară de doctori, România e o ţară de preşedinţi – fiecare neisprăvit e preşedinte pe undeva.",
// 	// // 		"Recunosc că în materie de politică sunt zero. Kilometrul zero, am vrut să spun.",
// 	// // 		"Am consultat un medic: era grav bolnav!",
// 	// // 		];
// 	// // var vadimQuote = Math.floor(Math.random() * vadimQuotes.length);
// 	// // message.channel.send(vadimQuotes[vadimQuote]); //using a mention here can lead to looping
// 	// console.log(test);
// 	//
// 	// }
//
// 	// if (command === 'avatar') {
// 	// 	if (args[0]) {
// 	// 		const user = message.mentions.users.first();
// 	// 		if (!user) {
// 	// 			return message.reply('Please use a proper mention if you want to see someone else\'s avatar.');
// 	// 		}
// 	//
// 	// 		return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
// 	// 	}
// 	//
// 	// 	return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
// 	// }
// 	//
// 	//
//
//
//
//
//
//
//
//
//
//
//
//
//
// });
// // Create an event listener for new guild members
// client.on('guildMemberAdd', member => {
//   // Send the message to a designated channel on a server:
//   const channel = member.guild.channels.cache.find(ch => ch.name === 'gambling-house');
//   // Do nothing if the channel wasn't found on this server
//   if (!channel) return;
//   // Send the message, mentioning the member
//   channel.send(`Ai primit 100 de mei, ${member}, scrie $ajutor pentru a vedea comenzile de joc.`);
// 	var amount = 100;
// 	var transfer = eco.SetBalance(member.id, amount)
// 	var balance = eco.FetchBalance(member.id)
// });
//
//
// //Your secret token to log the bot in. (never show this to anyone!)
// client.login(settings.token)
