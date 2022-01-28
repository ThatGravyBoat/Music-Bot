import type { Queue } from 'discord-player';
import type { Client } from 'discord.js';
import type { Event } from '../index.js';
import playerMessage from '../utils/playerMessage.js';

export default {
	name: 'queueEnd',
	music: true,
	execute(queue: Queue, client: Client) {
		playerMessage(client);
	}
} as Event;
