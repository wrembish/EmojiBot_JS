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
        if(process.env.ADMINS.split(',').includes(interaction.user.id)) {
            try {
                // Attemp to deploy the commands
                const { deployCommands } = require('../utils/helpers')
                await deployCommands()

                // Reset the slash commands tracked on the client
                interaction.client.commands = new Collection()

                const commandsPath = path.join(__dirname, '..', 'commands')
                const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

                for(const file of commandFiles) {
                    const filePath = path.join(commandsPath, file)
                    const command = require(filePath)
                    interaction.client.commands.set(command.data.name, command)
                }

                // Notify the user that the update was successful
                if(interaction.client.builtInMessages) {
                    await interaction.reply(interaction.client.builtInMessages.succ + '  cess')
                } else {
                    await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
                }
            } catch(error) {
                // If there is an error, log it to the console and notify the user
                console.error('Error: ', error)
                await interaction.reply('There was an error when trying to update the commands')
            }
        }
    },
}