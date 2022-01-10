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


export function login(user) {

    return fetch(url , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(user)

    
      }).then(response => {
        const result = AuthCheck(response.status);        
        console.log('status login: ', result);
        return result;
      }).catch(errors => {
      console.log('BackEnd error:', errors);
      return false;
    });


}

export function hasAuthenticated() {
  
   const answer = fetch(urlLogged, {
           method: 'GET',  
           credentials: 'include',
           headers: {
             'Accept': 'application/json',
           }
         })


         const result = AuthCheck(answer.status);
         console.log('result is: ', result);
         return result;

}