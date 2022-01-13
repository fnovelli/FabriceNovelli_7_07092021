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

    return fetch(url , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(user)

    
      }).then(response => {
        const result = AuthCheck(response.status);        
        console.log('status login: ', result);
        localStorage.setItem("isLog", JSON.stringify(result));
        console.log('localstorage:', localStorage.getItem("isLog"));
        return result;
      }).catch(errors => {
      console.log('BackEnd error:', errors);
      return false;
    });
}

export function hasAuthenticated() {  
    return localStorage.getItem("isLog");
}