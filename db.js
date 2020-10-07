const db = require('mongoose')
const chalk = require('chalk')

//prueba
// mongodb+srv://user-mbd:<password>@cluster0-qmwio.gcp.mongodb.net/test

db.Promise = global.Promise

async function connect(url) {

    db.connect(url, {
        useCreateIndex: true,
        useNewUrlParser: true, useUnifiedTopology: true
    })
    console.log('[DB] Conectada con éxito a: ' + chalk.bgWhite.black(url))

    //console.log(db.models)
    //console.log(db.version)

}

module.exports = {
    connect
}