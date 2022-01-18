const { MessageButton} = require("discord.js")

exports.SpacerButton = class SpacerButton extends MessageButton {

    constructor(id, data) {
        super(data);
        this.setStyle("SECONDARY")
        this.setCustomId("scr_"+id)
        this.setDisabled(true)
        this.setEmoji("851471082140860506")
    }
}