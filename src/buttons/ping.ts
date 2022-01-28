import type { Button } from '../index.js';

export default {
	id: 'ping',
	execute(button) {
		button.reply({ content: `Ping : **${button.client.ws.ping}ms** !`, ephemeral: true });
	}
} as Button;
