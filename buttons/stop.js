const { djRole } = require('../config.json').guildInfo;
const playerMessage = require('../utils/playerMessage')
module.exports = {
    id: 'stop',
    execute(button) {
        const queue = button.client.player.getQueue(button.guild);
        if (queue){
            if (button.member.roles.cache.has(djRole)){
                queue.stop();
                setTimeout(() => playerMessage(button.client), 2500);
                return button.reply({content: "Player stopped!", ephemeral: true});
            }
            button.reply({content: "You do not have DJ in this guild!", ephemeral: true});
        }
    }
}