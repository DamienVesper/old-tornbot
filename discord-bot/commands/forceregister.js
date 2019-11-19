const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  const { tornUsers } = await require(`../getTornUsers.js`);
	if(message.author.id != config.developerID) return message.channel.send(`${message.author} You can't use that!`);
	
  message.channel.send(`Forcing registration of ${message.guild.memberCount} users...`);
	message.guild.members.forEach(member => {
		let tornUser = member.displayName.toLowerCase();
		let tornUserObj = tornUsers[tornUser];
		if(!tornUserObj) return console.log(`${member.user.id} is either not ranked yet or doesn't exist!`);

		store.read(`users/${member.user.id}`).then(data => {
			if(data) return console.log(`${member.user.id} is already registered.`);

			store.read(`https://www.jsonstore.io/${config.jsonstoreToken}/authorizedUsers/${tornUser}`).then(xData => {
				if(xData) return console.log(`${member.user.id} failed to register to an account as it was in use.`);
				
				store.write(`users/${member.user.id}`, tornUser);
				console.log(`Succesfully registered user \`${member.user.id}\` to account \`${tornUser}\`.`);

					store.write(`authorizedUsers/${tornUser}`, member.user.id);
			});
		});
	});
}

module.exports.config = {
  name: `forceregister`
}