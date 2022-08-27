const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { EMBEDCOLOR } = require('../utils/constants.js')
const { FEATURESLIST, FEATURESHEADER, REPORTBUG } = require('../utils/developmentFeatures.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('features')
        .setDescription('Get this bots list of available features!'),

    async execute(interaction) {
        const replyEmbed = new EmbedBuilder()
            .setColor(EMBEDCOLOR)
            .setTitle(FEATURESHEADER)
            .setDescription(FEATURESLIST)
        await interaction.reply({ content : REPORTBUG, embeds : [replyEmbed] })
    }
}