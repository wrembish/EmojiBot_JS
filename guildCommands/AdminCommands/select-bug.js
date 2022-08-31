const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')
const { LACKACCESSERRORMESSAGE } = require('../../utils/constants')

module.exports = {
    guildId : process.env.ADMINSERVER,
    data : new SlashCommandBuilder()
        .setName('select-bug')
        .setDescription('Select a bug to start progress on!'),

    async execute(interaction) {
        if(process.env.ADMINS.split(',').includes(interaction.user.id)) {
            const modal = new ModalBuilder()
                .setCustomId('select-bug')
                .setTitle('Select a bug by ID')

            const bugIdInput = new TextInputBuilder()
                .setCustomId('bug-id')
                .setLabel('Bug Id: ')
                .setPlaceholder('Type the 24 Character id Here...')
                .setStyle(TextInputStyle.Short)

            const bugActionRow = new ActionRowBuilder()
                .addComponents(bugIdInput)

            modal.addComponents(bugActionRow)

            await interaction.showModal(modal)
        } else await interaction.reply(LACKACCESSERRORMESSAGE)
    }
}