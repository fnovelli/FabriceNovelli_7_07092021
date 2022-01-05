import React, { useContext } from "react";
import { Message } from "../components";
import "./styles/home.css"
import Auth from "../contexts/Auth";

function DisplayHomeMessage() {


    return (
    <div>

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

  </div>
    )
  }
 /* else {
    return (
      <div>
        <Message />



    </div>
    )
  }

}*/

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isLog: false};
  }


  displayWelcomeMessage() {
       
    return (
      <div className="bgHome">
      <header className="container">
     
          <div className="title">
        <h2>Bienvenue chez Groupomania</h2>
        </div>
        
          </header>
    

        { DisplayHomeMessage() }
        </div>     
    )
  }



render() {
   
  return (
 
    <div>      
      { this.displayWelcomeMessage() }
    </div>
  )

}
}

export default Home;

