import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isLogged } from "./Auth";
import "./styles/navigation.css";
import { Logout } from "./Logout";



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
      className={`nav-item  ${
        this.props.location.pathname === "/register" ? "active" : ""
      }`}
    >
      <Link className="nav-link" to="/register">
        S'inscrire
      </Link>
    </li>
  
  
    <li
      className={`nav-item  ${
        this.props.location.pathname === "/login" ? "active" : ""
      }`}
    >
      <Link className="nav-link" to="/login">
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
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
      <div>
      <li
      className={`nav-item  ${
        this.props.location.pathname === "/account" ? "active" : ""
      }`}
    >
      <Link className="nav-link" to="/account">
        Mon Compte
      </Link>
    </li>
  
  
    <li
      className={`nav-item  ${
        this.props.location.pathname === "/logout" ? "active" : ""
      }`}
    >
      <Link className="nav-link" to="/logout" onClick={ Logout }>
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
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container">
              <Link className="navbar-brand" to="/">
                
              </Link>
    
              <div>
                <ul className="navbar-nav ml-auto">
                  <li
                    className={`nav-item  ${
                      this.props.location.pathname === "/" ? "active" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/">
                      Accueil
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
  
  
                  { this.DisplayNavBar() } 
    
  
    
                  <li
                    className={`nav-item  ${
                      this.props.location.pathname === "/contact" ? "active" : ""
                    }`}
                  >
                          <div className="nav-link">
                      <a href="mailto:date-app@support.com" className="fLine">Contact</a>
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