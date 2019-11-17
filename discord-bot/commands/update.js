const Discord = require(`discord.js`);
const { tornUsers } = require(`../api/getUsers.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  if(message.author.id != config.developerID) return message.channel.send(`${message.author} Command not available!`);


  
		axios.get(`https://www.jsonstore.io/${config.jsonstoreToken}/users/${message.author.id}`).then(res => {
			if(!res.data[`result`]) return message.channel.send(`${message.author} The requested user is not registered!`);
			requestedUser = res.data[`result`][`tornUsername`];		
		}).catch(err => {
			console.log(err);
		}); 

  
  setTimeout(() => {
      let tornUserObj = tornUsers[requestedUser];
      if(!tornUserObj) return message.channel.send(`${message.author} That account either does not exist or is not ranked yet!`);

      let placementRoles = [`453678967996678145`, `453678938275708960`, `453678890628546560`, `453678855534804992`, `453612904365948929`, `453620521632923660`, `453620581041045555`, `453620631116709888`, `453620675526000674`, `453620720581214208`];
      let teamRoles = [`513781861542002690`, `524288679473184806`, `633664409528565798`];
      let accountRoles = [`Registered`, `Janitor`, `Moderator`, `Owner`];

      //Remove current roles (except for non-account related roles)
      message.member.roles.forEach(role => {
        if(placementRoles.includes(role.id) || teamRoles.includes(role.id) || accountRoles.includes(role.id)) message.member.roles.removeRole(role.id);
      });

      //Add placement roles
      if(tornUserObj.placement <= 5) message.member.roles.addRole(placementRoles[0]);
      else if(tornUserObj.placement <= 10) message.member.roles.addRole(placementRoles[1]);
      else if(tornUserObj.placement <= 25) message.member.roles.addRole(placementRoles[2]);
      else if(tornUserObj.placement <= 50) message.member.roles.addRole(placementRoles[3]);
      else if(tornUserObj.placement <= 75) message.member.roles.addRole(placementRoles[4]);
      else if(tornUserObj.placement <= 100) message.member.roles.addRole(placementRoles[5]);
      else if(tornUserObj.placement <= 250) message.member.roles.addRole(placementRoles[6]);
      else if(tornUserObj.placement <= 500) message.member.roles.addRole(placementRoles[7]);
      else if(tornUserObj.placement <= 750) message.member.roles.addRole(placementRoles[8]);
      else if(tornUserObj.placement <= 1000) message.member.roles.addRole(placementRoles[9]);
      else return message.channel.send(`${message.author} You are not ranked!`);

      //Add team roles (enable access to team-specific channels).
      if(tornUserObj.team == `Human`) message.member.roles.addRole(teamRoles[0]);
      else if(tornUserObj.team == `Alien`) message.member.roles.addRole(teamRoles[1]);
      else if(tornUserObj.team == `Green`) message.member.roles.addRole(teamRoles[2]);
      else return message.channel.send(`${message.author} Could not determine which team you are on!`);

      //Add account roles (change account permission int. based on account status).
      /* if(tornUserObj.accountType == `Player`) message.member.roles.addRole(accountRoles[0]);
      else if(tornUserObj.accountType == `Janitor`) message.member.roles.addRole(accountRoles[1]);
      else if(tornUserObj.accountType == `Moderator`) message.member.roles.addRole(accountRoles[2]);
      else if(tornUserObj.accountType == `Owner`) message.member.roles.addRole(accountRoles[3]);
      else return message.channel.send(`${message.author} Could not determine the type of account you have!`); */

      message.channel.send(`Updated roles for \`${message.author.id}\`.`)
  }, 500);
}

module.exports.config = {
  name: `update`
}