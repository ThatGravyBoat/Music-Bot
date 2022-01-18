const { votePercentage, preventInstantSkip } = require('../config.json').playerSettings;
const playerMessage = require('../utils/playerMessage');

module.exports = {
    id: 'vote_skip',
    execute(button) {
        const queue = button.client.player.getQueue(button.guild);
        if (queue) {
            if (button.guild.me.voice.channelId !== button.member.voice.channelId){
                return button.reply({ content: "Not in the voice channel with the bot.", ephemeral: true});
            }

            if (preventInstantSkip && queue.getPlayerTimestamp().progress < 0.02){
                return button.reply({ content: "To prevent people from instantly skipping by accident you have to listen to the first few seconds of the song.", ephemeral: true});
            }

            button.client.currentVoteAmount++;
            playerMessage(button.client);

            const voiceMembers = button.guild.me.voice.channel.members.size;
            if ((button.client.currentVoteAmount / (voiceMembers - 1)) >= votePercentage){
                queue.skip();
                return button.reply({content: "Song skipped!", ephemeral: true});
            }
            button.reply({content: "Skip vote added!", ephemeral: true});
        }
    }
}