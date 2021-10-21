import React from 'react';


let contact = {};
let url = "http://localhost:3000/api/auth/signup";

class formContact {
  constructor(name, nickname, email, password) {
      this.name = name;
      this.nickname = nickname;
      this.email = email;
      this.password = password;
  }
}

async function CheckAndStoreFormInfo() {

  let name = document.getElementById('firstName').value;
  let nickname = document.getElementById('nickName').value;
  let mail = document.getElementById('email').value;
  let password = document.getElementById('password').value;

      //check if email is valid
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        contact = new formContact(name, nickname, mail, password);
        return true;
    }
    else {
        alert("Erreur, le formulaire est incorrect!");
        return false;
    }


}

async function Form_CheckAndSendData() {

  let FormObject = JSON.stringify({contact});
  console.log(FormObject);

  try {
      let response = await fetch(url, {
          method: 'POST',
        headers: {
              'content-type': 'application/json'
          },
          body: FormObject,
      });

      if (response.ok) {
          let json = await response.json();
          console.log('DONE!' + json);

      } else {
          console.error('Error: ', response.status);
      }
  } catch (e) {
      console.log(e);
  }

}

function Register() {
    
    return (

        <div>
           <form id="Form">
              <div>
                <label for="firstName">Prénom</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="form-control"
                  placeholder="Jamy"
                  required
                />
              </div>
              <div>
                <label for="nickName">Pseudo</label>
                <input
                  id="nickName"
                  name="nickName"
                  type="text"
                  className="form-control"
                  placeholder="Jacky38"
                  required
                />
              </div>
              <div>
                <label for="email">Adresse e-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="jamy@gmail.com"
      
                  required
                />

              </div>
              <div>
                <label for="password">Mot de Passe</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
              <button type="submit">
                Envoyer
              </button>
              </div>
            </form>
           
          </div>
  
    );
  };
  
  export default Register;