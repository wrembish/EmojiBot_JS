const cron = require('node-cron')
const { MONGODATABASE, CRONCOLLECTION, REMINDER } = require('../utils/constants')
const { buildWeeklyCronStr } = require('../utils/helpers')

module.exports = {
    name : 'reminder',
    async execute(interaction) {
        // Handler for the /reminder command Modal Submit interaction
        // Will schedule a cron job for the given Day, Time, and with the given message
        const collection = interaction.client.db.db(MONGODATABASE).collection(CRONCOLLECTION)
        const cronStr = buildWeeklyCronStr(
            interaction.fields.getTextInputValue('reminder-weekday').toLowerCase(),
            interaction.fields.getTextInputValue('reminder-time')
        )

        const JobInsert = {
            ChannelId : interaction.channelId,
            JobName : REMINDER,
            CronStr : cronStr,
            Message : interaction.fields.getTextInputValue('reminder-message'),
            OwnerId : interaction.user.id
        } 
        const insertedJob = await collection.insertOne(JobInsert)
  
        const CronJob = cron.schedule(cronStr, async () => {
            await interaction.channel.send(interaction.fields.getTextInputValue('reminder-message'))
        })

        interaction.client.cronJobs.push({
            id      : insertedJob.insertedId,
            channel : interaction.channelId,
            cronStr : cronStr,
            job     : REMINDER,
            cronJob : CronJob
        })

        await interaction.reply('Your reminder has successfully been set!')
    }
}