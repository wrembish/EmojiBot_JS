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
     * Converts a cron string into a string in the format of HH:MM<AM/PM>
     * @param {string} cronStr The cron string to convert
     * @returns A string representation of the given cron string in the format HH:MM<AM/PM>
     */
    cronToTimeStr(cronStr) {
        const cronSplit = cronStr.split(' ')
        let output = ''
        let isPM = true

        // hour
        if(cronSplit[1] === '0') {
            isPM = false
            output += '12:'
        } else if(parseInt(cronSplit[1]) > 12) {
            isPM = true
            output += `${parseInt(cronSplit[1]) - 12}:`
        } else {
            if (cronSplit[1] === '12') isPM = true
            else isPM = false
            output += `${cronSplit[1]}:`
        }

        // minute
        output += cronSplit[0]

        // Time of Day
        if (isPM) output += 'PM'
        else output += 'AM'

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
     * @param {Message | Interaction} element The Discord Message / Interaction object
     * @param {Collection} collection The MongoDB Collection object
     * @param {string} jobName The name of the job you wish to delete
     * @returns true if a job is deleted, false otherwise
     */
    async deleteCronJob(element, collection, jobName) {
        let index = undefined
        for (let i = 0; i < element.client.cronJobs.length; ++i) {
            const job = element.client.cronJobs[i]
            if (job.channel === element.channel.id && job.job === jobName) {
                index = i
                job.cronJob.stop()
                await collection.deleteOne({ _id: job.id })
                break
            }
        } if (index) element.client.cronJobs.splice(index, 1)

        return index != undefined
    },

    /**
     * Will convert an xlsx file into a csv file
     * @param {fs.PathLike} csvPath Path to the csv file to create
     * @param {fs.PathLike} dirPath Path to the directory the xlsx file is stored in
     */
    xlsxToCsv(csvPath, dirPath) {
        const fs = require('node:fs')
        const path = require('node:path')
        const xlsx = require('node-xlsx')

        const xlPath = path.join(dirPath, 'temp.xlsx')
        const xl = xlsx.parse(xlPath)[0].data

        let csv = ''
        for (const row of xl) csv += row.join(',') + '\n'

        fs.writeFileSync(csvPath, csv.trim())
    },

    /**
     * Downloads a file from the given url and saves it to the file passed in the destination parameter
     * @param {string} url the url to download from
     * @param {fs.PathLike} destination the destination file to save the downloaded data
     * @param {Function} callback the callback function to call once the download finishes
     */
    download(url, destination, callback) {
        const fs = require('node:fs')
        const path = require('node:path')
        const https = require('https')

        const file = fs.createWriteStream(destination)
            https.get(url, response => {
                response.pipe(file)
                file.on('finish', () => {
                    file.close(callback)
            })
        })
    }
}