import { Player, PlayerEvents } from 'discord-player';
import { Client, ClientEvents, Collection, Intents } from 'discord.js';
import { readdir } from 'fs/promises';
import 'source-map-support/register.js';
import config from './config.json' assert { type: 'json' };
import { Button, Command, Event } from './types';

const { botInfo } = config;

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
	allowedMentions: { roles: [] }
});
client.player = new Player(client);
client.currentVoteAmount = 0;
client.commands = new Collection();
client.buttons = new Collection();

for await (const file of (await readdir('./dist/events')).filter((file) => file.endsWith('.js'))) {
	const event: Event = (await import(`./events/${file}`)).default;
	if (event.once) {
		client.once(event.name as keyof ClientEvents, (...args) => event.execute(...args, client));
	} else {
		if (event.music) {
			client.player.on(event.name as keyof PlayerEvents, (...args: any[]) => event.execute(...args, client));
		} else {
			client.on(event.name as keyof ClientEvents, (...args) => event.execute(...args, client));
		}
	}
}

for await (const file of (await readdir('./dist/commands')).filter((file) => file.endsWith('.js'))) {
	const command: Command = (await import(`./commands/${file}`)).default;
	if (command.id) {
		client.commands.set(command.id, command);
	}
}

for await (const file of (await readdir('./dist/buttons')).filter((file) => file.endsWith('.js'))) {
	const button: Button = (await import(`./buttons/${file}`)).default;
	if (button.id) {
		client.buttons.set(button.id, button);
	}
}

client.login(botInfo.token);

process.on('uncaughtException', function (err) {
	if (err.name === 'Error' && err.message.startsWith('Did not enter state ready within')) return;
	console.error(err.stack);
});

process.on('warning', (warning) => {
	if (
		warning.name !== 'ExperimentalWarning' &&
		warning.message !== 'Importing JSON modules is an experimental feature. This feature could change at any time'
	) {
		console.warn(warning);
	}
});
