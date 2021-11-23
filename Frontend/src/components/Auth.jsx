
let urlLogged = "http://localhost:3000/api/auth/logged/";


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

//todo add token
async function isLogged() {

  await fetch(urlLogged + '1', {
    method: 'GET',  
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ',
    }
  }).then(response => {
     if (AuthCheck(response.status))
     {
       if (response.ok) {
          console.log('sucessfully updated site with logged user.');
            return true;
       }
     }

     return false;
  }).catch(errors => {

    console.log('BackEnd error:', errors);
    return false;
  
})

return false;
}


export {
    isLogged,
}