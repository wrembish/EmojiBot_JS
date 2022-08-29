const { SlashCommandBuilder } = require('discord.js')
const { MONGODATABASE, DMCOLLECTION } = require('../utils/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('stop-dms')
        .setDescription('Revoke access to your DMs with me'),

    async execute(interaction) {
        const collection = interaction.client.db.db(MONGODATABASE).collection(DMCOLLECTION)
        const documents = await collection.find({ UserId : interaction.user.id, AllowDms : true }).toArray()

        if(documents.length > 0) {
            await collection.updateOne({ _id : documents[0]._id }, { $set : { AllowDms : false } })
            await interaction.user.deleteDM()
            await interaction.reply('**Successfully revoked my access to you DMs!**')
        } else {
            await interaction.reply('**We currently aren\'t DMing o:!**')
        }
    }
}