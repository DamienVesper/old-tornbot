const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => { 
  const { tornUsers } = await require(`../api/getUsers.js`);

  let tornUser = args[0];
  if(!tornUsers[tornUser]) return message.channel.send(`That user either doesn't exist or isn't ranked yet!`);
  
  store.read(`users/${message.author.id}`).then(data => {
    if(data) return message.channel.send(`${message.author} You are already registered!`);
    store.read(`authorizedUsers/${tornUser}`).then(xData => {
      if(xData) return message.channel.send(`${message.author} That account is already registered!`);

      store.write(`users/${message.author.id}`, tornUser);
      store.write(`authorizedUsers/${tornUser}`, message.author.id);

      message.channel.send(`Edited userdata for **${message.author.username}#${message.author.discriminator}**.`);
    });
  });
}

module.exports.config = {
  name: `link`
}