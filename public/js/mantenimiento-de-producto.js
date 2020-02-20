

document.addEventListener('DOMContentLoaded', function(){

    (async function Load(){

      const elems = document.querySelectorAll('.modal');
      const instanceModal = M.Modal.init(elems);

      var elemsColl = document.querySelectorAll('.collapsible');
      M.Collapsible.init(elemsColl);
      
        // ***************** Funciones ******************* //

        async function listDatosProducto(tabla){

          const { body: lista } = await getData('./' + tabla)

          lista.forEach(element => {
            document.querySelector(`#${tabla}`).innerHTML = document.querySelector(`#${tabla}`).innerHTML + `<option value="${element._id}">${element.nombre}</option>`
          });

        }

        async function ListarProductos(){


                    let objdata = new Object()

                    const { body: lista } = await getData('./producto')
                    //console.log(lista)
                    
                    lista.forEach(element => {
                      objdata[`${element._id.toString().padStart(3,"0")} - ${element.nombre_producto}`] = null
                    });
                    
        

                    const elems = document.querySelectorAll('.autocomplete')
                    
                    const instance = M.Autocomplete.init(elems, { 
                        data: objdata,
                        onAutocomplete: function(itemSelect) {
                            // alert(txtItem.split('-')[0].trim());
                            const idProducto = itemSelect.split('-')[0].trim()

                            getProducto(idProducto)
                            document.querySelector('#idProducto').value = idProducto
                            document.querySelector('#nombre_producto_busqueda').value = ''
                            M.Modal.getInstance(document.querySelector('.modal')).close()
                            
                        }
                    });

                    M.toast({html: 'Lista de productos cargados'})

        }


        async function getProducto(idProducto){

          const { body: 
                  { 0 : producto} 
                } = await getData('./producto?id=' + idProducto)

          console.log(producto)

          document.querySelector('#categoria').value = producto.categoria._id
          document.querySelector('#origen').value = producto.origen._id
          document.querySelector('#color').value = producto.color._id
          document.querySelector('#unidad').value = producto.unidad._id
          document.querySelector('#medidas').value = producto.descrip_unidad
          document.querySelector('#nombre_producto').value = producto.nombre_producto
          document.querySelector('#precioMin').value = producto.precioMin
          document.querySelector('#precioMax').value = producto.precioMax
          document.querySelector('#stockMin').value = producto.stockMin
          document.querySelector('#especificacion').value = producto.especificacion

          document.querySelector("#registrar").disabled = true 
          document.querySelector("#actulizar").disabled = false 
          document.querySelector("#eliminar").disabled = false

          document.querySelectorAll("input").forEach(element => {
            element.focus()
          })

        }



        // ****************** Eventos ******************* //
  
        const $data = document.querySelector("form");
  
        document.addEventListener("submit", async function(e){
            
            e.preventDefault();
            const form = new FormData($data)

            for (const key of form.keys()) {            
              console.log(`${key} -> ${form.get(key)}`)
            }

            const respuesta = await postData("./producto", form)
            
            Swal.fire({
              icon: 'success',
              title: 'Todo bien',
              text: `Producto ${respuesta.body._id} - ${respuesta.body.nombre_producto}, registrado`
            })

            document.querySelector("#registrar").disabled = true 
            document.querySelector("#actulizar").disabled = false 
            document.querySelector("#eliminar").disabled = false 
            
            //console.log(respuesta)
            ListarProductos()
    
        });


        // Botón nuevo //

        document.querySelector("#nuevo").addEventListener('click', function(){
            document.querySelector("form").reset()
            document.querySelectorAll("input").forEach(element => {
              element.focus()
            })

            document.querySelector("#registrar").disabled = true 
            document.querySelector("#actulizar").disabled = true 
            document.querySelector("#eliminar").disabled = true

            document.querySelector('#idProducto').value = ''
            
        })

        // Botón actualizar //

        document.querySelector("#actulizar").addEventListener('click', async function(){

            const form = new FormData($data)

            // for (const key of form.keys()) {            
            //   console.log(`${key} -> ${form.get(key)}`)
            // }

            const idProducto = document.querySelector('#idProducto')

            const respuesta = await patchData("./producto/" + idProducto.value, form)

            Swal.fire({
              icon: 'success',
              title: 'Todo bien',
              text: `Producto ${respuesta.body._id} - ${respuesta.body.nombre_producto}, actualizado`
            })


        })


        document.querySelector("#busqueda").addEventListener('click', function(){

          setTimeout(function(){
            document.querySelector('#nombre_producto_busqueda').focus()
          }, 500)

        })



        /*

        var elems2 = document.querySelectorAll('.autocomplete');

        /*
        document.querySelector("#nombre_producto_busqueda").addEventListener('keydown', async function(e){

              const keyCode = e.keyCode || e.which;

                  if (keyCode === 8) { 
                    if(M.Autocomplete.getInstance(elems2)){
                      let instance = M.Autocomplete.getInstance(elems2);
                      instance.updateData({});
                    }
                  }

                  if (keyCode === 13) {
                    
                    const { body: lista } = await getData('./producto?textSearch='+ this.value)
                    console.log(lista)

                    let objdata = new Object()
                    
                    lista.forEach(element => {
                      objdata[`${element._id.toString().padStart(3,"0")} - ${element.nombre_producto}`] = null
                    });


                    
                    instances2 = M.Autocomplete.init(elems2, { 
                        data: objdata,
                        onAutocomplete: function(txt) {
                            alert(txt.split('-')[0].trim());
                            // ListarMovimientos(txt.split('-')[0].trim())
                            // document.querySelector('#idProducto').value = txt.split('-')[0].trim()
                            
                        }
                    });

                    document.querySelector('#modal1').focus()
                    document.querySelector('#nombre_producto_busqueda').focus()
                    
  
                  }

        })

        */




        // Crear nombre de producto //

        
        document.querySelector("#medidas").addEventListener("input", function(e) {
                        
                    
          if(document.querySelector("#categoria").selectedIndex!=0 && document.querySelector("#origen").selectedIndex!=0 && document.querySelector("#color").selectedIndex!=0 && document.querySelector("#unidad").selectedIndex!=0){
          
            const color = document.querySelector("#color").selectedOptions[0].childNodes[0].nodeValue == 'SIN COLOR'? '': document.querySelector("#color").selectedOptions[0].childNodes[0].nodeValue + " "
            const medidas = document.querySelector("#medidas").value == '' ? '' : document.querySelector("#medidas").value.toUpperCase() + " "

            document.querySelector("#nombre_producto").value = document.querySelector("#categoria").selectedOptions[0].childNodes[0].nodeValue + " " 
                + document.querySelector("#origen").selectedOptions[0].childNodes[0].nodeValue + " "             
                + color
                + medidas
                + document.querySelector("#unidad").selectedOptions[0].childNodes[0].nodeValue                
                            
                document.querySelector("#nombre_producto").focus()
                document.querySelector("#medidas").focus()

                document.querySelector("#registrar").disabled = false 

          }else{

            document.querySelector("#medidas").value = ""
            
            Swal.fire({
              icon: 'warning',
              title: 'Alerta',
              text: 'Debe seleccionar todos los datos del producto'
            })

          }            

        })


        // Evento click de dispara input  //
        
        document.querySelector("#medidas").addEventListener("click", function(e) {
          document.querySelector('#medidas').dispatchEvent(new Event('input'));
        })  

      // ----------------------------------------------------- //
        
        const inputs = document.querySelectorAll("form")
        inputs.forEach(element => {
            element.addEventListener("keypress",function(e){
                var keyCode = e.keyCode || e.which;
                if (keyCode === 13) { 
                    e.preventDefault();
                    return false;
                }
            })    
      });


      // ---------------------------------------------------  //

      document.querySelector("#registrar").disabled = true 
      document.querySelector("#actulizar").disabled = true 
      document.querySelector("#eliminar").disabled = true 

    

      listDatosProducto('categoria')
      listDatosProducto('origen')
      listDatosProducto('color')
      listDatosProducto('unidad')

      ListarProductos()
      
        
        // document.getElementById('page-preloader').style.opacity = '0';
        // document.getElementById('page-preloader').style.display = 'none';

      
        M.CharacterCounter.init(document.getElementById('especificacion'))
        //M.textareaAutoResize(null);
  
    })()
  
  });
  
  