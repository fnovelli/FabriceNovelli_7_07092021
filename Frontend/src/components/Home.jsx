import React, { useContext } from "react";
import { Message } from "../components";
import "./styles/home.css"
import Auth from "../contexts/Auth";


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
        <a
        className="App-link"
        href="/login/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Connectez-vous pour continuer !
      </a>

        <br/>
        Pas encore de compte ?
      </p>

      <a
        className="App-link"
        href="/register/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Créer un compte maintenant!
      </a>
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

