const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('suggest-feature')
        .setDescription('Use this command to submit a suggestion for new bot features!'),

    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('suggest-feature')
            .setTitle('Suggest a New Feature!')

        const suggestionText = new TextInputBuilder()
            .setCustomId('suggestion-txt')
            .setLabel('Feature Suggestion : ')
            .setPlaceholder('Start typing here...')
            .setStyle(TextInputStyle.Paragraph)

        const suggestionActionRow = new ActionRowBuilder()
            .addComponents(suggestionText)

        modal.addComponents(suggestionActionRow)

        interaction.showModal(modal)
    }
}