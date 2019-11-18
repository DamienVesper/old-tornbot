const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {  
  const { tornUsers } = await require(`../api/getUsers.js`);

  let tornUser = args[0];
	let tornUserObj = tornUsers[tornUser];
  if(!tornUserObj) return message.channel.send(`${message.author} That user is either not ranked yet or doesn't exist!`);

  let sEmbed = new Discord.RichEmbed()
    .setTitle(`Player Info | ${tornUser}`)
    .addField(`\u200B`, `
**Placement**: ${tornUserObj.position}
**Side**: ${tornUserObj.team}
**Rank**: ${tornUserObj.rank}
**Tech**: ${tornUserObj.tech}
`, true)
    .addField(`\u200B`, `
**Experience**: ${tornUserObj.xp}
**Kills**: ${tornUserObj.kills}
**Money**: ${tornUserObj.liquidValue}
**Account Type**: ${tornUserObj.accountType}
`, true)
.setTimestamp(new Date())
.setFooter(config.footer);
message.channel.send(sEmbed);
}

module.exports.config = {
  name: `search`
}