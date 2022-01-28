import config from '../config.json' assert { type: 'json' };
import type { Button } from '../index.js';

const { djRole } = config.guildInfo;

export default {
	id: 'play_pause',
	execute(button) {
		const queue = button.client.player.getQueue(button.guild);
		if (queue) {
			if (button.member.roles.cache.has(djRole) && queue.current) {
				queue.setPaused(queue.connection.paused);
			}
			button.reply({
				content: !queue.connection.paused && queue.current ? 'Player resumed.' : 'Player Paused.',
				ephemeral: true
			});
		}
	}
} as Button;
