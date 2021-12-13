
import React, { useState} from 'react';
import './styles/form.css'
import PasswordChecklist from "react-password-checklist"

let url = "http://localhost:3000/api/users";
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

function isPasswordValid(password, passwordAgain) {

  if (password !== "undefined" &&  passwordAgain !== "undefined") {
      
    if (password !== passwordAgain) {
      alert("Les deux mots de passe doivent être identique.");
      return false;
    }
  } 

  return true;
}

function Register() {
    
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
	const [password, setPassword] = useState("");
	const [passwordAgain, setPasswordAgain] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    if (isPasswordValid(password, passwordAgain)) {
      const FormObject = { name, nickname, email, password};
      formSendData(FormObject);
    }
}
    return (

      <section id="formBlock">
      <h1>Veuillez compléter le formulaire.</h1>

       <form onSubmit={handleSubmit}>

       <div className="formClass">
        <label for="name">Prénom</label>
        <input type="text"
           className="form-control"
         value={name}
         minlength="4"
         placeholder="Pierre"
         pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$"
         onChange={(e) => setName(e.target.value)}
         ></input>
        </div>
  

      <div className="formClass">
       <label for="nickname">Pseudo</label>
       <input type="text"
                className="form-control"
              required
              value={nickname}
              placeholder="Peter"
              minlength="4"
              pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$"
              onChange={(e) => setNickname(e.target.value)}
              ></input>
      </div>
      <div className="formClass">
      <label for="email">E-mail</label>
      <input type="mail"
                className="form-control"
              required
              value={email}
              placeholder="pierre@gmail.com"
              pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"
              onChange={(e) => setEmail(e.target.value)}
              ></input>
        </div>

        <div className="formClass">
        <label>Mot de Passe:</label>
			<input name="password" type="password" required pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" onChange={e => setPassword(e.target.value)} />
			<label>Entrez le mot de passe à nouveau:</label>
			<input name="password_repeat" type="password" required pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" onChange={e => setPasswordAgain(e.target.value)} />

			<PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={8}
				value={password}
				valueAgain={passwordAgain}
        messages={{
					minLength: "Le mot de passe doit contenir au moins 8 caractères.",
					specialChar: "La mot de passe doit contenir au moins un caractère spécial.",
					number: "Le mot de passe doit contenir au moins un nombre.",
					capital: "Le mot de passe doit avoir au moins une majuscule.",
					match: "Les deux mots de passe doivent être identique.",
				}}
        
			/>
        </div>


          <button type="submit" id="btnSignUp">
            Envoyer
          </button>
    
          </form>
      
      </section>

  
    );
  };
  
  export default Register;