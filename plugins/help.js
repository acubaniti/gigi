const Discord = require('discord.js');
// const eco = require("discord-economy");
var settings = require("../config.json");

// inside a command, event listener, etc.
const help = new Discord.MessageEmbed()
	.setTitle('Salut saracie, uite comenzile')
	// .setURL('https://discord.js.org/')
	// .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Te premiez pentru activitate, ai sansa 1/3 ca mesajul tau sa fie premiat cu urmatoarele:  🥇- 25 🥈 - 15 🥉 - 5 \nBanii sunt ochiul dracului! \n\n')
	// .setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addFields(
		{ name: '$portofel', value: 'Vezi cati mei ai.' },
		{ name: '$top', value: 'Cine e numaru unu?' },
		{ name: '$transfer', value: 'Ca de la matusa tamara, fara urme si complet legal.' },
		{ name: '$spaga', value: 'Ia-ti spaga, o data pe zi.' },
		{ name: '$munca', value: 'Du-te la munca, saracule!' },
		// { name: '$ban', value: 'Da cu banu, cap sau pajura!' },
		{ name: '$barbut', value: 'Joaca un barbut cu baietii.' },
		{ name: '$pacanele', value: 'Baga un ban la pacanea ca baietii.' }

	)
	const adminHelp = new Discord.MessageEmbed()
	.setTitle('Si comenzile de bastan')
	// .setURL('https://discord.js.org/')
	// .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Credinta in Dumnezeu e cea mai mare valoare pentru un roman, dupa bani desigur, he he! Aicia totu merge pe mei, melu, e moneda nationala a Romuiei, sau cel putin cam atat valoreaza')
	// .setThumbnail('https://i.imgur.com/wSTFkRM.png')
		.addFields(
			{ name: '$setbalance', value: 'Defineste poftofelul la fraier.' },
			{ name: '$addbalance', value: 'Adauga la fraier in portofel' },
			{ name: '$tax', value: 'Taxeaza fraierul' },
			{ name: '$delete', value: 'Sterge-i portofelul la fraier' },
			{ name: '$spagareset', value: 'reseteaza spaga' }



		)
		const testHelp = new Discord.MessageEmbed()
		.setTitle('comenzile de test')
		// .setURL('https://discord.js.org/')
		// .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
		// .setDescription('Credinta in Dumnezeu e cea mai mare valoare pentru un roman, dupa bani desigur, he he! Aicia totu merge pe mei, melu, e moneda nationala a Romuiei, sau cel putin cam atat valoreaza')
		// .setThumbnail('https://i.imgur.com/wSTFkRM.png')
			.addFields(
				{ name: '$inventory', value: 'test' },
				{ name: '$balance', value: 'test' },
				{ name: '$western', value: 'test' },
				{ name: '$buy', value: 'test' },
				{ name: '$leaderboard', value: 'test' },
				{ name: '$shop', value: 'test' }



			)
module.exports = {
	name: 'ajutor',
	description: 'Ajutor',
async	execute(message, args){
    if (settings.admin == message.author.id) { message.reply(help); message.reply(adminHelp); message.reply(testHelp); }
		else {message.reply(help);}

	}
};
