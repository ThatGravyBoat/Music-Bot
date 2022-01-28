import type { Button } from '../index.js';

export default {
	id: 'twitter',
	execute(button) {
		// If you're gonna copy and paste all this code please dont remove this :)
		button.reply({ content: 'https://twitter.com/ThatGravyBoat', ephemeral: true });
	}
} as Button;
