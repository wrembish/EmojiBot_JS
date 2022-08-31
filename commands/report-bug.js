const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('report-bug')
        .setDescription('Use this command to report any bugs or issues you find!'),

    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('report-bug')
            .setTitle('Report a bug')

        const bugText = new TextInputBuilder()
            .setCustomId('bug-txt')
            .setLabel('Bug Description : ')
            .setPlaceholder('Start typing here...')
            .setStyle(TextInputStyle.Paragraph)

        const bugActionRow = new ActionRowBuilder()
            .addComponents(bugText)

        modal.addComponents(bugActionRow)

        await interaction.showModal(modal)
    }
}