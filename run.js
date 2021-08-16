/*
If you want to make discord-economy guild based you have to use message.author.id + message.guild.id as ID for example:
eco.Daily(message.author.id + message.guild.id)

This will create a unique ID for each guild member
*/


//Requiring Packages
const fs = require('fs');
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
// const eco = require("discord-economy");
 
//Create the bot client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const {
        Users,
        CurrencyShop
} = require('./dbObjects');
const {
        Op
} = require('sequelize');
const currency = new Discord.Collection();

client.once('ready', async () => {
        // [beta]
        const storedBalances = await Users.findAll();
        storedBalances.forEach(b => currency.set(b.user_id, b));
        console.log(`Logged in as ${client.user.tag}!`);
});
// Command handler
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./plugins').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
        const command = require(`./plugins/${file}`);
        client.commands.set(command.name, command);
        // console.log(`${file} loaded`);
}

//Set the prefix and token of the bot.
// Get authentication data
try {
        var settings = require("./config.json");
} catch (e) {
        console.log("Please create an config.json like config.json.example with a bot token or an email and password.\n" + e.stack); // send message for error - no token
        process.exit();
}
Reflect.defineProperty(currency, 'add', {
        /* eslint-disable-next-line func-name-matching */
        value: async function add(id, amount) {
                const user = currency.get(id);
                if (user) {
                        user.balance += Number(amount);
                        return user.save();
                }
                const newUser = await Users.create({
                        user_id: id,
                        balance: amount
                });
                currency.set(id, newUser);
                return newUser;
        },
});

Reflect.defineProperty(currency, 'addXp', {
        /* eslint-disable-next-line func-name-matching */
        value: async function add(id, amount) {
                const user = currency.get(id);
                if (user) {
                        user.xp += Number(amount);
                        return user.save();
                }
                const newUser = await Users.create({
                        user_id: id,
                        xp: amount

                });
                currency.set(id, newUser);
                return newUser;
        },
});
Reflect.defineProperty(currency, 'getBalance', {
        /* eslint-disable-next-line func-name-matching */
        value: function getBalance(id) {
                const user = currency.get(id);
                return user ? user.balance : 0;
        },
});

Reflect.defineProperty(currency, 'getXp', {
        /* eslint-disable-next-line func-name-matching */
        value: function getBalance(id) {
                const user = currency.get(id);
                return user ? user.xp : 0;
        },
});
// var Permissions = {};
// try{
// 	Permissions = require("./permissions.json");
// } catch(e){§
// 	console.log("Please create an permissions.json like auth.json.example with a bot token or an email and password.\n"+e.stack); // send message for error - no token
//  	process.exit();
// }


client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.partial) {
                try {
                        await reaction.message.fetch();
                } catch (error) {
                        console.log('Something went wrong when fetching the message: ', error);
                }
        }
        console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
});

