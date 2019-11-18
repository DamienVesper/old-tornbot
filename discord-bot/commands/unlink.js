const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
const tornUsers = require(`../api/getUsers.js`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  store.read(`users/${message.author.id}`).then(tornUser => {
    store.read(`users/${message.author.id}`).then(data => {
      if(!data) return message.channel.send(`${message.author} You are not registered!`);

      store.delete(`users/${message.author.id}`);
      store.delete(`authorizedUsers/${tornUser}`);

      message.channel.send(`Edited userdata for **${message.author.username}#${message.author.discriminator}**.`);
    });
  });
}

module.exports.config = {
  name: `unlink`
}