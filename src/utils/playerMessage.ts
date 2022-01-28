import assert from 'assert';
import type { Queue } from 'discord-player';
import { Client, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { MessageButtonStyles } from 'discord.js/typings/enums';
import config from '../config.json' assert { type: 'json' };
import { SpacerButton } from './SpacerButton.js';

const { musicPlayerChannel, musicPlayerMessage } = config.guildInfo;
const { votePercentage } = config.playerSettings;

export default (client: Client) => {
	client.channels.fetch(musicPlayerChannel).then((channel) => {
		if (!channel) throw new Error('Cannot find music player channel.');
		if (channel.type !== 'GUILD_TEXT') throw new Error('Music player channel must be a text channel.');
		channel.messages.fetch(musicPlayerMessage).then((msg) => {
			assert(msg.inGuild());
			const queue = client.player.getQueue(msg.guild);
			msg.edit({
				content: null,
				components: [
					getAdminButtons(!queue),
					getButtons(!queue),
					getButtons2(!queue || queue.tracks.length < 5, !queue)
				],
				embeds: [getPlayerMessage(client, queue)]
			});
		});
	});
};

const emptyTrack = {
	title: 'No Song Playing',
	requestedBy: 'N/A',
	duration: 'N/A',
	thumbnail: 'https://distok.top/stickers/749043879713701898/749052944682582036.gif'
};

const getPlayerMessage = (client: Client, queue: Queue) => {
	const currentTrack = queue ? queue.current : emptyTrack;
	const desc = [
		`**Current Song: **${currentTrack.title}`,
		`**Requested By: **${currentTrack.requestedBy}`,
		`**Duration:** ${currentTrack.duration}`
	];

	const embed = new MessageEmbed()
		.setTitle('Music Player')
		.setColor(0xff0000)
		.setDescription(desc.join('\n'))
		.setThumbnail(currentTrack.thumbnail);

	if (queue && queue.tracks.length > 0) {
		for (let i = 0; i < Math.min(queue.tracks.length, 5); i++) {
			const track = queue.tracks[i];
			embed.addField(
				`${i}. ${track.title}`,
				`**Artist:** ${track.author}\n**Duration:** ${track.duration}\n**Requested By:** ${track.requestedBy}`
			);
		}
	} else {
		embed.addField('No Songs in Queue', 'To add songs run /play');
	}

	embed.addField(
		'Vote Skips',
		`${client.currentVoteAmount} votes, need at least ${Math.trunc(votePercentage * 100)}% to skip.`
	);
	embed.setFooter({
		text: 'Click on the green info button to know what each button does.'
	});

	return embed;
};

const infoButton = new MessageButton()
	.setStyle(MessageButtonStyles.SUCCESS)
	.setCustomId('info')
	.setEmoji('851541445559058462');

const pingButton = new MessageButton()
	.setStyle(MessageButtonStyles.SUCCESS)
	.setCustomId('ping')
	.setEmoji('851541445441224795');

const twitterButton = new MessageButton()
	.setStyle(MessageButtonStyles.SUCCESS)
	.setCustomId('twitter')
	.setEmoji('873786155122974753');

const getButtons = (disable: boolean) => {
	const voteSkip = new MessageButton()
		.setStyle(MessageButtonStyles.PRIMARY)
		.setDisabled(disable)
		.setCustomId('vote_skip')
		.setEmoji('852149623170662433');

	const remove = new MessageButton()
		.setStyle(MessageButtonStyles.PRIMARY)
		.setDisabled(disable)
		.setCustomId('remove_last')
		.setEmoji('852149623547101214');

	return new MessageActionRow().addComponents([remove, new SpacerButton(0), voteSkip, new SpacerButton(1), pingButton]);
};

const getButtons2 = (queueDisabled: boolean, disable: boolean) => {
	const currentlyPlaying = new MessageButton()
		.setStyle(MessageButtonStyles.PRIMARY)
		.setDisabled(disable)
		.setCustomId('current_playing')
		.setEmoji('852146652663119873');

	const queue = new MessageButton()
		.setStyle(MessageButtonStyles.PRIMARY)
		.setDisabled(queueDisabled)
		.setCustomId('queue')
		.setEmoji('852146652562718731');

	const previousSongs = new MessageButton()
		.setStyle(MessageButtonStyles.PRIMARY)
		.setDisabled(disable)
		.setCustomId('previous_songs')
		.setEmoji('852146652977954846');

	return new MessageActionRow().addComponents([
		previousSongs,
		currentlyPlaying,
		queue,
		new SpacerButton(2),
		twitterButton
	]);
};

const getAdminButtons = (disable: boolean) => {
	const playOrPause = new MessageButton()
		.setStyle(MessageButtonStyles.DANGER)
		.setDisabled(disable)
		.setCustomId('play_pause')
		.setEmoji('851424140643532830');

	const skip = new MessageButton()
		.setStyle(MessageButtonStyles.DANGER)
		.setDisabled(disable)
		.setCustomId('skip')
		.setEmoji('851423740054470727');

	const stop = new MessageButton()
		.setStyle(MessageButtonStyles.DANGER)
		.setDisabled(disable)
		.setCustomId('stop')
		.setEmoji('851424635786100737');

	return new MessageActionRow().addComponents([stop, playOrPause, skip, new SpacerButton(3), infoButton]);
};
