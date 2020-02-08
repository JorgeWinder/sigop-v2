const chalk = require('chalk')

exports.success = function(req, res, mensaje, status){
    res.status(status || 200).send({
        error: '',
        body: mensaje
        })
}

exports.error = function(req, res, mensaje, status, details){
    console.error(chalk.bgRed.black('[Response error] ' + details))
    res.status(status || 500).send({
        error: mensaje,
        body: ''
        })

}