const playerMessage = require('../utils/playerMessage')

module.exports = {
    name: 'trackStart',
    music: true,
    execute(queue, track, client) {
        client.currentVoteAmount = 0;
        playerMessage(client)
    }
};