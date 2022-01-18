const playerMessage = require('../utils/playerMessage')
module.exports = {
    name: 'queueEnd',
    music: true,
    execute(queue, client) {
        playerMessage(client)
    }
};