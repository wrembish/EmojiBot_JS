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
        else if(timeOfDay ==  'PM') output += (12 + parseInt(timeSplit[0])).toString() + ' '
        else output += timeSplit[0] + ' '

        output += '* * *'

        return output
    }
}