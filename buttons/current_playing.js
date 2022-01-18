const { MessageEmbed } = require('discord.js')

module.exports = {
    id: 'current_playing',
    execute(button) {
        const queue = button.client.player.getQueue(button.guild);
        if (!queue) return button.reply({content: "Nothing playing!", ephemeral: true})
        const track = queue.current;
        const embed = new MessageEmbed({
            author: { name: track.title, icon_url: track.thumbnail, url: track.url },
            description: getFancyPlayerBar(queue),
            fields: [{ name: "Requested By", value: `<@${track.requestedBy.id}>` }]
        });
        button.reply({ embeds: [embed], ephemeral : true });
    }
}

const getFancyPlayerBar = (queue) => {
    const playerTimeStamp = queue.getPlayerTimestamp();
    const duration = (playerTimeStamp.progress/100) * 16

    let bar = new Array(Math.trunc(duration)).fill("<:full:852116838154502164>");
    bar.push(getPartEmoji(duration%1))
    bar = bar.concat(new Array(16-bar.length).fill("<:not_full:852116838091194368>"))

    return `${playerTimeStamp.current} ${bar.join('')} ${playerTimeStamp.end}`
}

const getPartEmoji = decimal => {
    if (decimal <= 0.125) return "<:18full:852121532174958622>"
    else if (decimal <= 0.25) return "<:28full:852121531906785301>"
    else if (decimal <= 0.375) return "<:38full:852121531882799115>"
    else if (decimal <= 0.5) return "<:48full:852121532099592202>"
    else if (decimal <= 0.625) return "<:58full:852121532071542844>"
    else if (decimal <= 0.75) return "<:68full:852121532113354802>"
    else if (decimal <= 0.875) return "<:78full:852121532037595166>"
    else return "<:full:852116838154502164>"
}