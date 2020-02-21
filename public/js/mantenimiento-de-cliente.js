
document.addEventListener('DOMContentLoaded', function(){

    (async function Load(){
        
        const elems = document.querySelectorAll('.modal');
        const instanceModal = M.Modal.init(elems);

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

        async function ListarCliente(){


            let objdata = new Object()

            const { body: lista } = await getData('./cliente')
            console.log(lista)
            
            lista.forEach(element => {
              objdata[`${element._id.toString()} - ${element.nombre}`] = null
            });
            


            const elems = document.querySelectorAll('.autocomplete')
            
            const instance = M.Autocomplete.init(elems, { 
                data: objdata,
                onAutocomplete: function(itemSelect) {
                    alert(itemSelect.split('-')[0].trim());
                    //const idProducto = itemSelect.split('-')[0].trim()

                    // getProducto(idProducto)
                    // document.querySelector('#idProducto').value = idProducto
                    // document.querySelector('#nombre_producto_busqueda').value = ''
                    // M.Modal.getInstance(document.querySelector('.modal')).close()
                    
                }
            });

            M.toast({html: 'Lista de clientes cargados'})

        }

        // ************* Eventos *********** //


        // var regex = new RegExp("/^.{8}/");
        //     if(regex.test(input)) {
        //         alert("true");
        //     }else {
        //         alert("false");
        //         return false;
        //     }


        
            //     const regex = new RegExp("/^.{8}/")
            //     if(regex.test(document.querySelector("#nro_doc").value)) {
            //         alert("true");
            //     }

            // var regex = /^.{2}$/
            // alert(document.querySelector("#nro_doc").value.search(regex))

        // Botón nuevo //

        document.querySelector("#nuevo").addEventListener('click', function(){
            document.querySelector("form").reset()
            document.querySelectorAll("input").forEach(element => {
              element.focus()
            })

            document.querySelector("#registrar").disabled = false 
            document.querySelector("#actulizar").disabled = true 
            document.querySelector("#eliminar").disabled = true

            document.querySelector('#nro_doc').value = ''
            
        })


        // Botón registrar //

        const $data = document.querySelector("form");
  
        document.querySelector(`#registrar`).addEventListener("click", async function(e){
            
            const form = new FormData($data)

            for (const key of form.keys()) {            
              console.log(`${key} -> ${form.get(key)}`)
            }

            const respuesta = await postData("./cliente", form)
            
            Swal.fire({
              icon: 'success',
              title: 'Todo bien',
              text: `Cliente ${respuesta.body._id} - ${respuesta.body.nombre}, registrado`
            })

            document.querySelector("#registrar").disabled = true 
            document.querySelector("#actulizar").disabled = false 
            document.querySelector("#eliminar").disabled = false 
            
            //console.log(respuesta)
            //ListarProductos()
    
        });




        document.querySelector(`#nro_doc`).addEventListener('input', function(e) {

            if(document.querySelector("#tipoCliente").value=="1"){
                //LongMax("nro_doc",8)
                if (this.value.length > 8){
                    this.value = this.value.slice(0, 8);
                }
            }else{
                //LongMax("nro_doc",11)
                if (this.value.length > 11){
                    this.value = this.value.slice(0, 11);
                }
            }

        })


        document.querySelector(`#nro_doc`).addEventListener("blur", function( event ) {
            //event.target.style.background = "";
            if(document.querySelector("#tipoCliente").value=="1"){
                
                if (this.value.length < 8){
                    document.querySelector(`#msginput`).setAttribute("data-error", "Debe tener 8 dígitos")
                    this.className ="invalid"
                    this.select()               
                }else{
                    this.className ="valid"
                }

            }else if(document.querySelector("#tipoCliente").value=="2"){

                if (this.value.length < 11){
                    document.querySelector(`#msginput`).setAttribute("data-error", "Debe tener 11 dígitos")
                    this.className ="invalid"
                    this.select()               
                }else{
                    this.className ="valid"
                }

            }
            
          })


        document.querySelector(`#tipoCliente`).addEventListener('change', function(e) {
            document.querySelector(`#nro_doc`).select()
            document.querySelector(`#nro_doc`).removeAttribute("class")
        })
      
        document.querySelector("#departamento").addEventListener("change", async function(e){

            const {body: lista} = await getData('./ubigeo/provincia?idDepartamento=' + e.target.value)

            document.querySelector(`#provincia`).innerHTML = `<option value="" disabled="" selected="">Seleccione provincia</option>`

            lista.forEach(element => {
                document.querySelector(`#provincia`).innerHTML = document.querySelector(`#provincia`).innerHTML + `<option value="${element._id}">${element.nombre}</option>`
            });

        })

        document.querySelector("#provincia").addEventListener("change", async function(e){

            const {body: lista} = await getData(`./ubigeo/distrito?idProvincia=${e.target.value}&idDepartamento=${document.querySelector("#departamento").value}`)

            document.querySelector(`#distrito`).innerHTML = `<option value="" disabled="" selected="">Seleccione distrito</option>`

            lista.forEach(element => {
                document.querySelector(`#distrito`).innerHTML = document.querySelector(`#distrito`).innerHTML + `<option value="${element._id}">${element.nombre}</option>`
            });


        })


        // ************* ******* *********** //

        CargarTipoCliente()
        CargarDepartamento()

        ListarCliente()

        
        document.querySelector("#registrar").disabled = false 
        document.querySelector("#actulizar").disabled = true 
        document.querySelector("#eliminar").disabled = true

    })()
  
});


