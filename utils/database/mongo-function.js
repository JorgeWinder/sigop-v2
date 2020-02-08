
const modelCounter = require('../../components/counter/model')
const _id = 0


const getIdSchema = function (campo) {

    return new Promise((resolver, rechazar)=>{

        modelCounter.updateOne({ _id: campo},{ $inc: { seq: 1} }, function(err, numberAffected, rawResponse) {          
            //console.log(modelCounter.find({ _id: campo}))            
            resolver(modelCounter.find({ _id: campo})) 
         })

    })


}

module.exports = {
    getIdSchema,
    _id
}