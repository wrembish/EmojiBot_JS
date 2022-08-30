const { SlashCommandBuilder } = require('discord.js')
const { MONGODATABASE, DMCOLLECTION } = require('../utils/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('stop-dms')
        .setDescription('Revoke access to your DMs with me'),

    async execute(interaction) {
        // Get the User's record from the MongoDB database collection, only if they are currently allowing DMs
        const collection = interaction.client.db.db(MONGODATABASE).collection(DMCOLLECTION)
        const documents = await collection.find({ UserId : interaction.user.id, AllowDms : true }).toArray()

        // If the record exists and the user is allowing DMs
        if(documents.length > 0) {
            // Update their record to indicate they are no longer allowing DMs,
            // Delete the DMs channel from the cache, and notify them
            await collection.updateOne({ _id : documents[0]._id }, { $set : { AllowDms : false } })
            await interaction.user.deleteDM()
            await interaction.reply('**Successfully revoked my access to you DMs!**')
        } 
        // If the record doesn't exist, or the user is already not allowing DMs
        else {
            // Notify the user that they currently don't have their DMs open to the bot
            await interaction.reply('**We currently aren\'t DMing o:!**')
        }
    }
}