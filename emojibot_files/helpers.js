const fs = require('node:fs')
const path = require('node:path')
const { REST } = require('discord.js')
const { Routes } = require('discord-api-types/v10')

module.exports = {
    async deployCommands(guildId) {
        const commands = []
        const commandsPath = path.join(__dirname, '..', 'commands')
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

        for(const file of commandFiles) {
            const filePath = path.join(commandsPath, file)
            const command = require(filePath)
            commands.push(command.data.toJSON())
        }

        const rest = new REST({ version : '10' }).setToken(process.env.TOKEN)
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), { body : commands })
            .then(() => console.log(`Successfully registered application commands for guild Id ${guildId}!`))
            .catch((error) => { console.error('Error: ', error) })
    }
}