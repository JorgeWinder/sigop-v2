


document.addEventListener('DOMContentLoaded', function(){

    (async function Load(){

    

        // ------------------- Funciones ------------------------ //

        async function listDatosProducto(tabla){

          const { body: lista } = await getData('./' + tabla)

          lista.forEach(element => {
            document.querySelector(`#${tabla}`).innerHTML = document.querySelector(`#${tabla}`).innerHTML + `<option value="${element._id}">${element.nombre}</option>`
          });

        }


        // -------------------- Eventos ------------------------ //
  
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
              text: `Prodcuto ${respuesta.body._id}, registrado`
            })

            document.querySelector("#registrar").disabled = true 
            document.querySelector("#actulizar").disabled = false 
            document.querySelector("#eliminar").disabled = false 
            
            console.log(respuesta)
    
        });

        




        

        document.querySelector("#nuevo").addEventListener('click', function(){
            document.querySelector("form").reset()
            document.querySelectorAll("input").forEach(element => {
              element.focus()
            })
        })

        
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
      
        
        // document.getElementById('page-preloader').style.opacity = '0';
        // document.getElementById('page-preloader').style.display = 'none';
  
    })()
  
  });
  
  