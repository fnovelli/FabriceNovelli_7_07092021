import React, { useState} from 'react';
import './styles/form.css'


let url = "http://localhost:3000/api/auth/login";
const userOK = 'successfully logged!';


function handleLoginError(status) {

  switch (status)
  {
    case 200:
    case 201:
    console.log(userOK);
    break;
    case 404:
        return alert('Error, user not found in the database.');
    case 406:
     return alert('Incorrect Password!');
    default:
        if (status >= 400 && status <= 499) {
          return alert('Unexpected error, please try again later.');
        }
    break;  
  }
}

function loginSendData(FormObject) {

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(FormObject)

  }).then(response => {
    handleLoginError(response.status);
  }).catch(errors => {
  console.log('BackEnd error:', errors);
  this.setState({ errors });
});

}

function Login() {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const FormObject = { email, password};
    loginSendData(FormObject);
}
    return (

      <section id="formBlock">
      <h1>Veuillez rentrer vos identifiants.</h1>

       <form onSubmit={handleSubmit}>

      <div class="formClass">
      <label for="email">E-mail</label>
      <input type="mail"
                class="form-control"
              required
              value={email}
              placeholder="pierre@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              ></input>
        </div>

        <div class="formClass">
             <label for="password">Mot de Passe</label>
                <input type="password"
                  required
                  class="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  ></input>

              </div>

          <button type="submit" id="btnSignUp">
            Connexion
          </button>
    
          </form>
      
      </section>

  
    );
  };
  
  export default Login;