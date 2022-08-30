const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('reminder')
        .setDescription('Set a reminder with a custom message!'),

    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('reminder')
            .setTitle('Set a reminder for the current channel!')

        const weekday = new TextInputBuilder()
            .setCustomId('reminder-weekday')
            .setLabel('Day of the Week')
            .setPlaceholder('Enter the day of the week...')
            .setStyle(TextInputStyle.Short)
        
        const time = new TextInputBuilder()
            .setCustomId('reminder-time')
            .setLabel('Time')
            .setPlaceholder('Enter the time for the reminder...')
            .setStyle(TextInputStyle.Short)

        const message = new TextInputBuilder()
            .setCustomId('reminder-message')
            .setLabel('Message')
            .setPlaceholder('Enter the message or the reminder...')
            .setStyle(TextInputStyle.Short)

        const weekdayActionRow = new ActionRowBuilder()
            .addComponents(weekday)

        const timeActionRow = new ActionRowBuilder()
            .addComponents(time)

        const messageActionRow = new ActionRowBuilder()
            .addComponents(message)

        modal.addComponents(weekdayActionRow, timeActionRow, messageActionRow)

        await interaction.showModal(modal)
    }
}