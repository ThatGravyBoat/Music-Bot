import type { Player, PlayerEvents } from 'discord-player';
import type { ButtonInteraction, ClientEvents, Collection, CommandInteraction } from 'discord.js';

declare module 'discord.js' {
	export interface Client {
		player: Player;
		currentVoteAmount: number;
		commands: Collection<string, Command>;
		buttons: Collection<string, Button>;
	}
}

export interface Event {
	name: keyof PlayerEvents | keyof ClientEvents;
	music?: boolean;
	once?: boolean;
	execute(...args: any[]): any;
}

export interface Command {
	id: string;
	execute(command: CommandInteraction<'cached'>): any;
}

export interface Button {
	id: string;
	execute(button: ButtonInteraction<'cached'>): any;
}
