
const controles = document.querySelectorAll('input[type="text"],input[type="number"]')

controles.forEach(element => {

      element.addEventListener("click",function(){
        element.select()
      })
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