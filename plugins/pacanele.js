// // //Requiring Packages
// const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
// // const {
// //         Users,
// //         CurrencyShop
// // } = require('./dbObjects');
// // const {
// //         Op
// // } = require('sequelize');
// // const currency = new Discord.Collection();
// //
// // client.once('ready', async () => {
// //         // [beta]
// //         const storedBalances = await Users.findAll();
// //         storedBalances.forEach(b => currency.set(b.user_id, b));
// //         console.log(`Logged in as ${client.user.tag}!`);
// // });
// const { currency, getBalance, add, addXp, getX} = require('../run.js');
// module.exports = {
// 	name: 'pacanele',
// 	// description: 'Ia-ti spaga',
// async	execute(message, args){
//
//
//                   // var roll = args[0] //Should beee a number between 1 and 6
//                   var amount = parseInt(args[0], 10); //Coins to gamble
//                   if (!amount) var amount = 1;
//
//                   let balance = currency.getBalance(message.author.id);
//                   const dropRange = [
//                           "🍒",
//                           "🍋",
//                           "🥦",
//
//                   ];
//                   if (balance < amount) return message.reply('Esti sarac, n-ai bani!');
//
//                   let a = Math.floor(Math.random() * dropRange.length);
//                   let b = Math.floor(Math.random() * dropRange.length);
//                   let c = Math.floor(Math.random() * dropRange.length);
//                   // eco.AddToBalance(message.author.id, dropValue[r]);
//                   // var balance = await currency.getBalance(message.author.id);
//                   // await currency.add(message.author.id,dropValue[r]);
//                   if (a == b && b == c && c == 0) {
//                           await currency.add(message.author.id, +(amount * 6));
//                           message.reply("Ai castigat `" + (amount * 6) + "` mei.");
//                           return message.channel.send("`" + dropRange[a] + dropRange[b] + dropRange[c] + "`");
//                   };
//                   if (a == b && b == c && c == 1) {
//                           await currency.add(message.author.id, +(amount * 3));
//                           message.reply("Ai castigat `" + (amount * 3) + "` mei.");
//
//                           return message.channel.send("`" + dropRange[a] + dropRange[b] + dropRange[c] + "`");
//
//                   };
//                   if (a == b && b == c && c == 2) {
//                           await currency.add(message.author.id, +amount);
//                           message.reply("Ai castigat `" + amount + "` mei.");
//                           return message.channel.send("`" + dropRange[a] + dropRange[b] + dropRange[c] + "`");
//
//
//                   };
//                   // message.reply("Ai pierdut " + amount + " mei." )
//                   await currency.add(message.author.id, -amount);
//                   return message.channel.send("`" + dropRange[a] + dropRange[b] + dropRange[c] + "`");
//
//
//
// 	}
// };
