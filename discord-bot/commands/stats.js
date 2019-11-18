const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const tornUsers = require(`../api/getUsers.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {  
  return;
}

module.exports.config = {
  name: `stats`
}