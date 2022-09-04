const { ObjectId } = require('mongodb')
const { MONGODATABASE, CRONCOLLECTION } = require('../utils/constants')
const { deleteCronJob } = require('../utils/helpers')

module.exports = {
    name : 'cancel-reminder',
    async execute(interaction) {
        const idStr = interaction.fields.getTextInputValue('id-txt')

        if(idStr.length !== 24) {
            await interaction.reply('**Invalid ID entered!**')
        } else {
            const id = new ObjectId(idStr)
            const collection = interaction.client.db.db(MONGODATABASE).collection(CRONCOLLECTION)
            const documents = await collection.find({ _id : id, OwnerId : interaction.user.id, ChannelId : interaction.channelId }).toArray()

            if(documents.length === 0) {
                await interaction.reply('**No reminder found with the given ID! NOTE : Only the creator of the reminder can cancel it, and only from the channel it was created in!**')
            } else {
                const reminderDeleted = await deleteCronJob(interaction, collection, 'reminder')

                if (reminderDeleted) await interaction.reply('**Successfully canceled your reminder!**')
                else await interaction.reply('**Something went wrong while trying to cancel your reminder**')
            }
        }
    }
}