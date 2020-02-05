const getIdSchema = function (modelo, campo) {

    return new Promise((resolver, rechazar)=>{

        modelo.updateOne({ _id: campo},{ $inc: { seq: 1} }, function(err, numberAffected, rawResponse) {          
            console.log(numberAffected)            
            resolver(modelo.find({ _id: campo})) 
            return modelo.find({ _id: campo})
         })

    })


}

module.exports = {getIdSchema}