import React, { useContext } from "react";
import { Message } from "../components";
import "./styles/home.css"
import Auth from "../contexts/Auth";
import { Link } from "react-router-dom";

const Home = () => {
  
  const { isAuthenticated } = useContext(Auth);

  return (
    <div className="bgHome">
    <header className="container">
    <div className="title">
      <h2>Groupomania Actualité</h2>
      </div>
        </header>

        <div>
      { (!isAuthenticated && (
        <>
    <li>
    <p>
    <Link className="nav-link" to="/login">

        Connectez-vous pour continuer !
      </Link>

        <br/>
        Pas encore de compte ?
      </p>

      <Link className="nav-link" to="/register">

        Créer un compte maintenant!
      </Link>
  </li>
  </>
      )) || (
        <>
    <Message />

        </>)
}
  </div>
  </div>
  
  )
}

export default Home;

