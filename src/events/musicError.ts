import type { Queue } from 'discord-player';
import type { Client } from 'discord.js';
import type { Event } from '../index.js';
import playerMessage from '../utils/playerMessage.js';

export default {
	name: 'error',
	music: true,
	execute(queue: Queue, error: Error, client: Client) {
		if (error.name !== 'VideoUnavailable') {
			console.error(`Error: ${error}`);
		}
		playerMessage(client);
	}
} as Event;
