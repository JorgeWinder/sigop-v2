

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

