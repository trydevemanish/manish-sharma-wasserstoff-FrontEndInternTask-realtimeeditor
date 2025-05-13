async function fetchedtoken(){
  try {
    const res = await fetch('/api/generatejwttoken',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      }
    })

    if(!res){
      console.log('response not generated')
      return ;
    }

    const data = await res.json()

    console.log('data',data)

    return data?.token
    
  } catch (error) {
    console.error(`Issue: ${error}`)
    return;
  }
}

export { 
    fetchedtoken
}