import { ApplicationCommandOptionType } from 'discord-api-types';

export default [
	{
		name: 'play',
		description: 'Adds the song to the queue to play.',
		options: [
			{
				type: ApplicationCommandOptionType.String,
				name: 'song',
				description: 'The song which you would like to play.',
				required: true
			},
			{
				type: ApplicationCommandOptionType.Boolean,
				name: 'force',
				description: "This is a DJ only option so don't use it if you're not a DJ of the guild.",
				required: false
			}
		]
	},
	{
		name: 'remove',
		default_permissions: false,
		description: 'Removes a song thats a specific index in the queue.',
		options: [
			{
				type: ApplicationCommandOptionType.Integer,
				name: 'index',
				description: 'The index of the song',
				required: true
			}
		]
	}
] as const;
