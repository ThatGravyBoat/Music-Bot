import config from '../config.json' assert { type: 'json' };
import type { Button } from '../index.js';
import playerMessage from '../utils/playerMessage.js';

const { djRole } = config.guildInfo;

export default {
	id: 'stop',
	execute(button) {
		const queue = button.client.player.getQueue(button.guild);
		if (queue) {
			if (button.member.roles.cache.has(djRole)) {
				queue.stop();
				setTimeout(() => playerMessage(button.client), 2500);
				return button.reply({ content: 'Player stopped!', ephemeral: true });
			}
			button.reply({ content: 'You do not have DJ in this guild!', ephemeral: true });
		}
	}
} as Button;
