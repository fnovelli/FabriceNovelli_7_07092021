import React from "react";
import { isLogged } from "./Auth";
import { Message } from "../components";
import "./styles/home.css"


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isLog: false};
  }

  async componentDidMount() {
    this.setState({
      isLog: await isLogged()
    });
  }

  displayWelcomeMessage() {
       
    return (
      <div className="bgHome">
      <header class="container">
     
          <div class="title">
        <h2>Welcome to Groupomania</h2>
        </div>
        
          </header>
    

        { this.displayHomeMessage() }
        </div>
  
    
       
       
    )

  }

displayHomeMessage() {

  if (this.state.isLog === false)  {
   
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
  else {
    return (
      <div>
        <Message />



    </div>
    )
  }

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

