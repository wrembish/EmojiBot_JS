require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')
const { REST } = require('discord.js')
const { Routes } = require('discord-api-types/v10')

const commands = []
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    commands.push(command.data.toJSON())
}

const rest = new REST({ version : '10' }).setToken(process.env.TOKEN)

rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body : commands })
    .then(() => console.log('Successfully registered global application commands!'))
    .catch(error => console.error('Error: ', error))


try {
    let guildCommands
    const guildDirPath = path.join(__dirname, 'guildCommands')
    const guildCommDirs = fs.readdirSync(guildDirPath)
    let guildId
    for(const dir of guildCommDirs) {
        const dirPath = path.join(guildDirPath, dir)
        guildCommands = []
        const guildCommFiles = fs.readdirSync(dirPath).filter(file => file.endsWith('.js'))

        for(const file of guildCommFiles) {
            const filePath = path.join(dirPath, file)
            const command = require(filePath)
            guildId = command.guildId
            guildCommands.push(command.data.toJSON())
        }

        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), { body : guildCommands })
            .then(() => console.log(`Sucessfully registered application commands for Guild Id ${guildId}`))
            .catch(error => console.error('Error: ', error))
    }
} catch(error) {
    console.error('Error: ', error)
}