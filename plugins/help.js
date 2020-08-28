const Discord = require('discord.js');
// const eco = require("discord-economy");
var settings = require("../config.json");

// inside a command, event listener, etc.
const help = new Discord.MessageEmbed()
	.setTitle('Salut saracie, uite comenzile')
	// .setURL('https://discord.js.org/')
	// .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Te premiez pentru activitate, ai sansa 1/10 ca mesajul tau sa fie premiat cu urmatoarele:  🥇- 10 🥈 - 5 🥉 - 1 \nBanii sunt ochiul dracului! \n\n')
	// .setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addFields(
		{ name: '$portofel', value: 'Vezi cati mei ai.' },
		{ name: '$experienta', value: 'Vezi ce experienta ai.' },
		{ name: '$top', value: 'Cine e numaru unu?' },
		{ name: '$magazin', value: 'Vezi ce e de vanzare.' },
		{ name: '$cumpara', value: 'Cumpara <lucru>' },
		{ name: '$inventar', value: 'Vezi ce ai pe tine.' },
		{ name: '$transfer', value: 'Transfera mei. $transfer <user> <valoare>' },
		// { name: '$spaga', value: 'Ia-ti spaga, o data pe zi.' },
		// { name: '$munca', value: 'Du-te la munca, saracule!' },
		// { name: '$ban', value: 'Da cu banu, cap sau pajura!' },
		{ name: '$barbut', value: 'Joaca un barbut cu baietii.' },
		{ name: '$pacanele', value: 'Baga un ban la pacanea ca baietii.' },
		{ name: '$foloseste', value: 'Foloseste un obiect. <obiect> <user> sau <obiect> <obiect>' }


	)
	const adminHelp = new Discord.MessageEmbed()
	.setTitle('Si comenzile de bastan')
	// .setURL('https://discord.js.org/')
	// .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Credinta in Dumnezeu e cea mai mare valoare pentru un roman, dupa bani desigur, he he! Aicia totu merge pe mei, melu, e moneda nationala a Romuiei, sau cel putin cam atat valoreaza')
	// .setThumbnail('https://i.imgur.com/wSTFkRM.png')
		.addFields(
			{ name: '$addbalance', value: 'Adauga la fraier in portofel' },
			{ name: '$taxeaza', value: 'Taxeaza fraierul' },
			{ name: '$say', value: 'Spune' },
			{ name: '$clear', value: 'Sterge mesaje' },
			{ name: '$reload', value: 'Incarca comanda' },




		)

module.exports = {
	name: 'ajutor',
	description: 'Ajutor',
async	execute(message, args){
    if (settings.admin == message.author.id) { message.reply(help); message.reply(adminHelp); }
		else {message.reply(help);}

	}
};
