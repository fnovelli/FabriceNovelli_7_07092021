import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isLogged } from "./Auth";




function DisplayLoginBar(props) {

let islog = isLogged();

  if (islog !== true)  {

    
    return (
      <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
      <div>
      <li
      class={`nav-item  ${
        props.location.pathname === "/register" ? "active" : ""
      }`}
    >
      <Link class="nav-link" to="/register">
        S'inscrire
      </Link>
    </li>


    <li
      class={`nav-item  ${
        props.location.pathname === "/login" ? "active" : ""
      }`}
    >
      <Link class="nav-link" to="/login">
        Connexion
        
      </Link>
    </li>
    </div>
    </div>
    </nav>
    </div>
    )

    
  } else {

    
    return (
      <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
      <div>
      <li
      class={`nav-item  ${
        props.location.pathname === "/profile" ? "active" : ""
      }`}
    >
      <Link class="nav-link" to="/profile">
        Mon Profil
      </Link>
    </li>


    <li
      class={`nav-item  ${
        props.location.pathname === "/logout" ? "active" : ""
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
}



function Navigation(props) {



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
                    props.location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <Link class="nav-link" to="/">
                    Accueil
                    <span class="sr-only">(current)</span>
                  </Link>
                </li>

                {DisplayLoginBar(props)}
  

  
                <li
                  class={`nav-item  ${
                    props.location.pathname === "/contact" ? "active" : ""
                  }`}
                >
                        <div class="nav-link">
                    <a href="mailto:groupomania-support@group.com" class="fLine">Contact</a>
                    </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
                
}

export default withRouter(Navigation);