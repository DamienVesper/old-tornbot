const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
const wepStats = require(`../databases/weapons.json`)

module.exports.run = async(client, message, args) => {
	let weaponName = args[0];
	if(!weaponName) return message.channel.send(`${message.author} Please specify a weapon to search for!`);
	let weaponObj = wepStats[parseInt(weaponName)];
	if(!weaponObj) return message.channel.send(`${message.author} That weapon does not exist!`);
	
	let sEmbed = new Discord.RichEmbed()
		.setTitle(weaponObj.name)
		.setColor(`#f4d35e`)
    .addField(`\u200B`, `
**Price**: ${weaponObj.price}
**Damage**: ${weaponObj.damage}
**Ammo**: ${weaponObj.ammo}\n` + 
// **Energy**: ${weaponObj.energy}
`**Range**: ${weaponObj.range}
`, true)
    .addField(`\u200B`, `
**Speed**: ${weaponObj.speed}
**Charge**: ${weaponObj.charge}
**Rank**: ${weaponObj.level}
**Type**: ${weaponObj.type}
`, true)
		.setFooter(config.footer);

	message.channel.send(sEmbed);
}

module.exports.config = {
  name: `weapon`
}