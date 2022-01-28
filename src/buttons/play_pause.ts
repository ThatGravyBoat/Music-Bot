import config from '../config.json' assert { type: 'json' };
import type { Button } from '../types.js';

const { djRole } = config.guildInfo;

export default {
	id: 'play_pause',
	execute(button) {
		const isDJ = button.member.roles.cache.has(djRole) || button.member.permissions.has('MANAGE_GUILD');
		if (!isDJ) return button.reply({ content: 'You must be a DJ to play/pause.', ephemeral: true });

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
