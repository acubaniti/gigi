/*
If you want to make discord-economy guild based you have to use message.author.id + message.guild.id as ID for example:
eco.Daily(message.author.id + message.guild.id)

This will create a unique ID for each guild member
*/


//Requiring Packages
const fs = require('fs');
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
// const eco = require("discord-economy");
const eco = require('./index.js');

//Create the bot client
const client = new Discord.Client();
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

Reflect.defineProperty(currency, 'getBalance', {
    /* eslint-disable-next-line func-name-matching */
    value: function getBalance(id) {
        const user = currency.get(id);
        return user ? user.balance : 0;
    },
});

// var Permissions = {};
// try{
// 	Permissions = require("./permissions.json");
// } catch(e){§
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
    //If the message does not start with your prefix return.
    //If the user that types a message is a bot account return.
    if (!message.content.startsWith(settings.prefix) || message.author.bot) return;
    if (message.author == client.user) {
        return true; //returning true to prevent feedback from commands
    }

    currency.add(message.author.id, 1);

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

    if (message.author != client.user && message.author.id != 723002601066594376 && Math.floor(Math.random() * 3) == dropRate && !message.content.startsWith(settings.prefix)) {
        randomDrop();
    }




    if (command === 'shop') {
        // [gamma]
        const items = await CurrencyShop.findAll();
        return message.channel.send(items.map(item => `${item.name}: ${item.cost}💰`).join('\n'), {
            code: true
        });

    }
    if (command === 'leaderboard') {
        // [gamma]
        return message.channel.send(
            currency.sort((a, b) => b.balance - a.balance)
            .filter(user => client.users.cache.has(user.user_id))
            .first(10)
            .map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance}💰`)
            .join('\n'), {
                code: true
            }
        );

    }

    if (command === 'balance') {
        // [gamma]
        const target = message.mentions.users.first() || message.author;
        return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);

    }
    if (command === 'western') {
        // [gamma]
        const currentAmount = currency.getBalance(message.author.id);
        const transferAmount = commandArgs.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
        const transferTarget = message.mentions.users.first();

        if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
        if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
        if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);

        currency.add(message.author.id, -transferAmount);
        F
        currency.add(transferTarget.id, transferAmount);

        return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`);
    }
    if (command === 'inventory') {
        // [gamma]
        const target = message.mentions.users.first() || message.author;
        const user = await Users.findOne({
            where: {
                user_id: target.id
            }
        });
        const items = await user.getItems();

        if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
        return message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
    }

    if (command === 'buy') {
        // [gamma]
        const item = await CurrencyShop.findOne({
            where: {
                name: {
                    [Op.like]: args
                }
            }
        });
        if (!item) return message.channel.send(`That item doesn't exist.`);
        if (item.cost > currency.getBalance(message.author.id)) {
            return message.channel.send(`You currently have ${currency.getBalance(message.author.id)}, but the ${item.name} costs ${item.cost}!`);
        }

        const user = await Users.findOne({
            where: {
                user_id: message.author.id
            }
        });
        currency.add(message.author.id, -item.cost);
        await user.addItem(item);

        message.channel.send(`You've bought: ${item.name}.`);

    }




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
