const { EmbedBuilder } = require('discord.js')
const { EMBEDCOLOR, WEEKDAYS } = require('./constants')

module.exports = {
    /**
     * Converts the given string into a string of emojis
     * @param {Object} map the conversion object that maps chars to emojis
     * @param {string} str the string to convert
     * @returns the converted string of emojis
     */
    convert(map, str) {
        let output = ''
        for(const c of str.split('')) {
            const emojis = map[c.toUpperCase()]
            if(c === ' ') output += '     '
            else if (emojis) output += emojis[Math.floor(Math.random() * emojis.length)] + ' '
            else output += ` ${c} `
        }

        return output
    },

    /**
     * Deploys the commands from the commands directory to the bot as application commands
     */
    async deployCommands() {
        const fs = require('node:fs')
        const path = require('node:path')
        const { REST } = require('discord.js')
        const { Routes } = require('discord-api-types/v10')

        const commands = []
        const commandsPath = path.join(__dirname, '..', 'commands')
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

        for(const file of commandFiles) {
            const filePath = path.join(commandsPath, file)
            const command = require(filePath)
            commands.push(command.data.toJSON())
        }

        const rest = new REST({ version : '10' }).setToken(process.env.TOKEN)

        rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body : commands })
            .then(() => console.log('Successfully registered application commands!'))
            .catch(error => console.error('Error: ', error))
    },

    /**
     * Deploys the new command to the guild it was created in
     */
     async deployNewCommand(guildId) {
        const fs = require('node:fs')
        const path = require('node:path')
        const { REST } = require('discord.js')
        const { Routes } = require('discord-api-types/v10')

        const commands = []
        const guildCommsPath = path.join(__dirname, '..', 'guildCommands', `${guildId}`)
        const guildCommFiles = fs.readdirSync(guildCommsPath).filter(file => file.endsWith('.js'))

        for(const file of guildCommFiles) {
            const filePath = path.join(guildCommsPath, file)
            const command = require(filePath)
            if (command.guildId === guildId) commands.push(command.data.toJSON()) 
        }

        const rest = new REST({ version : '10' }).setToken(process.env.TOKEN)

        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), { body : commands })
                .then(() => console.log(`Successfully registered commands for Guild Id ${guildId}!`))
                .catch(error => console.error('Error: ', error))
    },

    /**
     * Converts a string in the format HH:MM<AM/PM> to a cron string
     * @param {string} timeStr the time string in the form of HH:MM<AM/PM>
     * @returns a cron string in the form of MM HH * * *
     */
    buildCronStr(timeStr) {
        let output = ''
        const isPM = timeStr.endsWith('PM')
        const timeSplit = timeStr.substring(0, timeStr.length-2).split(':')

        output += timeSplit[1] + ' '

        if (timeSplit[0] === '12' && isPM) output += '12 '
        else if (timeSplit[0] === '12') output += '0 '
        else if (isPM) output += (12 + parseInt(timeSplit[0])).toString() + ' '
        else output += timeSplit[0] + ' '

        output += '* * *'

        return output
    },

    /**
     * Converts a given weekday and time string in the format of HH:MM<AM/PM> to a cron string
     * @param {string} weekday the day of the week
     * @param {string} timeStr the time string in the form of HH:MM<AM/PM>
     * @returns a cron string in the form of MM HH ? * WD
     */
    buildWeeklyCronStr(weekday, timeStr) {
        let output = ''
        const isPM = timeStr.endsWith('PM')
        const timeSplit = timeStr.substring(0, timeStr.length-2).split(':')

        output += timeSplit[1] + ' '

        if (timeSplit[0] === '12' && isPM) output += '12 '
        else if (timeSplit[0] === '12') output += '0 '
        else if (isPM) output += (12 + parseInt(timeSplit[0])).toString() + ' '
        else output += timeSplit[0] + ' '

        output += '* * ' + WEEKDAYS[weekday]

        return output
    },

    /**
     * Creates an embed for discord messages with a random dog fact
     * and a random dog image
     * 
     * Credit : http://dog-api.kinduff.com => random dog fact
     * Credit : https://dog.ceo => random dog image
     * 
     * @returns an EmbedBuilder object with a random dog fact and image
     */
    async getDogFactsEmbed() {
        // Get a random dog fact from http://dog-api.kinduff.com
        let factResult
        await fetch('http://dog-api.kinduff.com/api/facts')
            .then(response => response.json())
            .then(data => factResult = data)
            .catch(error => console.error('Error: ', error))

        // Get a random dog image from https://dog.ceo
        let imageResult
        await fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => imageResult = data)
            .catch(error => console.error('Error: ', error))

        // Build the embed to return
        const resultEmbed = new EmbedBuilder()
            .setTitle('**__Daily Dog Fact__**')
            .setDescription(factResult.facts[0])
            .setColor(EMBEDCOLOR)
            .setImage(imageResult.message)

        return resultEmbed
    },

    /**
     * Creates an embed for discord messages with a random cat fact
     * and a random cat image
     * 
     * Credit : https://catfact.ninja/facts => random cat fact
     * Credit : https://cataas.com => random cat image
     * 
     * @returns an EmbedBuilder object with a random cat fact and image
     */
    async getCatFactsEmbed() {
        // Get a random cat fact from https://catfact.ninja/facts
        let factResult
        await fetch('https://catfact.ninja/fact?max_length=2000')
            .then(response => response.json())
            .then(data => factResult = data)
            .catch(error => console.error('Error: ', error))

        // Get a random cat image from the cats as a service api
        let imageResult
        await fetch('https://cataas.com/cat?json=true')
            .then(response => response.json())
            .then(data => imageResult = data)
            .catch(error => console.error('Error: ', error))

        // Build the embed to return
        const resultEmbed = new EmbedBuilder()
            .setTitle('**__Daily Cat Fact__**')
            .setDescription(factResult.fact)
            .setColor(EMBEDCOLOR)
            .setImage(`https://cataas.com${imageResult.url}`)

        return resultEmbed
    },

    /**
     * Will remove the cron job (if it exists) that corresponds to
     * the message channel and the jobName from the client list of 
     * jobs as well as delete it from the MongoDB collection
     * @param {Message} message The Discord Message object
     * @param {Collection} collection The MongoDB Collection object
     * @param {string} jobName The name of the job you wish to delete
     * @returns true if a job is deleted, false otherwise
     */
    async deleteCronJob(message, collection, jobName) {
        let index = undefined
        for (let i = 0; i < message.client.cronJobs.length; ++i) {
            const job = message.client.cronJobs[i]
            if (job.channel === message.channelId && job.job === jobName) {
                index = i
                job.cronJob.stop()
                await collection.deleteOne({ _id: job.id })
                break
            }
        } if (index) message.client.cronJobs.splice(index, 1)

        return index != undefined
    }
}