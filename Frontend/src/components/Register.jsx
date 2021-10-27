
import React, { useState} from 'react';
import './styles/form.css'

let url = "http://localhost:3000/api/auth/";
const userOK = 'successfully created new user!';

function handleError(status) {

  switch (status)
  {
    case 200:
    case 201:
    console.log(userOK);
    return alert(userOK);
    case 409:
     return alert('Username or E-mail already exist in the database.');
    default:
        if (status >= 400 && status <= 499) {
          return alert('Unexpected error, please try again later.');
        }
    break;  
  }
}

function formSendData(FormObject) {

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(FormObject)

  }).then(response => {
    handleError(response.status);
  }).catch(errors => {
  console.log('BackEnd error:', errors);
  this.setState({ errors });
});

}

function Register() {
    
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const FormObject = { name, nickname, email, password};
    formSendData(FormObject);
}
    return (

      <section id="formBlock">
      <h1>Veuillez compléter le formulaire.</h1>

       <form onSubmit={handleSubmit}>

       <div class="formClass">
       <label for="name">Prénom</label>
       <input type="text"
                class="form-control"
              value={name}
              placeholder="Pierre"
              onChange={(e) => setName(e.target.value)}
              ></input>
      </div>
      <div class="formClass">
       <label for="nickname">Pseudo</label>
       <input type="text"
                class="form-control"
              required
              value={nickname}
              placeholder="Peter"
              onChange={(e) => setNickname(e.target.value)}
              ></input>
      </div>
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
            Envoyer
          </button>
    
          </form>
      
      </section>

  
    );
  };
  
  export default Register;