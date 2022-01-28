import { REST } from '@discordjs/rest';
import { APIApplicationCommand, Routes } from 'discord-api-types/v9';
import { Client, Intents, NewsChannel, TextChannel } from 'discord.js';
import config from '../config.json' assert { type: 'json' };

const { token, applicationId } = config.botInfo;
const { guild, musicPlayerMessage, musicPlayerChannel } = config.guildInfo;

if (!guild || !musicPlayerChannel || !token || !applicationId) {
	console.log(
		"You're missing config options please setup those. You can ignore 'musicPlayerMessage' for now as we create that during this."
	);
	process.exit(1);
}

const rest = new REST({ version: '9' }).setToken(token);

try {
	console.log('Starting to add commands...');

	const response = (await rest.put(Routes.applicationGuildCommands(applicationId, guild), {
		body: (await import('./commands.js')).default
	})) as APIApplicationCommand[];

	const commandIds: Record<string, string> = {};
	response.forEach((value) => (commandIds[value.name] = value.id));

	console.log('Commands added!');

	console.log('Starting to add command permissions...');

	await rest.put(Routes.guildApplicationCommandsPermissions(applicationId, guild), {
		body: (await import('./permissions.js')).default.get(commandIds)
	});

	console.log('Command permissions added! You can now start the bot.');
} catch (error) {
	console.error(error);
}

const client = new Client({ intents: [Intents.FLAGS.GUILDS], allowedMentions: { roles: [] } });

client.once('ready', (client) => {
	if (musicPlayerMessage.length) return client.destroy();
	client.channels.fetch(musicPlayerChannel).then((channel) => {
		if (!(channel instanceof TextChannel) && !(channel instanceof NewsChannel))
			throw new Error('musicPlayerChannel must be a text channel');
		channel
			.send(
				'This message is for the music player when its started. Dont delete this, when you start the bot this will change to the player message with the buttons.'
			)
			.then(() => {
				console.log(
					'The message for you to copy the id from has been created in the music player channel you put in the config.'
				);
				client.destroy();
			});
	});
});

client.login(token);
