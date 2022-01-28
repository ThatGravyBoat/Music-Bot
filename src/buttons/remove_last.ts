import type { Button } from '../index.js';
import playerMessage from '../utils/playerMessage.js';

export default {
	id: 'remove_last',
	execute(button) {
		const queue = button.client.player.getQueue(button.guild);
		if (!queue) button.reply({ content: 'There are no songs in queue.', ephemeral: true });

		const lastTrack = queue.tracks.reverse().find((track) => track.requestedBy.id === button.member.id);

		if (!lastTrack) {
			if (queue.current && queue.current.requestedBy.id === button.member.id) {
				queue.skip();
				return button.reply({ content: 'Song removed!', ephemeral: true });
			}
			return button.reply({ content: "You don't have any songs in queue.", ephemeral: true });
		}

		queue.remove(lastTrack);
		button.reply({ content: 'Song removed!', ephemeral: true });
		playerMessage(button.client);
	}
} as Button;
