const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')
const { LACKACCESSERRORMESSAGE } = require('../../utils/constants')

module.exports = {
    guildId : process.env.ADMINSERVER,
    data : new SlashCommandBuilder()
        .setName('accept-suggestion')
        .setDescription('Accept a suggestion by Id.'),

    async execute(interaction) {
        if(process.env.ADMINS.split(',').includes(interaction.user.id)) {
            const modal = new ModalBuilder()
                .setCustomId('accept-suggestion')
                .setTitle('Accept a suggestion by ID')

            const suggestionIdInput = new TextInputBuilder()
                .setCustomId('suggestion-id')
                .setLabel('Suggestion Id: ')
                .setPlaceholder('Type the 24 Character id Here...')
                .setStyle(TextInputStyle.Short)

            const suggestionActionRow = new ActionRowBuilder()
                .addComponents(suggestionIdInput)

            modal.addComponents(suggestionActionRow)

            await interaction.showModal(modal)
        } else await interaction.reply(LACKACCESSERRORMESSAGE)
    }
}