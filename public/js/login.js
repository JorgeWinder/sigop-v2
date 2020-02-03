
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
          
          const form = new FormData($data);
          const url = "./auth";

          
          for (const key of form.keys()) {            
            console.log(`${key} -> ${form.get(key)}`)
          }
  
        //   const valor = await swal(``, {            
        //     buttons: true, 
        //     icon: "warning"            
        //   })

          //postData(url,form)
          const { acceso } = await getData(url)

          if(acceso==true){
            window.location.href = "modulo-de-cobranzas"
          }

            // if( val1 && val2 ){
              
            //   if (valor) {
            //     postData(url,form) 
            //   }
  
            // }else{
            //   swal("Faltan completar datos de acceso", {            
            //     buttons: true, 
            //     icon: "error"            
            //   })  
            // }   
    
  
        });
        
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
  
        document.querySelector("form").reset()
  
        
        document.getElementById('page-preloader').style.opacity = '0';
        document.getElementById('page-preloader').style.display = 'none';
  
    })()
  
  });
  
  