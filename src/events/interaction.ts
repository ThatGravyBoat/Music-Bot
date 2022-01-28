import type { ButtonInteraction, CommandInteraction, Interaction } from 'discord.js';
import type { Event } from '../index.js';

export default {
	name: 'interactionCreate',
	execute(interaction: Interaction) {
		if (interaction.isCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) return;
			command.execute(interaction as CommandInteraction<'cached'>);
		}
		if (interaction.isButton()) {
			const button = interaction.client.buttons.get(interaction.customId);
			if (!button) return;
			button.execute(interaction as ButtonInteraction<'cached'>);
		}
	}
} as Event;
