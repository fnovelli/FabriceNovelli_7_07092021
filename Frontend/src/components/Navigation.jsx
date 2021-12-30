import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import "./styles/navigation.css";
import { Logout } from "./Logout";
import Auth from "../contexts/Auth";

function DisplayNavBar() {

 // const { isAuthenticated } = useContext(Auth);
 const { isAuthenticated } = false;

  return (

    <div>
      { (!isAuthenticated && (
        <>
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
  </>
      )) || (
        <>
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
        </>)
}
  </div>

  )
}


class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isLog: false};
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
  
                  { DisplayNavBar() } 
  
    
                  <li
                    className={`nav-item  ${
                      this.props.location.pathname === "/contact" ? "active" : ""
                    }`}
                  >
                          <div className="nav-link">
                      <a href="mailto:groupomania@support.com" className="fLine">Contact</a>
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