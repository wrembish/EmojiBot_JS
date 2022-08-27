const { COMMANDCHAR, EMOJI } = require('./constants.js')

module.exports = {
    FEATURESHEADER : '**__Features List__**',
    FEATURESLIST : 
        `\`\`\`- Convert Message to Emojis : "${EMOJI} <message>"\n` +
        '- Some built in message responses : \n' +
        '    - if the message contains "/grit"\n' +
        '    - if the message contains the word "suck"\n' +
        '    - if the message contains "69" or "420"\n' +
        '    - if the message contains "/oof" or "/bigoof"\n' +
        '- Any of the listed slash commands\n' +
        '- Schedulable messages : \n' +
        `    - "${COMMANDCHAR}set channel <dogfacts/catfacts> Time(HH:MM<AM/PM>)"\n` +
        `    - "${COMMANDCHAR}remove channel <dogfacts/catfacts>"\n` +
        '- Gambling : \n' +
        `    - "${COMMANDCHAR}gamble <number>"\n` +
        `    - "${COMMANDCHAR}give <@mention> <number>"\n` +
        `    - "${COMMANDCHAR}give <number> <@mention>"\`\`\``,
    REPORTBUG : `** *To Report a bug, use "${COMMANDCHAR}report bug : <bug description>"* **`
}