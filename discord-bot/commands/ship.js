const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
const shipDatabase = require(`../databases/ships.json`);

module.exports.run = async(client, message, args) => {
	let shipRank = args[0];
	if(!shipRank) return message.channel.send(`${message.author} Please identify the ship by its respective rank!`);
	let shipInfo = shipDatabase[parseInt(shipRank)];
	if(!shipInfo) return message.channel.send(`${message.author} That ship doesn't exist!`);

	let sEmbed = new Discord.RichEmbed()
		.setColor(`#f4d35e`)
		.setTitle(`Rank ${shipRank}`)
		// .setDescription(`The rank ${shipRank} ship in Torn.Space.`)
		.addField(`\u200B`, `
**Health**: ${shipInfo.health}
**Thrust**: ${shipInfo.thrust}
**Agility**: ${shipInfo.agility}
`, true)
		.addField(`\u200B`, `
**Cargo**: ${shipInfo.capacity}
**Price**: ${shipInfo.price}
**Weapons**: ${shipInfo.weapons}
`, true)
		.setFooter(config.footer);
		
	message.channel.send(sEmbed);
}

module.exports.config = {
  name: `ship`
}