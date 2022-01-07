let urlLogged = "http://localhost:3000/api/users/@me";
let url = "http://localhost:3000/api/users/login";

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


export async function login(user) {

    return await fetch(url , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(user)
    
      }).then(response => {
        AuthCheck(response.status);
        console.log('status login: ', response.status);
        return true;
      }).catch(errors => {
      console.log('BackEnd error:', errors);
      return false;
    });

}

export async function hasAuthenticated() {
  

  try {
   const answer = await fetch(urlLogged, {
           method: 'GET',  
           credentials: 'include',
           headers: {
             'Accept': 'application/json',
           }
         })

         console.log('status login: ', answer);
       
         if (AuthCheck(answer.status)) {

           if (answer.ok)
             return true;
         }
        }
        catch {
         return false;
        }

    return false;
}