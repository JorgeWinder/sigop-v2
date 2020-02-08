
document.addEventListener('DOMContentLoaded',function(){

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
  
        const $data = document.querySelector("form");
  
        document.addEventListener("submit", async function(e){
          
          e.preventDefault();
              
  
        });

        document.querySelector("#nombre_producto").focus()

        document.querySelector("#medidas").addEventListener("keypress", function(e) {
            
            
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
  
       
        
        // document.getElementById('page-preloader').style.opacity = '0';
        // document.getElementById('page-preloader').style.display = 'none';
  
    })()
  
  });
  
  