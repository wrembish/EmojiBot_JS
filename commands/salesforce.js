const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('salesforce')
        .setDescription('all my homies love salesforce'),
    async execute(interaction) {
        const { sf } = require('../emojibot_files/builtInMessages.json')
        interaction.reply(sf)
    },
}