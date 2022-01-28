import config from '../config.json' assert { type: 'json' };
import type { Command } from '../types.js';
import playerMessage from '../utils/playerMessage.js';
const { djRole } = config.guildInfo;

export default {
	id: 'remove',
	execute(command) {
		if (!command.member.roles.cache.has(djRole)) {
			command.reply({ content: `You are not a DJ in this guild.` });
			return;
		}
		const queue = command.client.player.getQueue(command.guild);
		if (!queue || queue.tracks.length === 0) return command.reply({ content: 'Queue is empty.' });
		const track = queue.remove(command.options.getInteger('index', true));
		command.reply({ content: `Removed ${track.title} from the queue.` });
		playerMessage(command.client);
	}
} as Command;
