import React from 'react';
import './styles/form.css'


let url = "http://localhost:3000/api/users/login";
const userOK = 'successfully logged!';

function handleLoginStatus(status) {

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

async function loginSendData(FormObject) {

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(FormObject)

  }).then(response => {
    handleLoginStatus(response.status);
    return;
  }).catch(errors => {
  console.log('BackEnd error:', errors);
  this.setState({ errors });
});
}

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLog: false,
      email: '',
      password: '',
  }
}

updateEmail(e) {

  this.setState({
    email: e.target.value,
  });
}

updatePassword(e) {

  this.setState({
    password: e.target.value,
  });
}

 handleSubmit = (e) => {
  var email = this.state.email;
  var password = this.state.password;

    e.preventDefault();
    const FormObject = { email, password};
    loginSendData(FormObject);
}
  


render() {
    
  return (
 
    <div>
      
      <section id="formBlock">
      <h1>Veuillez rentrer vos identifiants.</h1>

       <form onSubmit={ this.handleSubmit }>

      <div className="formClass">
      <label for="email">E-mail</label>
      <input type="mail"
                className="form-control"
              required
              value={this.state.email}
              placeholder="pierre@gmail.com"
              onChange={this.updateEmail.bind(this)}
              ></input>
        </div>

        <div className="formClass">
             <label for="password">Mot de Passe</label>
                <input type="password"
                  required
                  className="form-control"
                  value={this.state.password}
                  onChange={this.updatePassword.bind(this)}
                  ></input>

              </div>

          <button type="submit" id="btnSignUp">
            Connexion
          </button>


          </form>
      
      </section>


    </div>
  )

  }
}

  
  export default Login;