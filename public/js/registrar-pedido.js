
document.addEventListener('DOMContentLoaded', function () {

    (async function Load() {

        const elems = document.querySelectorAll('.modal')
        const instanceModal = M.Modal.init(elems)

        //=====Funciones====//

        async function ListarClientes() {

            const { body: clientes } = await getData("./cliente")
            
            let objDatos = new Object()

            clientes.forEach(element => {
                objDatos[`${element._id} - ${element.nombre}`] = null
            });

            const elems = document.getElementById('search-client');
            const instances = M.Autocomplete.init(elems, {
                data: objDatos,
                onAutocomplete: function (itemSelect) {
                    const idCliente = itemSelect.split('-')[0].trim()

                    getCliente(idCliente)
                    document.getElementById('search-client').value = ''
                    M.Modal.getInstance(document.querySelector('.modal')).close()
                }

            });
        }

        async function getCliente(idCliente){
            const { body: {0 : cliente}} = await getData('../cliente?id=' + idCliente)
            document.querySelector('#cliente').value = cliente.nombre
        }
        
       

        async function ListarProductos(){
            const { body :productos } = await getData("./producto")
            console.log(productos)
        
            let objProducto = new Object();

            productos.forEach( producto => {
                objProducto[`${producto._id} - ${producto.nombre_producto}`] = null
            })

            const elems = document.getElementById('producto');
            const instances = M.Autocomplete.init(elems, {
                data: objProducto,
                onAutocomplete: function(itemSelect) {
                    const idProducto = itemSelect.split('-')[0].trim()
                    getProduct(idProducto)
                },
                limit:5,
            }); 
        }

        async function getProduct(idProducto){
            const { body: {0 : producto}} = await getData('../producto?id=' + idProducto)
            document.querySelector('#precio').value = producto.precioMax
        }

       

        //=====Calling Functions====//

        ListarClientes()
        ListarProductos()

    })()

    
})


const calculateTotalPrice = (cantidad, precio, descuento) => {
    return ((precio * descuento) / 100) * cantidad
}