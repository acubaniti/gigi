/*
If you want to make discord-economy guild based you have to use message.author.id + message.guild.id as ID for example:
eco.Daily(message.author.id + message.guild.id)

This will create a unique ID for each guild member
*/


//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
const eco = require("discord-economy");
const admin = "493189989128077342";
//Create the bot client
const client = new Discord.Client();

//Set the prefix and token of the bot.

// Get authentication data
try {
	var settings = require("./config.json");
} catch (e){
	console.log("Please create an auth.json like auth.json.example with a bot token or an email and password.\n"+e.stack); // send message for error - no token
	process.exit();
}

// var Permissions = {};
// try{
// 	Permissions = require("./permissions.json");
// } catch(e){
// 	console.log("Please create an permissions.json like auth.json.example with a bot token or an email and password.\n"+e.stack); // send message for error - no token
//  	process.exit();
// }

//Whenever someone types a message this gets activated.
//(If you use 'await' in your functions make sure you put async here)
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

  if(message.author != client.user && Math.floor(Math.random() * 2) == 15){
         function randomDrop() {
     var dropRange = [
         "🥇",
         "🥈",
         "🥉",

     ];
     var dropValue = [
         "50",
         "25",
         "1"

     ];
     var r = Math.floor(Math.random() * dropRange.length);
     message.react(dropRange[r])
     .catch(() => console.error('One of the emojis failed to react.'));
     eco.AddToBalance(message.author.id, dropValue[r])
}
 randomDrop();
 }

  //This reads the first part of your message behind your prefix to see which command you want to use.
  var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];

  //These are the arguments behind the commands.
  var args = message.content.split(' ').slice(1);

  //If the message does not start with your prefix return.
  //If the user that types a message is a bot account return.
  if (!message.content.startsWith(settings.prefix) || message.author.bot) return;

  if (command === 'portofel') {

    var output = await eco.FetchBalance(message.author.id)
    message.channel.send(`${message.author.tag} ai ${output.balance} monede.`);
  }

  if (command === 'spaga') {

    var output = await eco.Daily(message.author.id)
    //output.updated will tell you if the user already claimed his/her daily yes or no.

    if (output.updated) {

      var profile = await eco.AddToBalance(message.author.id, 100)
      message.reply(`Ti-ai primit spaga pe ziua de azi! Ai ${profile.newbalance} monede.`);

    } else {
      message.channel.send(`Ai luat deja spaga pe ziua de azi!\nAsteapta ${output.timetowait} pana sa iei din nou!`)
    }

  }

  if (command === 'resetdaily' &&  admin == message.author.id) {

    var output = await eco.ResetDaily(message.author.id)

    message.reply(output) //It will send 'Daily Reset.'

  }

	  if (command === 'setbalance' &&  admin == message.author.id) {
			var user = message.mentions.users.first()
			var amount = args[1]

			if (!user) return message.reply('Cui ii trimiti bani?')
			if (!amount) return message.reply('Cati bani vrei sa trimiti?')

			var transfer = await eco.SetBalance(user.id, amount)
			var balance = await eco.FetchBalance(user.id)
			message.reply( user.id + " portofel: "+ balance.balance);

	  }
		if (command === 'addbalance' &&  admin == message.author.id) {
			var user = message.mentions.users.first()
			var amount = args[1]

			if (!user) return message.reply('Cui ii trimiti bani?')
			if (!amount) return message.reply('Cati bani vrei sa trimiti?')

			var transfer = await eco.AddToBalance(user.id, amount)
			var balance = await eco.FetchBalance(user.id)
			message.reply(amount + " spaga la " + user.id + "n\ portofel: "+ balance.balance);

	  }
		if (command === 'substract' &&  admin == message.author.id) {
			var user = message.mentions.users.first()
			var amount = args[1]

			if (!user) return message.reply('Cui ii trimiti bani?')
			if (!amount) return message.reply('Cati bani vrei sa trimiti?')

			var transfer = await eco.SubtractFromBalance(user.id, amount)
			var balance = await eco.FetchBalance(user.id)
			message.reply(amount + " substracted from " + user.id + "n\ new balance: "+ balance.balance);

		}
  if (command === 'top') {

    //If you use discord-economy guild based you can use the filter() function to only allow the database within your guild
    //(message.author.id + message.guild.id) can be your way to store guild based id's
    //filter: x => x.userid.endsWith(message.guild.id)

    //If you put a mention behind the command it searches for the mentioned user in database and tells the position.
    if (message.mentions.users.first()) {

      var output = await eco.Leaderboard({
        filter: x => x.balance > 50,
        search: message.mentions.users.first().id
      })
      message.channel.send(`${message.mentions.users.first().tag} e numarul ${output}!`);

    } else {
			 message.channel.send(`Pe cine vrei sa verifici cumetre?`)
//
//       eco.Leaderboard({
//         limit: 3, //Only takes top 3 ( Totally Optional )
//         // filter: x => x.balance > 50 //Only allows people with more than 100 balance ( Totally Optional )
//       }).then(async users => { //make sure it is async
//
//         if (users[0]) var firstplace = await client.fetchUser(users[0].userid) //Searches for the user object in discord for first place
//         if (users[1]) var secondplace = await client.fetchUser(users[1].userid) //Searches for the user object in discord for second place
//         if (users[2]) var thirdplace = await client.fetchUser(users[2].userid) //Searches for the user object in discord for third place
//
//         message.channel.send(`My leaderboard:
//
// 1 - ${firstplace && firstplace.tag || 'Nobody Yet'} : ${users[0] && users[0].balance || 'None'}
// 2 - ${secondplace && secondplace.tag || 'Nobody Yet'} : ${users[1] && users[1].balance || 'None'}
// 3 - ${thirdplace && thirdplace.tag || 'Nobody Yet'} : ${users[2] && users[2].balance || 'None'}`)

      // })

    }
  }

  if (command === 'transfer') {

    var user = message.mentions.users.first()
    var amount = args[1]

		if (!user) return message.reply('Cui ii trimiti bani?')
		if (!amount) return message.reply('Cati bani vrei sa trimiti?')

    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('N-ai bani saracule!')

    var transfer = await eco.Transfer(message.author.id, user.id, amount)
    message.reply(`Transfering coins successfully done!\nBalance from ${message.author.tag}: ${transfer.FromUser}\nBalance from ${user.tag}: ${transfer.ToUser}`);
  }

  if (command === 'coinflip') {

    var flip = args[0] //Heads or Tails
    var amount = args[1] //Coins to gamble

    if (!flip || !['heads', 'tails'].includes(flip)) return message.reply('Please specify the flip, either heads or tails!')
    if (!amount) return message.reply('Specify the amount you want to gamble!')

    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('You have fewer coins than the amount you want to gamble!')

    var gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error)
    message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`)

  }

  if (command === 'barbut') {

    var roll = args[0] //Should be a number between 1 and 6
    var amount = args[1] //Coins to gamble

    if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Zi un numar intre 1-6')
    if (!amount) var amount = 10

    var output = eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('N-ai bani, saracie!')

    var gamble = await eco.Dice(message.author.id, roll, amount).catch(console.error)
    message.reply(`Ai dat \`${gamble.dice}\`. Ai ${gamble.output}! Portofel: ${gamble.newbalance}`)

  }

  if (command == 'delete' && 493189989128077342 == message.author.id){ //You want to make this command admin only!

    var user = message.mentions.users.first()
    if (!user) return message.reply('Please specify a user I have to delete in my database!')

    if (!message.guild.me.hasPermission(`ADMINISTRATION`)) return message.reply('You need to be admin to execute this command!')

    var output = await eco.Delete(user.id)
    if (output.deleted == true) return message.reply('Successfully deleted the user out of the database!')

    message.reply('Error: Could not find the user in database.')

  }

  if (command === 'munca') { //I made 2 examples for this command! Both versions will work!

    var output = await eco.Work(message.author.id)
    //50% chance to fail and earn nothing. You earn between 1-100 coins. And you get one out of 20 random jobs.
    if (output.earned == 0) return message.reply('Mai incearca!')
    message.channel.send(`${message.author.username} ai lucrat ca \`${output.job}\` si ai facut ${output.earned} de mei`)


    var output = await eco.Work(message.author.id, {
      failurerate: 10,
      money: Math.floor(Math.random() * 2),
			jobs:['curva', 'bulangiu', 'mecanic', 'corporatist', 'ziarist', 'streamer', 'gunoier', 'sclavete']
    })


  }

  if (command === 'pacanele') {

    var amount = args[0] //Coins to gamble

    if (!amount) return message.reply('Cat vrei sa joci?')

    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('Esti sarac, n-ai bani!')

    var gamble = await eco.Slots(message.author.id, amount, {
      width: 3,
      height: 1
    }).catch(console.error)
    message.channel.send(gamble.grid)//Grid checks for a 100% match vertical or horizontal.
    message.reply(`You ${gamble.output}! portofel: ${gamble.newbalance}`)

  }


  if(message.author == client.user){
      return true; //returning true to prevent feedback from commands
  }

});

//Your secret token to log the bot in. (never show this to anyone!)
client.login(settings.token)
