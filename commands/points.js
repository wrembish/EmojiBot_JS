const { SlashCommandBuilder } = require('discord.js')
const { MONGODATABASE, POINTSCOLLECTION } = require('../utils/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('points')
        .setDescription('Get your current points!'),

    async execute(interaction) {
        // Search MongoDB database collection for the User to see if they have points yet
        const collection = interaction.client.db.db(MONGODATABASE).collection(POINTSCOLLECTION)
        const documents = await collection.find({ UserId : interaction.user.id }).toArray()
        
        const now = Date.now()
        // If the user has points
        if(documents.length > 0) {
            // Calculate and add the passive points earned since the last time the user's points were updated
            const update = { $set : {} }
            // The passive points are 10 points every 5 minutes
            update.$set.Points = (parseInt(documents[0].Points) + Math.floor((((now - parseInt(documents[0].LastUpdate)) / 60000 ) / 5) * 10)).toString()
            update.$set.LastUpdate = now.toString()
            // Update the user's points in the database and notify the user how many points they have
            await collection.updateOne({ _id : documents[0]._id }, update)
            await interaction.reply(`**${interaction.user} You have __${update.$set.Points}__ Points!**`)
        } 
        // If the user doesn't have points
        else {
            // The default value for user points is 50000, notify the user they have that many points then create their MongoDB Record
            await interaction.reply(`**${interaction.user} You have __50000__ Points!**`)
            const insert = {
                UserId: interaction.user.id,
                Points: '50000',
                LastUpdate: now.toString()
            }

            await collection.insertOne(insert)
        }
    }
}