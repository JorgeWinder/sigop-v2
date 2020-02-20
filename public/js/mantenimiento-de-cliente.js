
document.addEventListener('DOMContentLoaded', function(){

    (async function Load(){

        var elemsColl = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elemsColl);

        // ************* Funciones *********** //

        async function CargarTipoCliente(){

            const {body: lista} = await getData('./tipocliente')

            lista.forEach(element => {
                document.querySelector(`#tipoCliente`).innerHTML = document.querySelector(`#tipoCliente`).innerHTML + `<option value="${element._id}">${element.nombre}</option>`
            });

        } 


        async function CargarDepartamento(){

            const {body: lista} = await getData('./ubigeo/departamento')

            lista.forEach(element => {
                document.querySelector(`#departamento`).innerHTML = document.querySelector(`#departamento`).innerHTML + `<option value="${element._id}">${element.nombre}</option>`
            });

        } 



        // ************* Eventos *********** //



        // ************* ******* *********** //

        CargarTipoCliente()
        CargarDepartamento()

    })()
  
});


