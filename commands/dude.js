const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('dude')
        .setDescription('lmao'),
    async execute(interaction) {
        const { dude } = require('../emojibot_files/builtInMessages.json')
        interaction.reply(dude)
    }
}