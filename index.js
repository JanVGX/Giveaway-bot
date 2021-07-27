const { Client } = require("discord.js");

const keepAlive = require('./server.js');

 

const client = new Client({

  disableEveryone: true

});

 

keepAlive();

client.login(process.env.TOKEN);

const fs = require('fs');

const Discord = require('discord.js');

const config = require('./config.json');

client.config = config;

// Init discord giveaways

const { GiveawaysManager } = require('discord-giveaways');

client.giveawaysManager = new GiveawaysManager(client, {

    storage: "./giveaways.json",

    updateCountdownEvery: 5000,

    default: {

        botsCanWin: false,

        embedColor: "#FF0000",

        reaction: "🎉"

    }

});

// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {

    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);

});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {

    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);

});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {

    console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);

});

/* Load all events */

fs.readdir("./events/", (_err, files) => {

    files.forEach((file) => {

        if (!file.endsWith(".js")) return;

        const event = require(`./events/${file}`);

        let eventName = file.split(".")[0];

        console.log(`👌 Event loaded: ${eventName}`);

        client.on(eventName, event.bind(null, client));

        

    });

});

client.commands = new Discord.Collection();

/* Load all commands */

fs.readdir("./commands/", (_err, files) => {

    files.forEach((file) => {

        if (!file.endsWith(".js")) return;

        let props = require(`./commands/${file}`);

        let commandName = file.split(".")[0];

        client.commands.set(commandName, props);

        console.log(`👌 Command loaded: ${commandName}`);

    });

});

// Login

client.login(config.token);
