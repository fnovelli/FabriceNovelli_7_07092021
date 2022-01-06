import React, { useContext } from "react";
import { Message } from "../components";
import "./styles/home.css"
import Auth from "../contexts/Auth";

function DisplayHomeMessage(isAuthenticated) {

  return (

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
        Connectez-vous pour continuer!
      </a>

        <br/>
        Pas encore de compte?
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

  )
}



function DisplayWelcomeMessage(isAuthenticated) {
       
  return (
    <div className="bgHome">
    <header className="container">
   
        <div className="title">
      <h2>Bienvenue chez Groupomania</h2>
      </div>
      
        </header>
  

      { DisplayHomeMessage(isAuthenticated) }
      </div>     
  )
}

const Home = () => {
  
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);


  return (
 
    <div>      
      { DisplayWelcomeMessage(isAuthenticated) }
    </div>
  )


}

export default Home;

