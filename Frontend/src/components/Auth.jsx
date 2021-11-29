
let urlLogged = "http://localhost:3000/api/auth/logged";


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
      isConnected = true;
      return true;
    }
  } else {
    isConnected = false;
    return false;
    
  }
} catch (error)
{
  isConnected = false;
  return false;
}

}


export {
    isLogged, isConnected
}