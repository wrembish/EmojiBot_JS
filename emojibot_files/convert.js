module.exports = {
    execute(aString) {
        const conversionMap = require('./conversionMap.json')
        aString = aString.toUpperCase()
        let output = ''
        for(const c of aString.split('')) {
            if(c === ' ') output += '    '
            else output += conversionMap[c][Math.floor(Math.random() * conversionMap[c].length)] + ' '
        }
        return output
    },
}