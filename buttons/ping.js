module.exports = {
    id: 'ping',
    execute(button) {
        button.reply({content: `Ping : **${button.client.ws.ping}ms** !`, ephemeral : true})
    }
}