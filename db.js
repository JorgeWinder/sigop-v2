const db = require('mongoose')
const chalk = require('chalk')

// mongodb+srv://user-mbd:<password>@cluster0-qmwio.gcp.mongodb.net/test

db.Promise = global.Promise

async function connect(url){
    
    db.connect(url, {
    useNewUrlParser: true, useUnifiedTopology: true
    })
    console.log('[DB] Conectada con éxito a: ' +  chalk.bgWhite.black(url))
}

module.exports = {
    connect
}