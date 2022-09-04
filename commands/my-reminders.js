const { SlashCommandBuilder } = require('discord.js')
const { MONGODATABASE, CRONCOLLECTION, CRONWEEKDAYS } = require('../utils/constants')
const { cronToTimeStr } = require('../utils/helpers')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('my-reminders')
        .setDescription('Get a list of your reminders set in the current channel!'),

    async execute(interaction) {
        const collection = interaction.client.db.db(MONGODATABASE).collection(CRONCOLLECTION)
        const reminders = await collection.find({ ChannelId : interaction.channelId, OwnerId : interaction.user.id }).toArray()

        if(reminders.length === 0) {
            await interaction.reply('**You currently do not have any reminders set in this channel!**')
        } else {
            let reply = ''
            for(const reminder of reminders) {
                reply += `${CRONWEEKDAYS[reminder.CronStr.split(' ')[4]]} at ${cronToTimeStr(reminder.CronStr)} : ${reminder.Message}\n`
                reply += `Reminder ID : ${reminder._id}\n\n`
            }
            interaction.reply(reply)
        }
    }
}