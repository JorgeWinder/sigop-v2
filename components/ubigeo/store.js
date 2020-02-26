const model = require('./model')

// Listar prodcutos //

async function listUbigeo(by, idDepartamento, idProvincia){

    return new Promise(async (resolver, rechazar)=>{

        let filter = {}

        if(by == "departamento"){

            /*

            model.find({}).sort({nombreDepartamento: 1}).distinct('departamentoId', function(error, ids) {
                // ids is an array of all ObjectIds
                //console.log(ids)

                //resolver(model.find({ "departamentoId": { "$in": ids } }))

            });

        
            model.aggregate()
                .group({
                    "_id": "$departamentoId",
                    "Categories": { "$addToSet": "$nombreDepartamento" }
                })

            */
/*
            model.aggregate([{
                $group: {
                    _id: "$departamentoId"
                }
            },
            {
                $project: {
                    _id: "$departamentoId",
                    name: "$nombreDepartamento",
                    rating: 1,
                    tags: 1
                }
            }])

            */

           model.aggregate().group({
            "_id": "$departamentoId",
            "nom": { $first: "$nombreDepartamento" }
            }).project({
                nombre: "$nom"
            })
            .sort({"nombre": 1})
            .exec(function (err, result){
                if (err) { /* Handle error */};
                //console.log(JSON.stringify(result, null, 4));
                resolver(result)
            });

        }

        if(by == "provincia"){


            model.aggregate()
                .match(
                    { "departamentoId": { $in: [parseInt(idDepartamento)] } }
                )
                .group({           
                "_id": "$provinciaId",
                "nombre": { $first: "$nombreProvincia" },
                "Departamento": { $first: "$nombreDepartamento" }
                })
                .exec(function (err, result){
                    if (err) { /* Handle error */};
                    resolver(result)
                });
        }

        if(by == "distrito"){

            
            model.aggregate()
                .match(
                    { "provinciaId": { $in: [parseInt(idProvincia)] } , "departamentoId": { $in: [parseInt(idDepartamento)] }  }
                )
                .group({
                "_id": "$_id",
                "Distrito": { $first: "$nombreDistrito" },
                "Provincia": { $first: "$nombreProvincia" },
                "departamento": { $first: "$nombreDepartamento" },
                })
                .exec(function (err, result){
                    if (err) { /* Handle error */};
                    resolver(result)
                });

        }

        

    })

}


module.exports = {
    list: listUbigeo
}
