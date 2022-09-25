const { COMMANDCHAR, EMOJI, INVITEURL, DOGFACT, CATFACT } = require('./constants.js')

module.exports = {
    // Some constants for quickly updating the Features List that is returned in the /features command
    FEATURESHEADER : '**__Features List__**',
    FEATURESLIST : '```' +
        '- Any of the listed slash commands\n' +
        `- Convert Message to Emojis : "${EMOJI} <message>"\n` +
        '- Some built in message responses : \n' +
        '    - if the message contains "/grit"\n' +
        '    - if the message contains the word "suck"\n' +
        '    - if the message contains "69" or "420"\n' +
        '    - if the message contains "/oof" or "/bigoof"\n' +
        '- Gambling : \n' +
        `    - "${COMMANDCHAR}gamble <number>"\n` +
        `    - "${COMMANDCHAR}give <@mention> <number>"\n` +
        `    - "${COMMANDCHAR}give <number> <@mention>"\n` +
        `- !!xlsx2csv : upload an xlsx file along with this command to convert it to a csv file\n` + 
        '```\n\n' +
        `**To add me to your own server, you can use this link ${INVITEURL} **`,
    REPORTBUG : `** *To Report a bug, use /report-bug !* **\n` +
                `** *To Suggest new Features use /suggest-feature !* **`
}