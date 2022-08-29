const { INTERACTIONERRORMESSAGE } = require('../utils/constants.js')

module.exports = {
    name : 'interactionCreate',
    async execute(interaction) {
        if(!interaction.isCommand() && !interaction.isModalSubmit()) return
        
        if(interaction.isCommand()) {
            const command = interaction.client.commands.get(interaction.commandName)
            const guildCommand = interaction.client.guildCommands.get(interaction.commandName)

            if(command) {
                try {
                    await command.execute(interaction)
                } catch(error) {
                    console.error('Error: ', error)
                    await interaction.reply({ content : INTERACTIONERRORMESSAGE, ephemeral : true })
                }
            } else if(guildCommand) {
                try {
                    await guildCommand.execute(interaction)
                } catch(error) {
                    console.error('Error: ', error)
                    await interaction.reply({ content : INTERACTIONERRORMESSAGE, ephemeral : true })
                }
            }
        } else if(interaction.isModalSubmit()) {
            const modalHandler = interaction.client.modalHandlers.get(interaction.customId)
            if(modalHandler) {
                try {
                    await modalHandler.execute(interaction)
                } catch(error) {
                    console.error('Error: ', error)
                    await interaction.reply({ content : INTERACTIONERRORMESSAGE, ephemeral : true })
                }
            }
        }
    },
}