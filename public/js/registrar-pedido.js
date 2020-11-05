
document.addEventListener('DOMContentLoaded', function () {

    (async function Load() {

        const elems = document.querySelectorAll('.modal')
        const instanceModal = M.Modal.init(elems)

        // funciones

        async function ListarClientes(){

            const {body: clientes} = await getData("./cliente")

            console.log(clientes)


                // let objDatos = {}
            let objDatos = new Object()

            clientes.forEach(element => {
                objDatos[`${element._id} - ${element.nombre}`] = null
            });


            const elems = document.querySelectorAll('.autocomplete');
            const instances = M.Autocomplete.init(elems, {
                data: objDatos
            });




        }

        // eventos

        // document.querySelector("#search-cliente").addEventListener('input', function (e) {
        //     console.log(this.value)
        // })

        
        // --------------------- ///

        ListarClientes()

        

    })()
})

