import React from "react";
import { isLogged } from "./Auth";


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
      <div className="home">
      <header class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
        <h2>Welcome to Groupomania</h2>

        { this.displayHomeMessage() }
  
        </div>
        </div>
          </header>
          </div>
    )

  }

displayHomeMessage() {

  if (this.state.isLog == false)  {
   
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

