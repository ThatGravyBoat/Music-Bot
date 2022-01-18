const playerMessage = require('../utils/playerMessage')

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        playerMessage(client)

        client.user.setActivity({
            type: "LISTENING",
            name: "your music"
        })
    }
};