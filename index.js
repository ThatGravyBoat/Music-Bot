const fs = require('fs');
const { Client, Collection, Intents} = require('discord.js');
const { Player } = require('discord-player');
const { botInfo } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES], allowedMentions: { roles: [] } });

client.player = new Player(client);
client.currentVoteAmount = 0;
client.commands = new Collection();
client.buttons = new Collection();

for (const file of fs.readdirSync('./events').filter(file => file.endsWith('.js'))) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        if (event.music){
            client.player.on(event.name, (...args) => event.execute(...args, client));
        }else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}

for (const file of fs.readdirSync('./commands').filter(file => file.endsWith('.js'))) {
    const command = require(`./commands/${file}`);
    if (command.id) {
        client.commands.set(command.id, command);
    }
}

for (const file of fs.readdirSync('./buttons').filter(file => file.endsWith('.js'))) {
    const button = require(`./buttons/${file}`);
    if (button.id) {
        client.buttons.set(button.id, button);
    }
}

client.login(botInfo.token);

process.on('uncaughtException', function (err) {
    if (err.name === "Error" && err.message.startsWith("Did not enter state ready within")) return;
    console.error(err.stack)
});