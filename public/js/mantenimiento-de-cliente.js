
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
                    //alert(itemSelect.split('-')[0].trim());
                    const idCliente = itemSelect.split('-')[0].trim()

                    getCliente(idCliente)
                    // document.querySelector('#idProducto').value = idProducto
                    document.querySelector('#nombre_producto_busqueda').value = ''
                    M.Modal.getInstance(document.querySelector('.modal')).close()

                }
            });

            M.toast({html: 'Lista de clientes cargados'})

        }

        async function getCliente(idCliente){

            const { body: 
                    { 0 : cliente} 
                  } = await getData('./cliente?id=' + idCliente)
  
            console.log(cliente)
            
            document.querySelector('#tipoCliente').value = cliente.tipoCliente
            document.querySelector('#nro_doc').value = cliente._id
            document.querySelector('#nombre').value = cliente.nombre
            document.querySelector('#direccion').value = cliente.direccion
            document.querySelector('#correo').value = cliente.correo
            document.querySelector('#telefono').value = cliente.telefono
            
            document.querySelector('#departamento').value = cliente.ubigeo.departamentoId
            const ev =document.querySelector('#departamento').dispatchEvent(new Event('change', {
                'bubbles': true,
                'cancelable': true
            }));

           
            setTimeout(function() {
                document.querySelector('#provincia').value = cliente.ubigeo.provinciaId    
                document.querySelector('#provincia').dispatchEvent(new Event('change'));
                
            }, 1000)

            setTimeout(function() {
                document.querySelector('#distrito').value = cliente.ubigeo._id
            }, 3000)
            
            
            document.querySelector('#nombres_contacto').value = cliente.nombresContacto
            document.querySelector('#correoContacto').value = cliente.correoContacto
            document.querySelector('#telefonoContacto').value = cliente.telefonoContacto
  
            document.querySelector("#registrar").disabled = true 
            document.querySelector("#actualizar").disabled = false 
            document.querySelector("#eliminar").disabled = false
  
            document.querySelectorAll("input").forEach(element => {
              element.focus()
            })
  
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


        
        // Botón busqueda //

        document.querySelector("#busqueda").addEventListener('click', function(){

            setTimeout(function(){
              document.querySelector('#nombre_producto_busqueda').focus()
            }, 500)
  
          })

        // Botón nuevo //

        document.querySelector("#nuevo").addEventListener('click', function(){
            document.querySelector("form").reset()
            document.querySelectorAll("input,select").forEach(element => {
              element.focus()
              element.style.backgroundColor= ''
            })

            document.querySelector("#registrar").disabled = false 
            document.querySelector("#actualizar").disabled = true 
            document.querySelector("#eliminar").disabled = true

            document.querySelector('#nro_doc').value = ''
            document.querySelector(`#nro_doc`).readOnly = true
            
            
        })


        // Botón registrar //

        const $data = document.querySelector("form");
  
        document.querySelector(`#registrar`).addEventListener("click", async function(e){
            
            const form = new FormData($data)

            for (const key of form.keys()) {            
              console.log(`${key} -> ${form.get(key)}`)
            }

            const val = CamposObligatoriosById('select:tipoCliente,input:nombre,input:direccion,input:correo,input:telefono,select:departamento')

            if(val){
                
                const respuesta = await postData("./cliente", form)
            
                Swal.fire({
                    icon: 'success',
                    title: 'Todo bien',
                    text: `Cliente ${respuesta.body._id} - ${respuesta.body.nombre}, registrado`
                })
    
                document.querySelector("#registrar").disabled = true 
                document.querySelector("#actualizar").disabled = false 
                document.querySelector("#eliminar").disabled = false 

                ListarCliente()
                

            }else{

                Swal.fire({
                    icon: 'warning',
                    title: 'Algo salió mal',
                    text: `Datos de registro, invalidos`
                })
                
            }

        
    
        });



        // Botón actualizar //

      
  
        document.querySelector(`#actualizar`).addEventListener("click", async function(e){
            
            const form = new FormData($data)

            for (const key of form.keys()) {            
              console.log(`${key} -> ${form.get(key)}`)
            }

            const val = CamposObligatoriosById('select:tipoCliente,input:nombre,input:direccion,input:correo,input:telefono,select:departamento')

            if(val){
                
                const respuesta = await patchData("./cliente/" + document.querySelector('#nro_doc').value, form)
            
                Swal.fire({
                    icon: 'success',
                    title: 'Todo bien',
                    text: `Cliente ${respuesta.body._id} - ${respuesta.body.nombre}, modificado`
                })
    
                document.querySelector("#registrar").disabled = true 
                document.querySelector("#actualizar").disabled = false 
                document.querySelector("#eliminar").disabled = false 

                ListarCliente()
                

            }else{

                Swal.fire({
                    icon: 'warning',
                    title: 'Algo salió mal',
                    text: `Datos de registro, invalidos`
                })
                
            }

            
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
            document.querySelector(`#nro_doc`).readOnly = false
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
                document.querySelector(`#distrito`).innerHTML = document.querySelector(`#distrito`).innerHTML + `<option value="${element._id}">${element.Distrito}</option>`
            });


        })


        // ************* ******* *********** //

        CargarTipoCliente()
        CargarDepartamento()

        ListarCliente()

        LongMax('telefono',9)

        document.querySelector(`#nro_doc`).readOnly = true
        
        document.querySelector("#registrar").disabled = false 
        document.querySelector("#actualizar").disabled = true 
        document.querySelector("#eliminar").disabled = true

    })()
  
});


