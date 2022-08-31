const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('remove-daily')
        .setDescription('Remove the channel from receiving a daily message'),

    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('remove-daily')
            .setTitle('Remove Daily Message')

        const jobNameText = new TextInputBuilder()
            .setCustomId('job-name')
            .setLabel('Message Type: ')
            .setPlaceholder('Enter "dogfacts" or "catfacts"...')
            .setStyle(TextInputStyle.Short)

        const jobNameActionRow = new ActionRowBuilder()
            .addComponents(jobNameText)

        modal.addComponents(jobNameActionRow)

        await interaction.showModal(modal)
    }
}