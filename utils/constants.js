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
    // Command constants
    COMMANDCHAR : '!!',
    EMOJI: '!emoji',
    // Error Message constants
    DATABASEERRORMESSAGE : 'There was a problem connecting to the database. Please contact an administrator.',
    INTERACTIONERRORMESSAGE : 'There was an error while executing this command!',
    // Other constants
    EMBEDCOLOR : 'LuminousVividPink'
}