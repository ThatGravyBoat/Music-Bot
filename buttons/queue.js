const { MessageEmbed } = require('discord.js')
module.exports = {
    id: 'queue',
    execute(button) {
        const queue = button.client.player.getQueue(button.guild);
        const embed = new MessageEmbed();
        embed.setAuthor("Song Queue")
        if (queue && queue.tracks.length > 0) {
            for (let i = 0; i < queue.tracks.length; i++) {
                const track = queue.tracks[i];
                embed.addField(`${i}. ${track.title}`, `**Artist:** ${track.author} **Duration:** ${track.duration}\n**Requested By:** ${track.requestedBy}`)
            }
        } else {
            embed.addField("No Songs in Queue", "To add songs run /play")
        }
        button.reply({ embeds : [embed] , ephemeral : true});
    }
}