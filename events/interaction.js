module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        if (interaction.isCommand()){
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;
            command.execute(interaction);
        }
        if (interaction.isButton()){
            const button = interaction.client.buttons.get(interaction.customId);
            if (!button)return;
            button.execute(interaction);
        }
    }
}