
let urlLogout= "http://localhost:3000/api/users/logout";


function LogoutCheck(status) {

  switch (status)
  {
    case 200:
    case 201:
        console.log('Successfully logout');
    return true;
    default:
        console.log('Failed to logout');
        return false; 
  }
}


async function Logout() {

  try {
 const answer = await fetch(urlLogout, {
    method: 'POST',  
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
    }
  })
  if (LogoutCheck(answer.status)) {
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
  Logout,
}