
const controles = document.querySelectorAll('input[type="text"],input[type="number"]')

controles.forEach(element => {

      element.addEventListener("click",function(){
        element.select()
      })
})  
