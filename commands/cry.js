const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('cry')
        .setDescription('a weekly occurance'),
    async execute(interaction) {
        const sf = require('../emojibot_files/sf.js')
        interaction.client.salesforce = await sf.checkAuth(interaction.client.salesforce)
        const result = await sf.doPost(interaction.client.salesforce, 'services/apexrest/Convert', { 'StrToConvert' : 'time to cry boys' })
        await interaction.reply(`:cry:  ${result}  :cry:`)
    },
}