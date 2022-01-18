const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token, applicationId } = require('../config.json').botInfo;
const { guild, musicPlayerMessage, musicPlayerChannel } = require('../config.json').guildInfo;
const { Client, Intents} = require('discord.js');

if (!guild || !musicPlayerChannel || !token || !applicationId) {
    console.log("You're missing config options please setup those. You can ignore 'musicPlayerMessage' for now as we create that during this.");
    process.exit(1);
}

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
    try {
        console.log('Starting to add commands...');

        const response = await rest.put(
            Routes.applicationGuildCommands(applicationId, guild),
            { body: require("../generator/commands") },
        );

        const commandIds = {};
        response.forEach(value => commandIds[value.name] = value.id);

        console.log('Commands added!');

        console.log('Starting to add command permissions...');

        await rest.put(
            Routes.guildApplicationCommandsPermissions(applicationId, guild),
            { body: require("../generator/permissions").get(commandIds) }
        );

        console.log('Command permissions added! You can now start the bot.');

    } catch (error) {
        console.error(error);
    }
})();

const client = new Client({ intents: [Intents.FLAGS.GUILDS], allowedMentions: { roles: [] } });

client.once('ready', client => {
    if (musicPlayerMessage.length) return client.destroy();
    client.channels.fetch(musicPlayerChannel).then(channel => {
        channel.send("This message is for the music player when its started. Dont delete this, when you start the bot this will change to the player message with the buttons.").then(() => {
            console.log("The message for you to copy the id from has been created in the music player channel you put in the config.");
            client.destroy();
        });
    });
});


client.login(token);

