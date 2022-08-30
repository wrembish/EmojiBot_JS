/**
 * File to store any constants that might be used across multiple files
 * Makes it easier to change across the entire program if a constant needs to be updated
 */

module.exports = {
    // MongoDB constants
    MONGODATABASE : 'EmojiBot',
    MAPCOLLECTION : 'Conversion',
    MESSAGESCOLLECTION : 'BuiltInMessage',
    CRONCOLLECTION : 'CronJob',
    POINTSCOLLECTION : 'Points',
    BUGSCOLLECTION : 'Bugs',
    DMCOLLECTION : 'dms',
    SUGGESTCOLLECTION : 'Suggestion',
    // Command constants
    COMMANDCHAR : '!!',
    EMOJI: '!emoji',
    // Cron Job constants
    DOGFACT : 'dogfacts',
    CATFACT : 'catfacts',
    REMINDER : 'reminder',
    // Error Message constants
    DATABASEERRORMESSAGE : 'There was a problem connecting to the database. Please contact an administrator.',
    INTERACTIONERRORMESSAGE : 'There was an error while executing this command!',
    // Other constants
    EMBEDCOLOR : 'LuminousVividPink',
    INVITEURL : 'https://www.tinyurl.com/emojiBot',
    WEEKDAYS : {
        'sunday' : 0, 'sun' : 0, '0' : 0, '7' : 0,
        'monday' : 1, 'mon' : 1, '1' : 1,
        'tuesday' : 2, 'tues' : 2, '2' : 2,
        'wednesday' : 3, 'wed' : 3, '3' : 3,
        'thursday' : 4, 'thurs' : 4, '4' : 4,
        'friday' : 5, 'fri' : 5, '5' : 5,
        'saturday' : 6, 'sat' : 6, '6' : 6,
        'everyday' : '*', 'every day' : '*', 'every' : '*', 'all' : '*', 'all days' : '*', '*' : '*'
    },
    // New Command constants
    NEWCOMMAND :
        'const { SlashCommandBuilder } = require("discord.js")\n\n' +
        'module.exports = {\n' +
        `    guildId : "guildIdStr",\n` +
        '    data : new SlashCommandBuilder()\n' +
        `        .setName("nameStr")\n` +
        `        .setDescription("descriptionStr"),\n\n` +
        '    async execute(interaction) {\n' +
        `        await interaction.reply("replyStr")\n` +
        '    }\n' +
        '}'
}