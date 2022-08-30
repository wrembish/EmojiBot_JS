const { INTERACTIONERRORMESSAGE } = require('../utils/constants.js')

module.exports = {
    name : 'interactionCreate',
    async execute(interaction) {
        // Ignore non Commands and non Modal Submit interactions
        if(!interaction.isCommand() && !interaction.isModalSubmit()) return
        
        // If the interaction is a Command
        if(interaction.isCommand()) {
            // Check if it is a global or guild Command
            const command = interaction.client.commands.get(interaction.commandName)
            const guildCommand = interaction.client.guildCommands.get(interaction.commandName)

            // If it is a Global Command
            if(command) {
                try {
                    // Try to execute the command
                    await command.execute(interaction)
                } catch(error) {
                    // If there is an error, log it to the console and notify the user
                    console.error('Error: ', error)
                    await interaction.reply({ content : INTERACTIONERRORMESSAGE, ephemeral : true })
                }
            } 
            // If it is a Guild Command
            else if(guildCommand) {
                try {
                    // Try to execute the command
                    await guildCommand.execute(interaction)
                } catch(error) {
                    // If there is an error, log it to the console and notify the user
                    console.error('Error: ', error)
                    await interaction.reply({ content : INTERACTIONERRORMESSAGE, ephemeral : true })
                }
            }
        } 
        // If the interaction is a Modal Submit
        else if(interaction.isModalSubmit()) {
            // Check to see if there is a handler for the Modal type that was submitted
            const modalHandler = interaction.client.modalHandlers.get(interaction.customId)

            // If there is a handler
            if(modalHandler) {
                try {
                    // Attempt to execute the handler
                    await modalHandler.execute(interaction)
                } catch(error) {
                    // If there is an error, log it to the console and notify the user
                    console.error('Error: ', error)
                    await interaction.reply({ content : INTERACTIONERRORMESSAGE, ephemeral : true })
                }
            }
        }
    },
}