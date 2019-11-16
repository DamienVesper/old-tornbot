const Discord = require(`discord.js`);
const { config, client } = require(`../index.js`);
const bus = require(`../messageBus.js`);

bus.on(`guildMemberRemove`, member => {
	member.guild.channels.find(t => t.name == `welcome`).send({
		"embed": {
			"title": `Leave...`,
			"color": 14973996,
			"description": `**${member.user.username}** rage quit Torn.Space.`,
			"timestamp": new Date(),
			"footer": {
				"icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
				"text": `${config.footer}`
			}
		}
	});
});