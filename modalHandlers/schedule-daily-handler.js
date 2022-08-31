const { MONGODATABASE, CRONCOLLECTION, DOGFACT, CATFACT } = require('../utils/constants')
const { deleteCronJob, buildCronStr, getCatFactsEmbed, getDogFactsEmbed } = require('../utils/helpers')
const cron = require('node-cron')

module.exports = {
    name : 'schedule-daily',
    async execute(interaction) {
        const jobInput = interaction.fields.getTextInputValue('job-name')
        let job
        if(jobInput.toLowerCase().includes('dog') && jobInput.toLowerCase().includes('facts')) {
            job = DOGFACT
        } else if(jobInput.toLowerCase().includes('cat') && jobInput.toLowerCase().includes('facts')) {
            job = CATFACT
        }

        if(!job) {
            await interaction.reply('Incorrect schedulable message type!')
            return
        }

        const collection = interaction.client.db.db(MONGODATABASE).collection(CRONCOLLECTION)
        const cronDeleted = await deleteCronJob(interaction, collection, job)

        const timeStr = interaction.fields.getTextInputValue('time-str')
        if(timeStr.endsWith('AM') || timeStr.endsWith('PM')) {
            const cronStr = buildCronStr(timeStr)

            const result = await collection.insertOne({ ChannelId : interaction.channel.id, JobName : job, CronStr : cronStr })
            const mongoJobId = result.insertedId

            try {
                let cronJob
                if(job === DOGFACT) {
                    cronJob = cron.schedule(cronStr, async () => {
                        const messageEmbed = await getDogFactsEmbed()
                        await interaction.channel.send({ embeds : [messageEmbed] })
                    })
                } else if(job === CATFACT) {
                    cronJob = cron.schedule(cronStr, async () => {
                        const messageEmbed = await getCatFactsEmbed()
                        await interaction.channel.send({ embeds : [messageEmbed] })
                    })
                }

                interaction.client.cronJobs.push({
                    id      : mongoJobId,
                    channel : interaction.channel.id,
                    cronStr : cronStr,
                    job     : job,
                    cronJob : cronJob
                })

                if(cronDeleted) await interaction.reply(`**Channel successfully rescheduled to receive a ${job.substring(0, job.length-1)} daily at __${timeStr}__**`)
                else await interaction.reply(`**Channel successfully set to receive a random ${job.substring(0, job.length-1)} daily at __${timeStr}__**`)
            } catch(error) {
                console.error('Error: ', error)
                await interaction.reply(`There was a problem setting this channel to recieve daily ${job}`)
            }
        }
    }
}