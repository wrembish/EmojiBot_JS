const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('succ')
        .setDescription('lmao'),
    async execute(interaction) {
        const { succ } = require('../emojibot_files/builtInMessages.json')
        interaction.reply(succ)
    },
}