const Discord = require(`discord.js`);
const { config, client } = require(`../index.js`);
const bus = require(`../messageBus.js`);

bus.on(`guildMemberAdd`, member => {
	member.guild.channels.find(t => t.name == `welcome`).send({
		"embed": {
			"title": `Welcome!`,
			"color": 14973996,
			"description": `Welcome to the server, **${member.user.username}**! :tada: \nDo \`!register [tornusername]\` to register your [Torn.Space](https://torn.space) account.`,
			"timestamp": new Date(),
			"footer": {
				"icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
				"text": `${config.footer}`
			}
		}
	});
});
