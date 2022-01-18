const { djRole } = require('../config.json').guildInfo;
const {MessageEmbed} = require("discord.js");
const playerMessage = require("../utils/playerMessage");
module.exports = {
    id: 'play',
    execute(command) {
        const forced = command.options.getBoolean("force");

        if (!command.member.voice.channelId)
            return command.reply({ content: "You are not in a voice channel!", ephemeral: true });
        if (command.guild.me.voice.channelId && command.member.voice.channelId !== command.guild.me.voice.channelId)
            return command.reply({ content: "You are not in the voice channel with the bot!", ephemeral: true });
        if (forced && !command.member.roles.cache.has(djRole)){
            return command.reply({ content: "You are not a DJ of this discord.\nThe song will not be added to queue.", ephemeral: true });
        }

        const client = command.client;

        const song = command.options.getString("song");
        const queue = client.player.createQueue(command.guild, {metadata:{channel: command.channel}});

        try {
            if (!queue.connection) queue.connect(command.member.voice.channel);
        } catch {
            queue.destroy();
            return command.reply({ content: "Could not join your voice channel!", ephemeral: true });
        }

        command.deferReply({ephemeral: true});

        client.player.search(song, {requestedBy: command.member}).then(result => {
            const track = result.tracks[1];
            if (!track) {
                return command.followUp({
                    embeds: [
                        new MessageEmbed({
                            title: "No Song Found!",
                            thumbnail: { url: "https://i.imgur.com/Sly51hl.png" },
                            fields: [
                                {
                                    name: "Query",
                                    value: song,
                                    inline: true
                                }
                            ]
                        })
                    ],
                    ephemeral: true
                });
            }

            if (forced) {
                queue.insert(track, 0);
                command.followUp({embeds: [createQueueMessage(track, true)], ephemeral: true}).then(() => {
                    if (queue.tracks.length < 8) playerMessage(client);
                });
            }else {
                queue.play(track).then(() => {
                    command.followUp({embeds: [createQueueMessage(track, false)], ephemeral: true}).then(() => {
                        if (queue.tracks.length < 8) playerMessage(client);
                    });
                });
            }
        });
    }
};

const createQueueMessage = (track, forced) => {
    return new MessageEmbed({
        author: {
            name: (forced ? "Song Now Playing!" : "Song added To Queue"),
            icon_url: "https://image.flaticon.com/icons/png/512/60/60718.png"
        },
        thumbnail: { url : track.thumbnail },
        color: 0x00ff00,
        fields: [
            { name: "Song", value: track.title, inline: true },
            { name: "Artist", value: track.author, inline: true },
            { name: "Duration", value: track.duration, inline: true },
            { name: "Link", value: `[Url](${track.url})`, inline: true },
            { name: "Requester", value: `<@${track.requestedBy.id}>`, inline: true }
        ]
    });
}