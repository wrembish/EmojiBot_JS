const { COMMANDCHAR, EMOJI, INVITEURL, DOGFACT, CATFACT } = require('./constants.js')

module.exports = {
    // Some constants for quickly updating the Features List that is returned in the /features command
    FEATURESHEADER : '**__Features List__**',
    FEATURESLIST : '```' + 
        `- Convert Message to Emojis : "${EMOJI} <message>"\n` +
        '- Some built in message responses : \n' +
        '    - if the message contains "/grit"\n' +
        '    - if the message contains the word "suck"\n' +
        '    - if the message contains "69" or "420"\n' +
        '    - if the message contains "/oof" or "/bigoof"\n' +
        '- Any of the listed slash commands\n' +
        '- Schedulable messages : \n' +
        `    - "${COMMANDCHAR}set channel <${DOGFACT}/${CATFACT}> Time(HH:MM<AM/PM>)"\n` +
        `    - "${COMMANDCHAR}remove channel <${DOGFACT}/${CATFACT}>"\n` +
        '- Gambling : \n' +
        `    - "${COMMANDCHAR}gamble <number>"\n` +
        `    - "${COMMANDCHAR}give <@mention> <number>"\n` +
        `    - "${COMMANDCHAR}give <number> <@mention>"\n` +
        `- ${COMMANDCHAR}new command : {"name":"<command name>", "description":"<description>","reply":"<bot response>"}\n` +
        '    - Will create a new command for your server' +
        '```\n\n' +
        `**To add me to your own server, you can use this link ${INVITEURL} **`,
    REPORTBUG : `** *To Report a bug, use "${COMMANDCHAR}report bug : <bug description>"* **`
}