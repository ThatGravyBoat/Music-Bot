const playerMessage = require('../utils/playerMessage')

module.exports = {
    name: 'error',
    music: true,
    execute(queue, error, client) {
        if (error.name !== "VideoUnavailable") {
            console.error(`Error: ${error}`);
        }
        playerMessage(client);
    }
};
