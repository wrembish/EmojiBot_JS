const { SlashCommandBuilder } = require('discord.js')
const { MONGODATABASE, POINTSCOLLECTION } = require('../utils/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('points')
        .setDescription('Get your current points!'),

    async execute(interaction) {
        const collection = interaction.client.db.db(MONGODATABASE).collection(POINTSCOLLECTION)
        const documents = await collection.find({ UserId : interaction.user.id }).toArray()
        
        const now = Date.now()
        if(documents.length > 0) {
            const update = { $set : {} }
            update.$set.Points = (parseInt(documents[0].Points) + Math.floor((((now - parseInt(documents[0].LastUpdate)) / 60000 ) / 5) * 10)).toString()
            update.$set.LastUpdate = now.toString()
            await collection.updateOne({ _id : documents[0]._id }, update)
            await interaction.reply(`**${interaction.user} You have __${update.$set.Points}__ Points!**`)
        } else {
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