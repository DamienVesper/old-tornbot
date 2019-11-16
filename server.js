const DiscordBot = require(`./discord-bot/index.js`);

const fs = require(`fs`);
const express = require(`express`);
const app = express();
require(`dotenv`).config();

app.get(`/`, (req, res) => {
    fs.readFile(`./views/index.html`, `utf-8`, (err, data) => {
        if(err) console.log(err);
        res.send(data);
    }); 
});

app.get(`/commands`, (req, res) => {
    fs.readFile(`./views/commands.html`, `utf-8`, (err, data) => {
        if(err) console.log(err);
        res.send(data);
    });
});

app.get(`/leaderboard`, (req, res) => res.send(`<script> window.location.href = "https://torn.space/leaderboard/"; </script>`));

app.listen(process.env.NODE_SERVER_PORT, () => console.log(`Server is running on point ${process.env.NODE_SERVER_PORT}.`));