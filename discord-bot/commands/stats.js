const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const tornUsers = require(`../api/getUsers.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(`${config.jsonstoreToken}/users`);

module.exports.run = async(client, message, args) => {  
  const { tornUsers } = await require(`../api/getUsers.js`);

  var discUser;
  if(args[0]) {
    discUser = message.mentions.members.first();
    if(!discUser) {
      discUser = args[0];
      if(isNaN(parseInt(discUser))) return message.channel.send(`That is an invalid user ID!`);
    }
    else if(!discUser) return message.channel.send(`Please mention a valid member of this server!`);
    else discUser = discUser.user.id;
  }
  else discUser = message.author.id;

  store.read(discUser).then(data => {
    if(!data) return message.channel.send(`${message.author} That user does not have an account!`);
    let tornUserObj = tornUsers[data];
    if(!tornUserObj) return message.channel.send(`${message.author} That user is either not ranked yet or doesn't exist!`);

    let sEmbed = new Discord.RichEmbed()
    .setTitle(`Player Info | ${data}`)
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
  });
}

module.exports.config = {
  name: `stats`
}