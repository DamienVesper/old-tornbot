/* Network-Installed Dependencies */
const Discord = require(`discord.js`);
const jsonstore = require(`jsonstore.io`);
const fs = require(`fs`);

/* Local Dependencies */
const bus = require(`./messageBus.js`);
require(`dotenv`).config();

/* Client Config */
let client = new Discord.Client({ disableEveryone: true });
var config = {
    developer: `DamienVesper`,
    developerTag: `#4927`,
    developerID: `386940319666667521`,
    prefix: `.`,
    token: process.env.DBL_SELFBOT,
    jsonstoreToken: process.env.JSONSTORE_TOKEN,
    version: `0.2.1`,
    footer: `© Torn.Space 2019 | Failed to load version.`
}
module.exports = { config };
config.footer = `© Torn.Space 2019 | v${config.version}.`

/* Client Events */
client.on(`ready`, async () => {
    console.log(`${client.user.username}#${client.user.discriminator} has started, with ${client.users.size} users in ${client.guilds.size} servers.`);
    client.user.setActivity(`Torn.Space`);
    refreshActivity();
});

/* Other Client Events */
let memberJoin = require(`./clientEvents/guildMemberAdd.js`);
let memberLeave = require(`./clientEvents/guildMemberRemove.js`);

/* Client Commands */
client.commands = new Discord.Collection();
fs.readdir(`./discord-bot/commands/`, (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(`.`).pop() == `js`);
    if(jsfiles.length <= 0) {
        console.log(`No commands to load!`);
        return;
    }

    /* Load Commands */
    console.log(`Loading ${jsfiles.length} command(s)!`);
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        client.commands.set(props.config.name, props);
    });
});

/* Client Checks */
function refreshActivity() {
    let botGame = `Torn.Space`;
    let memberCount = client.users.size;
    client.user.setPresence({
        game: { 
            name: `${memberCount} users on ${botGame}.`,
            type: `WATCHING`
        },
        status: `dnd`
    });
}

//Refresh Activity on Member Event
client.on(`guildMemberAdd`, async () => refreshActivity());
client.on(`guildMemberRemove`, async () => refreshActivity());

//Send Message on Member Event
client.on(`guildMemberAdd`, member => bus.emit(`guildMemberAdd`, member));
client.on(`guildMemberRemove`, member => bus.emit(`guildMemberRemove`, member));

client.on(`message`, async message => {
    /* Botception & Message Handling */
    if(message.guild.id == `247490958374076416` && message.channel.name != `bots`) return;
    if(message.author.bot || message.channel.type == `dm`) return;
    if(message.content.slice(0, config.prefix.length) != config.prefix) return;

    /* Get Commands & Arguments */
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command == `s`) return client.commands.get(`stats`).run(client, message, args);

    let cmd = client.commands.get(command);
    if(cmd) return cmd.run(client, message, args);
});

client.login(config.token);