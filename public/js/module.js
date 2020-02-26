

async function getData(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;        
}

async function postData(url, form){

  const response = await fetch(url, 
  {
      method: "POST",
      body: form
  })

  return await response.json()
    
}

async function patchData(url, form){

    const response = await fetch(url, 
    {
        method: "PATCH",
        body: form
    })
  
    return await response.json()
      
}


async function deleteData(url, form){

    const response = await fetch(url, 
    {
        method: "DELETE"
    })
  
    return await response.json()
      
}


  
function CamposObligatoriosById(ListaIdControl){

    const Lista = ListaIdControl.split(',') 
    let estado = true
    let conta = 0

    Lista.forEach(NameControl => {

        const tipoControl = NameControl.split(':')[0]
        const idControl = NameControl.split(':')[1]
      
      //const respuesta = document.querySelectorAll(`input[id*="${NameControl}"]`)
      //const respuesta = document.querySelectorAll(`input[id="${NameControl}"],select[id="${NameControl}"]`)
      const respuesta = document.querySelectorAll(`${tipoControl}[id="${idControl}"]`)

        for (let index = 0; index < respuesta.length; index++) {

            if(respuesta[index].value.trim() == ''){
                
                respuesta[index].style.backgroundColor= '#ffdce0'

            }else{

                respuesta[index].style.backgroundColor= ''
                conta = conta + 1   
            }

                    
        //   if(respuesta[index].closest(".card").style.display == "none"){  
        //     conta = conta + 1                      
        //     break                      
        //   }else if( ((respuesta[index].type=="text" || respuesta[index].type=="number" || respuesta[index].type=="date" ) && respuesta[index].value == "") || ( respuesta[index].type=="checkbox" && respuesta[index].checked==false ) ){            
        //     respuesta[index].closest(".card-content").style.background = "#ffdce0"
        //     estado = false
        //   }else if( ((respuesta[index].type=="text" || respuesta[index].type=="number" || respuesta[index].type=="date" ) && respuesta[index].value != "") || ( respuesta[index].type=="checkbox" && respuesta[index].checked ) ){
        //     respuesta[index].closest(".card-content").style.background = ""
        //     conta = conta + 1            
        //     estado = true
        //     break                      
        //   }                                      


        }           
      
    });  
    
    if(Lista.length==conta){
      estado = true
    }else{ 
      estado = false 
    }

    return estado

  }


  function LongMax(control,longitud) {

    let input = document.querySelector(`#${control}`)

    input.addEventListener('input', function(){
      if (this.value.length >= parseInt(longitud)) 
        this.value = this.value.slice(0, parseInt(longitud)); 
        this.removeAttribute("class")
    })

    input.addEventListener('blur', function(){
        if (this.value.length < parseInt(longitud) && this.value.length>0){
            
            // var span = document.createElement('span');
            // input.parentNode.appendChild(span)
            input.className ='invalid'
            input.select()

        }
    })
        
  }

