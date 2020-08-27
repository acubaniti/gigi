module.exports = {
	name: 'say',
	// description: 'Ping!',
async	execute(message, args) {
		// message.channel.send('Pong.');
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("N-ai voie!");
    let botmessage = args.join(" ");
    await message.delete().catch();
    message.channel.send(botmessage);
	}
};
