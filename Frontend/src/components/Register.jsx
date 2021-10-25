
import React, { useState} from 'react';
import './styles/form.css'

let url = "http://localhost:3000/api/auth/";


function Register() {
    
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const FormObject = { name, nickname, email, password};

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(FormObject)
      

    }).then(() => {
      console.log('new user created! POGGERS!' + FormObject);

    })
}
    return (


      <div>
      <h1>Veuillez compléter le formulaire.</h1>
      <div id="formBlock">
       <form onSubmit={handleSubmit}>

      <div>
       <label for="name">Prénom</label>
            <textarea
              required
              value={name}
              placeholder="Pierre"
              onChange={(e) => setName(e.target.value)}
              ></textarea>
      </div>

       <label for="nickname">Pseudo</label>
            <textarea
              required
              value={nickname}
              placeholder="Peter"
              onChange={(e) => setNickname(e.target.value)}
              ></textarea>

    <div>
      <label for="email">E-mail</label>
            <textarea
              required
              value={email}
              placeholder="pierre@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              ></textarea>
        </div>
        <label for="password">Mot de Passe</label>
            <input type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ></input>

          <div>
          <button type="submit" id="btnSignUp">
            Envoyer
          </button>
        </div>
        </form>
        </div>
      </div>

  
    );
  };
  
  export default Register;