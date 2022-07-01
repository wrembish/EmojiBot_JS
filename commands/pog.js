const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('pog')
        .setDescription('pog'),
    async execute(interaction) {
        const { pog } = require('../emojibot_files/builtInMessages.json')
        interaction.reply(pog)
    },
}