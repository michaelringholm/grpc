const client = require('./client')
client.list({}, (error, persons) => {
    if (!error) {
        console.log('successfully fetched persons')
        console.log(persons)
    } else {
        console.error(error)
    }
})