const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);

module.exports.run = async(client, message, args) => {  
  let sEmbed = new Discord.RichEmbed()
    .setTitle(`Bot Help`)
    .addField(`\u200B`, `
**${config.prefix}ship [rank]**: Get ship stats.
**${config.prefix}weapon [name]**: Get weapon stats.
**${config.prefix}wiki**: Visit the Torn.Space wiki!.
**${config.prefix}support**: Join our support server!
`, true)
    .addField(`\u200B`, `
**${config.prefix}link [username]**: Register.
**${config.prefix}unlink**: Deregister.
**${config.prefix}search [user]**: Search leaderboard.
**${config.prefix}stats (user)**: Get a user's stats.
**${config.prefix}balance (user)**: View a user's balance.
`, true)
    .setTimestamp(new Date())
    .setFooter(config.footer);
  
  message.channel.send(sEmbed);
}

module.exports.config = {
  name: `help`
}