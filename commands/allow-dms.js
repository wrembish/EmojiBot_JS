const { SlashCommandBuilder } = require('discord.js')
const { MONGODATABASE, DMCOLLECTION } = require('../utils/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('allow-dms')
        .setDescription('Open up DMs with emojiBot!'),

    async execute(interaction) {
        const collection = interaction.client.db.db(MONGODATABASE).collection(DMCOLLECTION)
        const documents = await collection.find({ UserId : interaction.user.id }).toArray()

        if(documents.length > 0) {
            await interaction.reply('**We\'re *already* DMing silly!**')
        } else {
            await interaction.user.send(`**Hello ${interaction.user.tag}! Thank you for allowing me into your DMs :)**`)
            await collection.insertOne({ UserId : interaction.user.id, AllowDms : true })
            await interaction.reply(`**${interaction.user} I just sent you a DM, you can now use my commands in our DMs!!**`)
        }
    }
}