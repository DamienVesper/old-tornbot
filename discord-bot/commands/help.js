const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);

module.exports.run = async(client, message, args) => {  
  let sEmbed = new Discord.RichEmbed()
    .setTitle(`Bot Help`)
    .addField(`\u200B`, `
**${config.prefix}register [username]**: Register.
**${config.prefix}deregister**: Deregister.
**${config.prefix}weapon [name]**: Get weapon stats.
**${config.prefix}ship [rank]**: Get ship stats.
`, true)
    .addField(`\u200B`, `
**${config.prefix}balance (user)**: View a user's balance.
**${config.prefix}stats (user)**: Get a user's stats.
**${config.prefix}invite**: Invite the bot!
**${config.prefix}support**: Join our support server!
`, true)
    .setTimestamp(new Date())
    .setFooter(config.footer);
  
  message.channel.send(sEmbed);
}

module.exports.config = {
  name: `help`
}