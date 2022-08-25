const { EmbedBuilder } = require('discord.js')
const { EMBEDCOLOR } = require('./constants')

module.exports = {
    async convert(map, str) {
        let output = ''
        for(const c of str.split('')) {
            if(c === ' ') output += '     '
            else output += map[c.toUpperCase()][Math.floor(Math.random() * map[c.toUpperCase()].length)] + ' '
        }

        return output
    },
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

    buildCronStr(timeStr) {
        let output = ''
        const timeOfDay = timeStr.endsWith('AM') ? 'AM' : 'PM'
        const timeSplit = timeStr.substring(0, timeStr.length-2).split(':')

        output += timeSplit[1] + ' '

        if(timeSplit[0] == '12' && timeOfDay == 'AM') output += '0 '
        else if(timeSplit[0] == '12' && timeOfDay == 'PM') output += '12 '
        else if(timeOfDay == 'PM') output += (12 + parseInt(timeSplit[0])).toString() + ' '
        else output += timeSplit[0] + ' '

        output += '* * *'

        return output
    },

    async getDogFactsEmbed() {
        let factResult
        await fetch('http://dog-api.kinduff.com/api/facts')
            .then(response => response.json())
            .then(data => factResult = data)
            .catch(error => console.error('Error: ', error))

        let imageResult
        await fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => imageResult = data)
            .catch(error => console.error('Error: ', error))

        const messageEmbed = new EmbedBuilder()
            .setTitle('**__Daily Dog Fact__**')
            .setDescription(factResult.facts[0])
            .setColor(EMBEDCOLOR)
            .setImage(imageResult.message)

        return messageEmbed
    },

    async getCatFactsEmbed() {
        let factResult
        await fetch('https://meowfacts.herokuapp.com/')
            .then(response => response.json())
            .then(data => factResult = data)
            .catch(error => console.error('Error: ', error))

        let imageResult
        await fetch('https://cataas.com/cat?json=true')
            .then(response => response.json())
            .then(data => imageResult = data)
            .catch(error => console.error('Error: ', error))

        const messageEmbed = new EmbedBuilder()
            .setTitle('**__Daily Cat Fact__**')
            .setDescription(factResult.data[0])
            .setColor(EMBEDCOLOR)
            .setImage(`https://cataas.com${imageResult.url}`)

        return messageEmbed
    },

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