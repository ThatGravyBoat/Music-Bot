import type { APIButtonComponent } from 'discord-api-types';
import { MessageButton, type MessageButtonOptions } from 'discord.js';
import { MessageButtonStyles } from 'discord.js/typings/enums';

export class SpacerButton extends MessageButton {
	constructor(id: number, data?: MessageButton | MessageButtonOptions | APIButtonComponent) {
		super(data);
		this.setStyle(MessageButtonStyles.SECONDARY);
		this.setCustomId('scr_' + id);
		this.setDisabled(true);
		this.setEmoji('851471082140860506');
	}
}
