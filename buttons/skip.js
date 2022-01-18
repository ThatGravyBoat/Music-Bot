const { djRole } = require('../config.json').guildInfo;
module.exports = {
    id: 'skip',
    execute(button) {
        const queue = button.client.player.getQueue(button.guild);
        if (queue){
            if (button.member.roles.cache.has(djRole)){
                queue.skip();
                return button.reply({content: "Song skipped!", ephemeral: true});
            }
            button.reply({content: "You do not have DJ in this guild!", ephemeral: true});
        }
    }
}