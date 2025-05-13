import { ParamValue } from "next/dist/server/request/params";

async function fetchedtoken(username:ParamValue){
  try {
    const res = await fetch('/api/generatejwttoken',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({ username:username })
    })

    if(!res){
      console.log('response not generated')
      return ;
    }

    const data = await res.json()

    return data?.token
    
  } catch (error) {
    console.error(`Issue: ${error}`)
    return;
  }
}

export { 
    fetchedtoken
}