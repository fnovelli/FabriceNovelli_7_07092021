import React, { useContext } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { Logout } from "./Logout";
import Auth from "../contexts/Auth";


const NavBar = () => {
  
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);

  const handleLogout = () => {
    Logout();
    setIsAuthenticated(false);
  }

  
return (

<div className="navigation">
    <div className=" navbar-dark">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            
          </Link>

          <div>
            <ul className="navbar-nav ml-auto">
              <li>
                  <Link className="nav-link" to="/">
                  Accueil
                  <span className="sr-only">(current)</span>
                </Link>
              </li>


                  <div>
                    { (!isAuthenticated && (
                      <>
                  <li>
                  <Link className="nav-link" to="/register">
                    S'inscrire
                  </Link>
                  </li>


                  <li>
                  <Link className="nav-link" to="/login">
                    Connexion
                    
                  </Link>
                  </li>
                  </>
                    )) || (
                      <>
             
          
                  <li>
                  <NavLink className="nav-link" to="/account">
                    Mon Compte
                  </NavLink>
                  </li>


                  <li>
                  <Link className="nav-link" to="/" onClick={ handleLogout }>
                    Déconnexion
                  </Link>
                  </li>


                      </>)
                  }
                  </div>
              <li>
           
                  <a className="nav-link" href="mailto:groupomania@support.com">Contact</a>
     
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    </div>
  )
  };

export default withRouter(NavBar);