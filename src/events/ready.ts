import type { Client } from 'discord.js';
import { ActivityTypes } from 'discord.js/typings/enums';
import type { Event } from '../index.js';
import playerMessage from '../utils/playerMessage.js';

export default {
	name: 'ready',
	once: true,
	execute(client: Client) {
		playerMessage(client);

		client.user!.setActivity({
			type: ActivityTypes.LISTENING,
			name: 'your music'
		});
	}
} as Event;
