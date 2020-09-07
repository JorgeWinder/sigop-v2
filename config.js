/* 
Habilitar referencia 'dotenv'
para el uso de variables de entorno de producción en el proyecto.
Variables deben estar en el archivo .env
*/

require('dotenv').config()
const DateLima = require('./utils/date/timezona').DateLima

const config = {
    DB_URI: process.env.DB_URI || 'mongodb://UserSigop:235411@35.222.212.19/SIGOP', //'mongodb+srv://user-mbd:92kTFt6OQqlKe1Gu@cluster0-qmwio.gcp.mongodb.net/sigop', //'mongodb://104.154.83.252:27017/SIGOP', //'mongodb+srv://user-mbd:92kTFt6OQqlKe1Gu@cluster0-qmwio.gcp.mongodb.net/telegrom',
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'http://localhost',
    DATE: DateLima
}

module.exports = {
    config
}