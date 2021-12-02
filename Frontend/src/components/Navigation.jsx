import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isLogged } from "./Auth";
import "./styles/navigation.css";


class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isLog: false};
  }

  async componentDidMount() {
    this.setState({
      isLog: await isLogged()
    });
  }

  

  DisplayLoginBar() {

    return (
  
      <div>
      <li
      class={`nav-item  ${
        this.props.location.pathname === "/register" ? "active" : ""
      }`}
    >
      <Link class="nav-link" to="/register">
        S'inscrire
      </Link>
    </li>
  
  
    <li
      class={`nav-item  ${
        this.props.location.pathname === "/login" ? "active" : ""
      }`}
    >
      <Link class="nav-link" to="/login">
        Connexion
        
      </Link>
    </li>
    </div>
  
  
    )
  }
  
    DisplayLogoutBar()
  {
    return (
      <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
      <div>
      <li
      class={`nav-item  ${
        this.props.location.pathname === "/profile" ? "active" : ""
      }`}
    >
      <Link class="nav-link" to="/profile">
        Mon Profil
      </Link>
    </li>
  
  
    <li
      class={`nav-item  ${
        this.props.location.pathname === "/logout" ? "active" : ""
      }`}
    >
      <Link class="nav-link" to="/logout">
        Déconnexion
        
      </Link>
      </li>
    </div>
    </div>
    </nav>
    </div>
    )
  
  }
  
    
  DisplayNavBar() {
  
    const isLoggedIn = this.state.isLog; 
  
      console.log('islog: ', isLoggedIn);
  
      if (isLoggedIn)
      {
        return this.DisplayLogoutBar() 
      } 
      else {
        return this.DisplayLoginBar()
      }
    }
  
  
  
    render() {
  
      
  
      return (
  
      
        <div className="navigation">
          <nav class="navbar navbar-expand navbar-dark bg-dark">
            <div class="container">
              <Link class="navbar-brand" to="/">
                
              </Link>
    
              <div>
                <ul class="navbar-nav ml-auto">
                  <li
                    class={`nav-item  ${
                      this.props.location.pathname === "/" ? "active" : ""
                    }`}
                  >
                    <Link class="nav-link" to="/">
                      Accueil
                      <span class="sr-only">(current)</span>
                    </Link>
                  </li>
  
  
                  { this.DisplayNavBar() } 
    
  
    
                  <li
                    class={`nav-item  ${
                      this.props.location.pathname === "/contact" ? "active" : ""
                    }`}
                  >
                          <div class="nav-link">
                      <a href="mailto:date-app@support.com" class="fLine">Contact</a>
                      </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
  
  }
  }
export default withRouter(Navigation);