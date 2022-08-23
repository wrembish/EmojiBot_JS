const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { EMBEDCOLOR } = require('../emojibot_files/constants')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('recipe')
        .setDescription('Get a random recipe recommendation'),
    async execute(interaction) {
        let result
        await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(response => response.json())
            .then(data => result = data)
            .catch(error => console.error('Error: ', error))

        if(!result.meals || result.meals.length === 0) {
            await interaction.reply({ content : 'Something went wrong', ephemeral : true })
            console.error('Error: ', result)
            return
        }

        const recipe = result.meals[0]
        const replyContent = `**${interaction.user} Why not give this recipe a try?**`

        let embedDescription = '**__Ingredient List__**\n'
        for(let i = 0; i < 20; ++i) {
            if(recipe[`strIngredient${i+1}`]) {
                embedDescription += recipe[`strIngredient${i+1}`]
                if(recipe[`strMeasure${i+1}`]) embedDescription += ` : ${recipe[`strMeasure${i+1}`]}\n`
                else embedDescription += '\n'
            } else break
        }
        embedDescription += `\n**__Instructions__**\n${recipe.strInstructions}`

        const replyEmbed = new EmbedBuilder()
            .setTitle(`**${recipe.strMeal}**`)
            .setImage(recipe.strMealThumb)
            .setColor(EMBEDCOLOR)
            .setDescription(embedDescription)

        await interaction.reply({ content : replyContent, embeds : [replyEmbed] })
    }
}