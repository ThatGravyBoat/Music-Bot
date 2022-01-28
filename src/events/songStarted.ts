import type { Queue, Track } from 'discord-player';
import type { Client } from 'discord.js';
import type { Event } from '../types.js';
import playerMessage from '../utils/playerMessage.js';

export default {
	name: 'trackStart',
	music: true,
	execute(queue: Queue, track: Track, client: Client) {
		client.currentVoteAmount = 0;
		playerMessage(client);
	}
} as Event;
