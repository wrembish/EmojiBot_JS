const cron = require('node-cron')
const { getDogFactsEmbed, getCatFactsEmbed } = require("../utils/helpers")
const { MONGODATABASE, CRONCOLLECTION } = require("../utils/constants")

module.exports = {
    name : 'ready',
    once : true,
    async execute(client) {
        // alert the console when the client is ready
        console.log(`Ready! Logged in as ${client.user.tag}`)

        // retrieve any cron jobs from the database and schedule them
        // once the client is ready
        const collection = client.db.db(MONGODATABASE).collection(CRONCOLLECTION)
        const documents = await collection.find({}).toArray()

        client.cronJobs = []
        for(const doc of documents) {
            const cronJob = cron.schedule(doc.CronStr, async () => {
                if(doc.JobName === 'dogfacts') {
                    const messageEmbed = await getDogFactsEmbed()
                    client.channels.cache.get(doc.ChannelId).send({ embeds : [messageEmbed] })
                } else if(doc.JobName === 'catfacts') {
                    const messageEmbed = await getCatFactsEmbed()
                    console.log(messageEmbed)
                    client.channels.cache.get(doc.ChannelId).send({ embeds : [messageEmbed] })
                }
            })
            client.cronJobs.push({
                id      : doc._id,
                channel : doc.ChannelId,
                cronStr : doc.CronStr,
                job     : doc.JobName,
                cronJob : cronJob
            })
        }

        console.log(`${client.cronJobs.length} Cron Jobs have been scheduled successfully!`)
    },
}