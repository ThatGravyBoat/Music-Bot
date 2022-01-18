const { MessageEmbed, MessageButton, MessageActionRow} = require("discord.js")
const {SpacerButton} = require("./SpacerButton");
const { musicPlayerChannel, musicPlayerMessage } = require('../config.json').guildInfo;
const { votePercentage } = require('../config.json').playerSettings;

module.exports = (client) => {
    client.channels.fetch(musicPlayerChannel).then(channel=> {
        channel.messages.fetch(musicPlayerMessage).then(msg => {
            const queue = client.player.getQueue(msg.guild);
            msg.edit({
                components: [getAdminButtons(!queue), getButtons(!queue), getButtons2(!queue || queue.tracks.length < 5,!queue)],
                embeds: [getPlayerMessage(client, queue)]
            });
        });
    });
}

const emptyTrack = {
    title: "No Song Playing",
    requestedBy: "N/A",
    duration: "N/A",
    thumbnail: "https://distok.top/stickers/749043879713701898/749052944682582036.gif"
}


const getPlayerMessage = (client, queue) => {
    const embed = new MessageEmbed();

    const currentTrack = queue ? queue.current : emptyTrack;

    embed.setTitle("Music Player")
    embed.setColor(0xff0000)
    const desc = [];
    desc.push(`**Current Song: **${currentTrack.title}`);
    desc.push(`**Requested By: **${currentTrack.requestedBy}`);
    desc.push(`**Duration:** ${currentTrack.duration}`);
    embed.setDescription(desc.join('\n'))
    embed.setThumbnail(currentTrack.thumbnail)

    if (queue && queue.tracks.length > 0) {
        for (let i = 0; i < Math.min(queue.tracks.length, 5); i++) {
            const track = queue.tracks[i];
            embed.addField(`${i}. ${track.title}`, `**Artist:** ${track.author}\n**Duration:** ${track.duration}\n**Requested By:** ${track.requestedBy}`)
        }
    } else {
        embed.addField("No Songs in Queue", "To add songs run /play")
    }

    embed.addField("Vote Skips", `${client.currentVoteAmount} votes, need at least ${Math.trunc(votePercentage*100)}% to skip.`)
    embed.setFooter({
        text: "Click on the green info button to know what each button does."
    })

    return embed;
}

const infoButton = new MessageButton();
infoButton.setStyle("SUCCESS");
infoButton.setCustomId("info");
infoButton.setEmoji("851541445559058462");

const pingButton = new MessageButton();
pingButton.setStyle("SUCCESS");
pingButton.setCustomId("ping");
pingButton.setEmoji("851541445441224795");

const twitterButton = new MessageButton();
twitterButton.setStyle("SUCCESS");
twitterButton.setCustomId("twitter");
twitterButton.setEmoji("873786155122974753");

const getButtons = (disable) => {
    const voteSkip = new MessageButton();
    voteSkip.setStyle("PRIMARY");
    voteSkip.setDisabled(disable);
    voteSkip.setCustomId("vote_skip");
    voteSkip.setEmoji("852149623170662433");

    const remove = new MessageButton();
    remove.setStyle("PRIMARY");
    remove.setDisabled(disable);
    remove.setCustomId("remove_last");
    remove.setEmoji("852149623547101214");

    return new MessageActionRow().addComponents([remove,new SpacerButton(0),voteSkip,new SpacerButton(1),pingButton]);
}

const getButtons2 = (queueDisabled, disable) => {

    const currentlyPlaying = new MessageButton();
    currentlyPlaying.setStyle("PRIMARY");
    currentlyPlaying.setDisabled(disable);
    currentlyPlaying.setCustomId("current_playing");
    currentlyPlaying.setEmoji("852146652663119873");

    const queue = new MessageButton();
    queue.setStyle("PRIMARY");
    queue.setDisabled(queueDisabled);
    queue.setCustomId("queue");
    queue.setEmoji("852146652562718731");

    const previousSongs = new MessageButton();
    previousSongs.setStyle("PRIMARY");
    previousSongs.setDisabled(disable);
    previousSongs.setCustomId("previous_songs");
    previousSongs.setEmoji("852146652977954846");

    return new MessageActionRow().addComponents([previousSongs,currentlyPlaying,queue,new SpacerButton(2),twitterButton]);
}

const getAdminButtons = (disable) => {
    const playOrPause = new MessageButton();
    playOrPause.setStyle("DANGER");
    playOrPause.setDisabled(disable);
    playOrPause.setCustomId("play_pause");
    playOrPause.setEmoji("851424140643532830");

    const skip = new MessageButton();
    skip.setStyle("DANGER");
    skip.setDisabled(disable);
    skip.setCustomId("skip");
    skip.setEmoji("851423740054470727");

    const stop = new MessageButton();
    stop.setStyle("DANGER");
    stop.setDisabled(disable);
    stop.setCustomId("stop");
    stop.setEmoji("851424635786100737");

    return new MessageActionRow().addComponents([stop,playOrPause,skip,new SpacerButton(3),infoButton]);
}


