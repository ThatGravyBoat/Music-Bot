import type { Track } from 'discord-player';
import { MessageEmbed } from 'discord.js';
import config from '../config.json' assert { type: 'json' };
import type { Command } from '../types.js';
import playerMessage from '../utils/playerMessage.js';

const { djRole } = config.guildInfo;

export default {
	id: 'play',
	execute(command) {
		const forced = command.options.getBoolean('force');

		if (!command.member.voice.channelId) return command.reply({ content: 'You are not in a voice channel!' });
		if (command.guild.me!.voice.channelId && command.member.voice.channelId !== command.guild.me!.voice.channelId)
			return command.reply({ content: 'You are not in the voice channel with the bot!' });
		if (forced && !(command.member.roles.cache.has(djRole) || command.member.permissions.has('MANAGE_GUILD'))) {
			return command.reply({
				content: 'You are not a DJ of this discord.\nThe song will not be added to queue.'
			});
		}

		const client = command.client;

		const song = command.options.getString('song', true);
		const queue = client.player.createQueue(command.guild, { metadata: { channel: command.channel } });

		try {
			if (!queue.connection) queue.connect(command.member.voice.channel!);
		} catch {
			queue.destroy();
			return command.reply({ content: 'Could not join your voice channel!' });
		}

		command.deferReply();

		client.player.search(song, { requestedBy: command.member }).then((result) => {
			const track = result.tracks[0];

			if (!track) {
				return command.followUp({
					embeds: [
						new MessageEmbed({
							title: 'No Song Found!',
							thumbnail: { url: 'https://i.imgur.com/Sly51hl.png' },
							fields: [
								{
									name: 'Query',
									value: song,
									inline: true
								}
							]
						})
					]
				});
			}

			if (forced) {
				queue.insert(track, 0);
				command.followUp({ embeds: [createQueueMessage(track, true)] }).then(() => {
					if (queue.tracks.length < 8) playerMessage(client);
				});
			} else {
				queue.play(track).then(() => {
					command.followUp({ embeds: [createQueueMessage(track, false)] }).then(() => {
						if (queue.tracks.length < 8) playerMessage(client);
					});
				});
			}
		});
	}
} as Command;

const createQueueMessage = (track: Track, forced: boolean) => {
	return new MessageEmbed({
		author: {
			name: forced ? 'Song Now Playing!' : 'Song added To Queue',
			icon_url: 'https://image.flaticon.com/icons/png/512/60/60718.png'
		},
		thumbnail: { url: track.thumbnail },
		color: 0x00ff00,
		fields: [
			{ name: 'Song', value: track.title, inline: true },
			{ name: 'Artist', value: track.author, inline: true },
			{ name: 'Duration', value: track.duration, inline: true },
			{ name: 'Link', value: `[Url](${track.url})`, inline: true },
			{ name: 'Requester', value: `<@${track.requestedBy.id}>`, inline: true }
		]
	});
};
