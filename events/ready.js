const cron = require('node-cron')
const { getDogFactsEmbed, getCatFactsEmbed } = require("../utils/helpers")
const { MONGODATABASE, CRONCOLLECTION, DOGFACT, CATFACT, DMCOLLECTION, REMINDER } = require("../utils/constants")

module.exports = {
    name : 'ready',
    once : true,
    async execute(client) {
        // Alert the console when the client is ready
        console.log(`Ready! Logged in as ${client.user.tag}`)

        // Set the bot's status
        client.user.setActivity('with Emojis')

        // Retrieve any cron jobs from the database and schedule them
        // Once the client is ready
        const collection = client.db.db(MONGODATABASE).collection(CRONCOLLECTION)
        const documents = await collection.find({}).toArray()

        client.cronJobs = []
        for(const doc of documents) {
            try {
                const cronJob = cron.schedule(doc.CronStr, async () => {
                    if(doc.JobName === DOGFACT) {
                        const messageEmbed = await getDogFactsEmbed()
                        await client.channels.cache.get(doc.ChannelId).send({ embeds : [messageEmbed] })
                    } else if(doc.JobName === CATFACT) {
                        const messageEmbed = await getCatFactsEmbed()
                        await client.channels.cache.get(doc.ChannelId).send({ embeds : [messageEmbed] })
                    } else if(doc.JobName === REMINDER) {
                        await client.channels.cache.get(doc.ChannelId).send(doc.Message)
                    }
                })
                client.cronJobs.push({
                    id      : doc._id,
                    channel : doc.ChannelId,
                    cronStr : doc.CronStr,
                    job     : doc.JobName,
                    cronJob : cronJob
                })
            } catch(error) {
                console.error('Error: ', error)
            }
        }

        console.log(`${client.cronJobs.length} Cron Jobs have been scheduled successfully!`)

        // Open DM channels with all ADMIN users
        const ADMINS = process.env.ADMINS.split(',')
        for(const adm of ADMINS) {
            const ADMIN = await client.users.fetch(adm)
            await ADMIN.createDM()
        }

        console.log('Successfully opened DMs with ADMIN users.')

        // Get the list of Users that have Opened their DMs to the bot
        // And open DM channels with them
        const dmCollection = client.db.db(MONGODATABASE).collection(DMCOLLECTION)
        const dmDocuments = await dmCollection.find({}).toArray()
        let dmCount = 0

        for(const doc of dmDocuments) {
            if(!ADMINS.includes(doc.UserId) && doc.AllowDms) {
                ++dmCount
                const dm = await client.users.fetch(doc.UserId)
                await dm.createDM()
            }
        }

        console.log(`successfully created DMs with ${dmCount} users!`)
    },
}