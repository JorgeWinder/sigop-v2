
document.addEventListener('DOMContentLoaded', async function(){

    (async function Load(){


        async function getData(url){
            const response = await fetch(url);
            const data = await response.json();
            return data;        
        }
  
        async function postData(url, form){
    
          await fetch(url, 
            {
              method: "POST",
              body: form
            })
            .then(function(response){
                //swal("Datos guardados", "Continúe con la siguiente página", "success");
                console.log(response)
                //window.location.href = "modulo-de-cobranzas"
            })
            //return await response.json(); body: JSON.stringify(form),
        }


        // ------------------- Funciones ------------------------ //

        async function listDatosProducto(tabla){

          const { body: lista } = await getData('http://localhost:3000/' + tabla)

          lista.forEach(element => {
            document.querySelector(`#${tabla}`).innerHTML = document.querySelector(`#${tabla}`).innerHTML + `<option value="${element._id}">${element.nombre}</option>`
          });

        }


        // ------------------------------------------------------ //
  
        const $data = document.querySelector("form");
  
        document.addEventListener("submit", async function(e){
          
          e.preventDefault();
              
  
        });

        document.querySelector("#nombre_producto").focus()

        document.querySelector("#medidas").addEventListener("input", function(e) {
            
            
            //document.querySelector("#nombre_producto").value = document.querySelector("#categoria"). //+ document.querySelector("#origen").value + document.querySelector("#color").value 
            

            const adt1 = document.querySelector("#adt1").selectedOptions[0].childNodes[0].nodeValue == 'SIN ADITIVO'? '': document.querySelector("#adt1").selectedOptions[0].childNodes[0].nodeValue
            const adt2 = document.querySelector("#adt2").selectedOptions[0].childNodes[0].nodeValue == 'SIN ADITIVO'? '': document.querySelector("#adt2").selectedOptions[0].childNodes[0].nodeValue
            const adt3 = document.querySelector("#adt3").selectedOptions[0].childNodes[0].nodeValue == 'SIN ADITIVO'? '': document.querySelector("#adt3").selectedOptions[0].childNodes[0].nodeValue

            document.querySelector("#nombre_producto").value = document.querySelector("#categoria").selectedOptions[0].childNodes[0].nodeValue + " " 
                + document.querySelector("#origen").selectedOptions[0].childNodes[0].nodeValue + " "             
                + document.querySelector("#color").selectedOptions[0].childNodes[0].nodeValue +  " " 
                + adt1 + " "
                + adt2 + " "
                + adt3 + " "
                + document.querySelector("#medidas").value.toUpperCase() 
            
                document.querySelector("#nombre_producto").focus()
                document.querySelector("#medidas").focus()
            

        })


        
        document.querySelector("#medidas").addEventListener("click", function(e) {
          document.querySelector('#medidas').dispatchEvent(new Event('input'));
        })  
        
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



      listDatosProducto('categoria')
      listDatosProducto('origen')
      listDatosProducto('color')
      await listDatosProducto('adt1')
      await listDatosProducto('adt2')
      await listDatosProducto('adt3')


      document.querySelector("#adt1").selectedIndex=1
      document.querySelector("#adt2").selectedIndex=1
      document.querySelector("#adt3").selectedIndex=1


      document.querySelectorAll('select').forEach(element => {
          element.addEventListener('change', function(){
             //alert('df')

            //  if(document.querySelector("#adt1").selectedIndex!=1 && document.querySelector("#adt2").selectedIndex!=1 && document.querySelector("#adt3").selectedIndex!=1){

            //     document.querySelector('#medidas').dispatchEvent(new Event('keydown'));

            //  }
             
          })
      });
  
       
        
        // document.getElementById('page-preloader').style.opacity = '0';
        // document.getElementById('page-preloader').style.display = 'none';
  
    })()
  
  });
  
  