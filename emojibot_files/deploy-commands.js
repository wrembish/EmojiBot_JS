const fs = require('node:fs')
const path = require('node:path')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { guildIds } = require('./guildIds.json')

module.exports = {
    execute(clientId) {
        if(fs && path && REST && Routes && guildIds && guildIds.length != 0) {
            if(guildIds.length <= 0) return
            const commands = []
            const commandsPath = path.join(__dirname, '..', 'commands')
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

            for(const file of commandFiles) {
                const filePath = path.join(commandsPath, file)
                const command = require(filePath)
                commands.push(command.data.toJSON())
            }

            for(const guildId of guildIds) {
                const rest = new REST({ version : '9' }).setToken(process.env.TOKEN)
                rest.put(Routes.applicationGuildCommands(clientId, guildId), { body : commands })
                    .then(() => console.log(`Successfully registered application commands for guild Id ${guildId}!`))
                    .catch((error) => { console.error('Error: ', error) })
            }
        } else {
            console.log('No guilds to deploy commands to')
        }
    }
}