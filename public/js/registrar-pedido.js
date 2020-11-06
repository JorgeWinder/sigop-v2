document.addEventListener('DOMContentLoaded', function () {

    (async function Load() {

        const elems = document.querySelectorAll('.modal')
        const instanceModal = M.Modal.init(elems)

        //=====Funciones====//

        async function listarClientes() {

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
        
    
        async function listarProductos(){
            const { body :productos } = await getData("./producto")
            console.log(productos)
        
            const objProducto = new Object();

            productos.forEach( producto => {
                objProducto[`${producto._id} - ${producto.nombre_producto}`] = null
            })

            const elems = document.getElementById('producto');
            const instances = M.Autocomplete.init(elems, {
                data: objProducto,
                onAutocomplete: function(itemSelect) {
                    const idProducto = itemSelect.split('-')[0].trim()
                    getProductAndSetMaxPrice(idProducto)
                },
                limit:5,
            }); 
            
        }

        async function getProductAndSetMaxPrice(idProducto){
            const { body: {0 : producto}} = await getData('../producto?id=' + idProducto)
            document.querySelector('#precio').value = producto.precioMax
        }

        async function _getMinimumPrice() {
            const selectedProduct = document.getElementById('producto').value;
            const idProducto = selectedProduct.split('-')[0].trim();
            const { body: {0 : producto}} = await getData('../producto?id=' + idProducto)
            return producto.precioMin;
        }

        const price = document.querySelector('#precio');

        price.addEventListener('change', async function(e) {
            const inputPrice = e.target.value;
            const minPrice = await _getMinimumPrice()
            console.log('minPrice', minPrice)
            _alertIfLowerThan(inputPrice, minPrice);
        })

        function _alertIfLowerThan(numberToCheck, minPrice) {
            if (numberToCheck < minPrice) {
                Swal.fire({
                    title: `Precio mínimo: S/${minPrice}`,
                    icon: 'warning'
                })
            }
        }
       
    
        //===Calculating Total Price===//

        const cantidad = document.getElementById('cantidad');
        const pUnit = document.getElementById('precio');
        const precioTotal = document.getElementById('precioTotal');

        cantidad.addEventListener('change', (e) => {
            const total = getTotalPrice(cantidad.value, pUnit.value)
            console.log(total)
            precioTotal.value = total
        })


        pUnit.addEventListener('change', (e) => {
            const total = getTotalPrice(cantidad.value, pUnit.value)
            console.log(total)
            precioTotal.value = total
        })

       const getTotalPrice = (cantidad, precio) => {
           return cantidad * precio
       }

        //===Adding Detalle de Pedido===//

        const addPedido = document.getElementById('agregar-producto')
        
        addPedido.addEventListener( 'click', (e) => {
            console.log('clicked')
           
            
        })

        //=====Calling Functions====//

        listarClientes()
        listarProductos()
       

    })()

 
})



