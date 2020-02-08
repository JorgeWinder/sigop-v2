const express = require('express')
const app = express()
const server = require('http').Server(app)

const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const socket = require('./socket')
const cors = require('cors')
const db = require('./db')


const router = require('./network/routers')
const router_vista = require('./network/routers_vista')
const config = require('./config').config

db.connect(config.DB_URI)

app.use(cors({
    origin: 'http://localhost:3000',
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// ----Definir motor de plantillas----//

app.engine( 'html', hbs( {
  extname: '.html',
  //defaultView: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', 'html');

//------------------------------------//

socket.connect(server)
router(app)
router_vista(app)

app.use('/app', express.static('public'))

server.listen(config.PORT, function(){
    console.log(`Servidor NodeJS en escucha en ${config.HOST}:${config.PORT}`)
})
