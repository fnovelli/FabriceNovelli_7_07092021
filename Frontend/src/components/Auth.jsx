


let urlLogged = "http://localhost:3000/api/users/@me";
let isConnected = false;



function AuthCheck(status) {

  switch (status)
  {
    case 200:
    case 201:
    return true;
    default:
        console.log('get failed, cannot update site with user information');
        return false; 
  }
}


async function isLogged() {


  try {
 const answer = await fetch(urlLogged, {
    method: 'GET',  
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
    }
  })

  if (AuthCheck(answer.status)) {
    if (answer.ok)
    {
      return true;
    }
  } else {
    return false;
    
  }
} catch (error)
{
  return false;
}

}


export {
    isConnected
}