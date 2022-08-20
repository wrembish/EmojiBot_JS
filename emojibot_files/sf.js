module.exports = {
    async checkAuth(sf) {
        const response = await this.query(sf, 'SELECT+Id+FROM+Lead+LIMIT+1')
        if(!response || !response.totalSize) {
            await fetch('https://login.salesforce.com/services/oauth2/token', {
                method  : 'POST',
                headers : { 'Content-Type' : 'application/x-www-form-urlencoded', },
                body    :
                    'grant_type=password' +
                    `&client_id=${process.env.SF_CONSUMER_KEY}` +
                    `&client_secret=${process.env.SF_CONSUMER_SECRET}` +
                    `&username=${process.env.SF_USERNAME}` +
                    `&password=${process.env.SF_PASSWORD}${process.env.SF_SECURITY_TOKEN}`
            })  .then(response => response.json())
                .then(data => {
                    console.log('Successfully Connected to Salesforce!')
                    sf = data
                })
                .catch(error => { console.error('Error: ', error) }) 
        }
        return sf
    },
    async query(sf, queryStr) {
        let result
        await fetch(`${sf.instance_url}/services/data/v54.0/query/?q=${queryStr}`, {
            method  : 'GET',
            headers : {
                'Content-Type'  : 'application.json',
                'Authorization' : `${sf.token_type} ${sf.access_token}`
            }
        })  .then(response => response.json())
            .then(data => { result = data })
            .catch(error => console.error('Error: ', error))
        return result
    },
    async insert(sf, object, body) {
        let result
        await fetch(`${sf.instance_url}/services/data/v54.0/sobjects/${object}`, {
            method  : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `${sf.token_type} ${sf.access_token}`
            },
            body    : JSON.stringify(body)
        })  .then(response => response.json())
            .then(data => result = data)
            .catch(error => console.error('Error: ', error))
        return result
    },
    async doPost(sf, endpoint, body) {
        let result
        await fetch(`${sf.instance_url}/${endpoint}`, {
            method  : 'POST',
            headers : {
                'Content-Type'  : 'application/json',
                'Authorization' : `${sf.token_type} ${sf.access_token}`
            },
            body    : JSON.stringify(body)
        })  .then(response => response.json())
            .then(data => result = data)
            .catch(error => console.error('Error: ', error))

        return result
    }
}