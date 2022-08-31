const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('schedule-daily')
        .setDescription('Schedule a daily message to the current channel!'),

    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('schedule-daily')
            .setTitle('Schedule Daily Message')

        const jobNameText = new TextInputBuilder()
            .setCustomId('job-name')
            .setLabel('Message Type: ')
            .setPlaceholder('Enter "dogfacts" or "catfacts"...')
            .setStyle(TextInputStyle.Short)

        const timeText = new TextInputBuilder()
            .setCustomId('time-str')
            .setLabel('Time to Send: ')
            .setPlaceholder('Enter Time in the Format of HH:MM<AM/PM>...')
            .setStyle(TextInputStyle.Short)
        
        const jobNameActionRow = new ActionRowBuilder()
            .addComponents(jobNameText)

        const timeActionRow = new ActionRowBuilder()
            .addComponents(timeText)

        modal.addComponents(jobNameActionRow, timeActionRow)

        await interaction.showModal(modal)
    }
}