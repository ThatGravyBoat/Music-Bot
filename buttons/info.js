const { MessageEmbed } = require('discord.js')
module.exports = {
    id: 'info',
    execute(button) {
        let desc = [];

        desc.push("__**DJ Buttons**__")
        desc.push("⠀<:stop:851424635786100737> **Stop** : Clears queue and stops current song.")
        desc.push("⠀<:pause_play:851424140643532830> **Pause/Play** : Toggles the current song from being paused.")
        desc.push("⠀<:fast_froward:851423740054470727> **Force Skip** : Makes it so that the current song instantly gets skipped.")
        desc.push("")
        desc.push("__**User Buttons**__")
        desc.push("⠀<:remove_last:852149623547101214> **Undo** : Removes your last song from queue.")
        desc.push("⠀<:skip_vote:852149623170662433> **Vote Skip** : Puts your vote in for skipping the current song.")
        desc.push("⠀<:previous_songs:852146652977954846> **Previous Song** : Will return the last 5 songs that were played.")
        desc.push("⠀<:current_song:852146652663119873> **Current Song** : Will return with the current song and its time left.")
        desc.push("⠀<:queue:852146652562718731> **Queue** : Will return the next songs to play.")
        desc.push("")
        desc.push("__**Info Buttons**__")
        desc.push("⠀<:info_icon:851541445559058462> **Info** : Returns this list here.")
        desc.push("⠀<:ping:851541445441224795> **Ping** : Returns the ping of the bot.")
        desc.push("⠀<:twitter:873786155122974753> **Twitter** : Gives you a link to my twitter.")

        button.reply({
            embeds: [
                new MessageEmbed({
                    author: {name: "Info/Help"},
                    description: desc.join("\n")
                })
            ],
            ephemeral : true
        });
    }
}