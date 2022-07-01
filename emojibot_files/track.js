const fs = require('node:fs')
const path = require('node:path')

module.exports = {
    execute(message) {
        let history = require('./historyTracker.json')
        const author = message.author.id
        if(history.hasOwnProperty(author)) {
            history[author].messages.push(message.content)
        } else {
            history[author] = {
                user_tag : message.author.tag,
                messages : [message.content]
            }
        }

        try {
            const savePath = path.join(__dirname, 'historyTracker.json')
            fs.writeFileSync(savePath, JSON.stringify(history))
        } catch(error) {
            console.error
        }
    }
}