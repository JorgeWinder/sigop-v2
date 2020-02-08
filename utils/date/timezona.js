
const moment = require('moment-timezone');
const DateLima = moment.tz(Date.now(), "America/Lima")._d;

module.exports = {
    DateLima
}

//console.log(DateLima);