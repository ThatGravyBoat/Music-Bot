import { MessageEmbed } from 'discord.js';
import type { Button } from '../index.js';

export default {
	id: 'previous_songs',
	execute(button) {
		const queue = button.client.player.getQueue(button.guild);
		const embed = new MessageEmbed();
		embed.setAuthor({ name: 'Last 5 Previous Songs' });
		if (queue && queue.previousTracks && queue.previousTracks.length > 0) {
			embed.addField(
				'Songs',
				queue.previousTracks
					.slice(-5)
					.map((v) => v.title)
					.join('\n')
			);
		} else {
			embed.addField('Songs', 'No previous songs.');
		}
		button.reply({ embeds: [embed], ephemeral: true });
	}
} as Button;
