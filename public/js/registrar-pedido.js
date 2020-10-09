
document.addEventListener('DOMContentLoaded', function () {
    


    (async function Load(){

        // var elems = document.querySelectorAll('.modal')
        // var instances = M.Modal.init(elems)

        // ***************** Funciones ******************* //


        // ****************** Eventos ******************* //

        const detalle = document.querySelector("#detalle tbody")
        const agregar = document.querySelector("#btnAgregarProducto")

        let contarFilas = document.querySelectorAll("#detalle tbody tr").length
        let contenido = document.querySelector("#detalle tbody").innerHTML 

        contador = contarFilas

        agregar.addEventListener("click", function(){
            
            contador += 1
            const inputProducto = `<div class="input-field" style="margin-right: 10px;"><input type="text" id="nompro${contador}" name="nompro${contador}" value=""><input type="hidden" id="idProducto" value=""></div>`

            contenido = contenido + `<tr><td>${contador}</td><td>${inputProducto}</td></tr>`

            detalle.innerHTML = contenido 

            document.querySelectorAll("#detalle tbody tr").forEach(function(elemento){
              console.log(elemento.querySelectorAll("td")[1].querySelector("input").value) 
            })
    

        })


       


    })()


})


