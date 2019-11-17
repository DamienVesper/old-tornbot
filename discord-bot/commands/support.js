const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);

module.exports.run = async(client, message, args) => {  
  return message.channel.send(`${message.author} Support is currently unavailable.`);
}

module.exports.config = {
  name: `support`
}