client.on('messageReactionRemove', async (reaction, user) => {
        if (reaction.message.partial) {
                try {
                        await reaction.message.fetch();
                } catch (error) {
                        console.log('Something went wrong when fetching the message: ', error);
                }
        }
        console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`);
});

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
        //If the message does not start with your prefix return.
        //If the user that types a message is a bot account return.
        // const dropRate = 1;
        // let dropChance = Math.floor(Math.random() * 10);
        // // console.log(dropRate +" - "+ dropChance);
        //
        // async function randomDrop() {
        //         const dropRange = [
        //                 "🥇",
        //                 "🥈",
        //                 "🥉",
        //
        //         ];
        //         const dropValue = [
        //                 "10",
        //                 "5",
        //                 "1"
        //         ];
        //
        //         var r = Math.floor(Math.random() * dropRange.length);
        //         message.react(dropRange[r])
        //                 .catch(() => console.error('One of the emojis failed to react.'));
        //         // eco.AddToBalance(message.author.id, dropValue[r]);
        //         var balance = await currency.getBalance(message.author.id);
        //         await currency.add(message.author.id, dropValue[r]);
        //
        //         // console.log(balance);
        //         // message.reply(' ai castigat ' + dropValue[r] + ' mei')
        // }

        // message.author.id != 723002601066594376 &&
        // if (message.author.id != 723002601066594376 &&  dropChance == dropRate &&  !message.content.startsWith(settings.prefix))
        //    {
        //     randomDrop();
        // }
        //         // currency.add(message.author.id, 1);
        if (!message.content.startsWith(settings.prefix) || message.author.bot) return;
        if (message.author == client.user) {
                return true; //returning true to prevent feedback from commands
        }

        // currency.addXp(message.author.id, 1);
        //This reads the first part of your message behind your prefix to see which command you want to use.
        var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];

        //These are the arguments behind the commands.
        var args = message.content.split(' ').slice(1);

        if (command === 'addbalance') {
                // [gamma]
                if (!settings.admin == message.author.id) return message.reply("N-ai voie!");
                if (settings.admin == message.author.id) {
                  if (args[0] === "all") {

                    const guild  = client.guilds.cache.get("710765073114595389");

                    if (args[1] === "item") {
                      const item = await CurrencyShop.findOne({
                              where: {
                                      name: {
                                              [Op.like]: args[2]
                                      }
                              }
                      });
                      if (!item) return message.channel.send(`Acest obiect nu exista.`);

                      const addItem =async function(member, item){
                        const user = await Users.findOne({
                                where: {
                                        user_id: member
                                }
                        });
                      user.addItem(item);
                      console.log(item.name + user.tag);
                      }

                      guild.members.cache.forEach(member =>  addItem(member.user.id, item));

                      return message.channel.send("<@" + settings.admin + ">, a facut cadou fiecaruia `" + item.name + "`.");
                    }
                    guild.members.cache.forEach(member =>  currency.add(member.user.id, parseInt(args[1], 10)));
                    return message.channel.send("<@" + settings.admin + ">, a gasit un kil si il imparte cu toata lumea, fiecare primeste `" + args[1] + "` :money_with_wings: `mei`.");

                  }


                const currentAmount = currency.getBalance(message.author.id);
                const transferAmount = args[1];
                const transferTarget = message.mentions.users.first();

                if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
                // if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
                if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);

                // currency.add(message.author.id, -transferAmount);

                await currency.add(transferTarget.id, parseInt(transferAmount, 10));

                return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`);
        }  }


        if (command === 'taxeaza') {
                // [gamma]
                if (!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) return message.reply("N-ai voie!");
                const currentAmount = currency.getBalance(message.author.id);
                const transferAmount = args[1];
                const transferTarget = message.mentions.users.first();

                if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
                // if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
                if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);

                // currency.add(message.author.id, -transferAmount);

                await currency.add(transferTarget.id, parseInt(-transferAmount, 10));

                return message.channel.send(`Successfully taxed ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`);
        }




        if (command === 'magazin') {
                // [gamma]

                const items = await CurrencyShop.findAll();
                // return message.channel.send(items.map(item => `${item.name}: ${item.cost} mei`).join('\n'), {
                //         code: true
                // });
                // console.log(items);
                const inventoryEmbed = new Discord.MessageEmbed()
                        .setTitle('Magazin')
                        .setDescription('Tot ce necesiti intr-un singur loc.')
                        .setFooter('Scrie $ajutor pentru toate comenzile')

                items.forEach(function(i) {

                        // console.log(i.amount+ ' - ' + i.item.name)
                        inventoryEmbed.addFields({
                                name: i.name + " - `" + i.cost + "` mei",
                                value: i.description
                        })
                })
                return message.channel.send(inventoryEmbed);


        }
        if (command === 'barbut') {

                var roll = parseInt(args[0], 10); //Should beee a number between 1 and 6
                var amount = parseInt(args[1], 10); //Coins to gamble
                if (!amount) var amount = 1;
                let diceRoll = (Math.floor(Math.random() * 5) + 1);
                var balance = currency.getBalance(message.author.id);

                if (balance < amount) return message.reply('Esti sarac, n-ai bani!');

                if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Zi un numar intre `1-6`');
                // if (!amount) return message.reply('Cat vrei sa joci bastanule?!')
                if (roll == diceRoll) {
                        message.reply("Ai dat `" + diceRoll + "`. Ai castigat.");
                        await currency.add(message.author.id, +(amount * 2));

                } else {
                        message.reply("Ai dat `" + diceRoll + "`. Ai pierdut.");
                        await currency.add(message.author.id, -amount);

                }


        }
        if (command === 'pacanele') {

                // var roll = args[0] //Should beee a number between 1 and 6
                var amount = parseInt(args[0], 10); //Coins to gamble
                if (!amount) var amount = 1;

                let balance = currency.getBalance(message.author.id);
                const dropRange = [
                        "🍒",
                        "🍋",
                        "🥦",

                ];
                if (balance < amount) return message.reply('Esti sarac, n-ai bani!');

                let a = Math.floor(Math.random() * dropRange.length);
                let b = Math.floor(Math.random() * dropRange.length);
                let c = Math.floor(Math.random() * dropRange.length);
                // eco.AddToBalance(message.author.id, dropValue[r]);
                // var balance = await currency.getBalance(message.author.id);
                // await currency.add(message.author.id,dropValue[r]);
                if (a == b && b == c && c == 0) {
                        await currency.add(message.author.id, +(amount * 6));
                        message.reply("Ai castigat `" + (amount * 6) + "` mei.");
                        return message.channel.send("`" + dropRange[a] + dropRange[b] + dropRange[c] + "`");
                };
                if (a == b && b == c && c == 1) {
                        await currency.add(message.author.id, +(amount * 3));
                        message.reply("Ai castigat `" + (amount * 3) + "` mei.");

                        return message.channel.send("`" + dropRange[a] + dropRange[b] + dropRange[c] + "`");

                };
                if (a == b && b == c && c == 2) {
                        await currency.add(message.author.id, +amount);
                        message.reply("Ai castigat `" + amount + "` mei.");
                        return message.channel.send("`" + dropRange[a] + dropRange[b] + dropRange[c] + "`");


                };
                // message.reply("Ai pierdut " + amount + " mei." )
                await currency.add(message.author.id, -amount);
                return message.channel.send("`" + dropRange[a] + dropRange[b] + dropRange[c] + "`");



        }

        if (command === 'top') {
                // [gamma]
                return message.channel.send(
                        currency.sort((a, b) => b.balance - a.balance)
                        .filter(user => client.users.cache.has(user.user_id))
                        .first(10)
                        .map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance} 💰`)
                        .join('\n'), {
                                code: true
                        }
                );

        }

        if (command === 'portofel') {
                // [gamma]
                const target = message.mentions.users.first() || message.author;
                return message.channel.send(`<@${target.id}> are ${currency.getBalance(target.id)} mei.`);


        }
        if (command === 'experienta') {
                // [gamma]
                const target = message.mentions.users.first() || message.author;
                return message.channel.send(`<@${target.id}> are ${currency.getXp(target.id)} experienta.`);

        }

        if (command === 'transfer') {
                // [gamma]
                const currentAmount = currency.getBalance(message.author.id);
                const transferAmount = parseInt(args[1], 10);
                const transferTarget = message.mentions.users.first();

                if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`${message.author}, suma invalida.`);
                if (transferAmount > currentAmount) return message.channel.send(`${message.author}, esti sarac, ai doar ${currentAmount}.`);
                if (transferAmount <= 0) return message.channel.send(`Adauga suma, ${message.author}.`);

                currency.add(message.author.id, -transferAmount);

                currency.add(transferTarget.id, transferAmount);

                return message.channel.send(`Ai transferat ${transferAmount} catre ${transferTarget.tag}. Mai ai ${currency.getBalance(message.author.id)} mei in portofel.`);
        }
        if (command === 'inventar') {
                // [gamma]
                const target = message.mentions.users.first() || message.author;
                const user = await Users.findOne({
                        where: {
                                user_id: target.id
                        }
                });
                const items = await user.getItems();
                const inventoryEmbed = new Discord.MessageEmbed()
                        .setTitle('Inventar')
                        .setDescription('Tot ce ai la tine.')
                        .setFooter('Scrie $ajutor pentru toate comenzile')

                items.forEach(function(i) {

                        // console.log(i.amount+ ' - ' + i.item.name)
                        inventoryEmbed.addFields({
                                name: i.item.name + " - `" + i.amount + "`",
                                value: i.item.description
                        })
                })

                if (!items.length) return message.channel.send(`${target.tag} nu ai nimic pe tine, saracie!`);
                message.channel.send(inventoryEmbed);

                // return message.channel.send(`${target.tag} ai \n ${items.map(i => `${i.item.name} - ${i.amount} `).join(' \n ')}`);

        }


        if (command === 'cumpara') {
                // [gamma]
                const item = await CurrencyShop.findOne({
                        where: {
                                name: {
                                        [Op.like]: args[0]
                                }
                        }
                });
                if (!item) return message.channel.send(`Acest obiect nu exista.`);
                if (item.cost > currency.getBalance(message.author.id)) {
                        return message.channel.send(`Momentan ai ${currency.getBalance(message.author.id)}, dar ${item.name} costa ${item.cost}!`);
                }

                const user = await Users.findOne({
                        where: {
                                user_id: message.author.id
                        }
                });
                currency.add(message.author.id, -item.cost);
                await user.addItem(item);

                message.channel.send(`Ai cumparat: ${item.name}.`);

        }
        if (command === "foloseste") {
                const item = await CurrencyShop.findOne({
                        where: {
                                name: {
                                        [Op.like]: args[0]
                                }
                        }
                });
                const item2 = await CurrencyShop.findOne({
                        where: {
                                name: {
                                        [Op.like]: args[1]
                                }
                        }
                });
                const user = await Users.findOne({
                        where: {
                                user_id: message.author.id
                        }
                });
                if (!item) return message.channel.send(`Acest obiect nu exista.`);
                // if (!item || !item2) return message.channel.send(`Acest obiect nu exista.`);

                if (await user.hasItem(item) == null) {
                        return message.channel.send("Nu ai toate obiectele necesare, iti lipseste `" + item.name + "`");
                }

                if (args[0] === "cheie") {
                        if (!args[1]) return message.channel.send(`Pe ce obiect folosesti cheia :key: ?`);
                        if (!item2) return message.channel.send(`Acest obiect nu exista. ` + args[1]);

                        if (args[1] === "cutie") {
                                if (await user.hasItem(item2) == null) {
                                        return message.channel.send("Nu ai toate obiectele necesare, iti lipseste `" + item2.name + "`  :gift:");
                                }
                                var dropValue = Math.floor(Math.random() * 1500);
                                var xpValue = Math.floor(Math.random() * 30);
                                // const dropRange = [
                                //         "prezervativ",
                                //         "cutie",
                                //         "cutit",
                                //
                                // ];
                                // // const dropValue = [
                                // //         "3",
                                // //         "2",
                                // //         "1"
                                // // ];
                                // const item = await CurrencyShop.findOne({
                                //         where: {
                                //                 name: {
                                //                         [Op.like]: args[0]
                                //                 }
                                //         }
                                // });
                                //
                                // var r = Math.floor(Math.random() * dropRange.length);
                                // eco.AddToBalance(message.author.id, dropValue[r]);
                                // var balance = await currency.getBalance(message.author.id);

                                await user.deleteItem(item);
                                await user.deleteItem(item2);
                                await currency.add(message.author.id, dropValue);
                                await currency.addXp(message.author.id, xpValue);;
                                return message.channel.send("Felicitari, ai deschis `" + item2.name + "` :gift:. Ai castigat `" + dropValue + "` :money_with_wings: `mei` si `" + xpValue + "` :microbe: `experienta`");
                        }
                }
                if (args[0] === "cutit") {


                        var damageDealt = Math.floor(Math.random() * 30);
                        var amountStolen = Math.floor(Math.random() * 30);
                        const target = message.mentions.users.first();
                        if (!target) return message.channel.send(`Pe cine vrei sa injunghii :knife: ?`);
                        if (target.id === settings.admin) return message.channel.send("Ai incercat sa il intepi pe <@" + target.id + ">, dar te-a intepat el pe tine el pe tine.");

                        await currency.addXp(message.author.id, damageDealt);
                        await currency.add(message.author.id, amountStolen);
                        await currency.add(target.id, -amountStolen);
                        // return message.channel.send("L-ai intepat pe <@" + target.id + ">, :knife: ai facut `" + damageDealt + "` :microbe: `experienta` si ai furat `" + amountStolen + "` :money_with_wings: `mei`", {files: ["https://thumbs.gfycat.com/FavoriteBewitchedArabianwildcat-size_restricted.gif"]});
                        return message.channel.send("L-ai intepat pe <@" + target.id + ">, :knife: ai facut `" + damageDealt + "` :microbe: `experienta` si ai furat `" + amountStolen + "` :money_with_wings: `mei`");

                }

                if (args[0] === "ak47") {

                        var damageDealt = Math.floor(Math.random() * 100);
                        var amountStolen = Math.floor(Math.random() * 100);
                        const target = message.mentions.users.first();
                        if (!target) return message.channel.send(`Pe cine vrei sa impusti?`);
                        if (target.id === settings.admin) return message.channel.send("Ai incercat sa il impusti pe <@" + target.id + ">, dar ai fost violat de giboni scapati de la un meci cu Rapid.");
                        await currency.addXp(message.author.id, damageDealt);
                        await currency.add(message.author.id, amountStolen);
                        await currency.add(target.id, -amountStolen);
                        return message.channel.send("L-ai impuscat pe <@" + target.id + ">, ai facut `" + damageDealt + "` :microbe: `experienta` si ai furat `" + amountStolen + "` :money_with_wings: `mei`");

                }
                if (args[0] === "pistol") {

                        var damageDealt = Math.floor(Math.random() * 50);
                        var amountStolen = Math.floor(Math.random() * 50);
                        const target = message.mentions.users.first();
                        if (!target) return message.channel.send(`Pe cine vrei sa impusti?`);
                        if (target.id === settings.admin) return message.channel.send("Ai incercat sa il impusti pe <@" + target.id + ">, dar ai scapat pistolul pe jos si te-ai impuscat singur in pula.");
                        await currency.addXp(message.author.id, damageDealt);
                        await currency.add(message.author.id, amountStolen);
                        await currency.add(target.id, -amountStolen);
                        return message.channel.send("L-ai impuscat pe <@" + target.id + ">, ai facut `" + damageDealt + "` :microbe: `experienta` si ai furat `" + amountStolen + "` :money_with_wings: `mei`");

                }
                if (args[0] === "prezervativ") {
                        var experienta = Math.floor(Math.random() * 20);
                        var amountStolen = Math.floor(Math.random() * 10);
                        await user.deleteItem(item);
                        const target = message.mentions.users.first();

                        // if (target.id === settings.admin) return message.channel.send("Ai incercat sa il futi pe <@" + target.id + ">, dar te-a futut el pe tine.");
                        await currency.addXp(message.author.id, experienta);
                        if (target) {
                                if (target.id === settings.admin) return message.channel.send("Ai incercat sa il futi pe <@" + target.id + ">, dar te-au prins jandarmii si te-au futut in cur.");
                                await currency.add(message.author.id, amountStolen);
                                await currency.add(target.id, -amountStolen);
                                return message.channel.send("L-ai futut pe <@" + target.id + ">, ai facut `" + experienta + "` :microbe: `experienta` si ai furat `" + amountStolen + "` :money_with_wings: `mei`.");

                        }

                        return message.channel.send("Ti-ai pus prezervativ, acum futi cu efect. Ai facut `" + experienta + "` :microbe: `experienta`.");
                }
        }


        // const swearWords = ["darn", "shucks", "frak", "shite"];
        // if( swearWords.some(word => message.content.includes(word)) ) {
        //   message.reply("Oh no you said a bad word!!!");
        //   // Or just do message.delete();
        // }

        // Load commands
        if (!client.commands.has(command)) return;

        try {
                client.commands.get(command).execute(message, args);
        } catch (error) {
                console.error(error);
                message.reply('there was an error trying to execute that command!');
        }




});
// Create an event listener for new guild members
client.on('guildMemberAdd',  member => {
        // Send the message to a designated channel on a server:
        const channel = member.guild.channels.cache.find(ch => ch.name === 'gambling-house');
        const channelGeneral = member.guild.channels.cache.find(ch => ch.name === 'general');

        // Do nothing if the channel wasn't found on this server
        if (!channel) return;
        const helloEmbed = new Discord.MessageEmbed()
                .setAuthor('Luptatorul luminii')
                .setTitle('Bine ai venit, prost ai nimerit.')
                .setDescription('Pe aici se praduieste dar eu, Gigi Becali, te pot ajuta. Regulile sunt simple, le gasesti [aici](https://www.youtube.com/watch?v=urjGJJsMLIY). Scrie $ajutor in orice canal de pe server pentru toate comenzile. ')
                  .addFields(
                    { name: 'Politica', value: 'Aici e simplu, incepi fraier si speri sa nu ramai asa. In timp ce strangi experienta urci in rol si obti acces la mai multe canale.'},
                    { name: 'Economie', value: 'Valuta serverului este mel-ul, ca sa il castigi poti juca la $pacanele sau $barbut, poti $cumpara cutie, posta imagini amuzante sau il poti fura de la alti fraieri.'},
                    { name: 'Magazin si obiecte', value: 'Poti cumpara anumite obiecte de la $magazin. Acestea te ajuta in diferite moduri si te poti bucura de ele prin comanda $foloseste.'},
                    { name: 'Comunitate', value: 'Daca vrei sa vorbesti cu ceilalti membri scrie un "salut" pe canalul general.' },
)
        member.send(helloEmbed);
         // client.users.cache.get('<id>').send('<message>');
        // Send the message, mentioning the member

        const guild  = client.guilds.cache.get("710765073114595389");
          var amount = 100;
          var transfer = currency.add(member.id, amount);
          var balance = currency.getBalance(member.id);
          channel.send(`Ai ${balance} :money_with_wings: de mei, ${member}, ai primit gradul de @milog scrie $ajutor pentru a vedea comenzile de joc. `);
          var role = guild.roles.cache.find(role => role.id === '750604776726593617');
          member.roles.add(role);

});
client.on("guildMembersChunk", function(members, guild){
  const channel = member.guild.channels.cache.find(ch => ch.name === 'adminat');
  channel.send( `Au intrat mai multi useri de pe acelas server.`);


});
client.login(settings.token)
