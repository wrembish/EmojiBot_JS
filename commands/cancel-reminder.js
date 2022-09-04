const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('cancel-reminder')
        .setDescription('Cancel a reminder by its ID (to get the ID try using /my-reminder)'),

    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('cancel-reminder')
            .setTitle('Cancel Reminder by ID')

        const reminderIdText = new TextInputBuilder()
            .setCustomId('id-txt')
            .setLabel('Reminder ID: ')
            .setPlaceholder('Type the 24 Character ID Here...')
            .setStyle(TextInputStyle.Short)

        const reminderIdActionRow = new ActionRowBuilder()
            .addComponents(reminderIdText)

        modal.addComponents(reminderIdActionRow)

        await interaction.showModal(modal)
    }
}