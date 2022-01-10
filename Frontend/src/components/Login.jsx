import React, { useState, useContext, useEffect } from "react";
import './styles/form.css'
import Auth from "../contexts/Auth"
import { login } from "../services/AuthApi";
import { useHistory } from "react-router-dom";

const Login = () => {

 
const history = useHistory();

const { isAuthenticated, setIsAuthenticated } = useContext(Auth);

const [user, setUser] = useState({
  email: "",
  password: ""
})

const handleChange = ({currentTarget}) => {
  const { name, value } = currentTarget;

  setUser({...user, [name]: value})
}


const handleSubmit = async e => {

    e.preventDefault();

    try {

    console.log(user);
    const response = await login(user);
    console.log('anwser of the form is: ', response);
    if (!response)
      alert("E-mail ou mot de passe incorrect!");
    setIsAuthenticated(response);
    
  }
 catch ({ response}) {
   console.log(response);
 }

}

useEffect(() => {
  if (isAuthenticated) {
    history.replace('/');
  }
}, [history, isAuthenticated]);

return (

  <div>
    
    <section id="formBlock">
    <h1>Veuillez rentrer vos identifiants.</h1>

     <form onSubmit={ handleSubmit }>

    <div className="formClass">
    <label for="email">E-mail</label>
    <input type="mail"
              className="form-control"
              name="email"
            required
            placeholder="pierre@gmail.com"
            onChange={handleChange}
            ></input>
      </div>

      <div className="formClass">
           <label for="password">Mot de Passe</label>
              <input type="password"
              name="password"
                required
                className="form-control"
                onChange={handleChange}
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




/*class Login extends React.Component {

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
}*/

  
export default Login;

