const { SlashCommandBuilder, Collection } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')
const { DATABASEERRORMESSAGE } = require('../utils/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('update')
        .setDescription('Update Slash Commands'),
    async execute(interaction) {
        // only let the set admin run this command
        if(interaction.user.id === process.env.ADMIN) {
            try {
                const { deployCommands } = require('../utils/helpers')
                await deployCommands()

                interaction.client.commands = new Collection()

                const commandsPath = path.join(__dirname, '..', 'commands')
                const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

                for(const file of commandFiles) {
                    const filePath = path.join(commandsPath, file)
                    const command = require(filePath)
                    interaction.client.commands.set(command.data.name, command)
                }

                if(interaction.client.builtInMessages) {
                    await interaction.reply(interaction.client.builtInMessages.succ + '  cess')
                } else {
                    await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
                }
            } catch(error) {
                console.error('Error: ', error)
                await interaction.reply('There was an error when trying to update the commands')
            }
        }
    },
}