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

    const response = await login(user);

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


  
export default Login;

