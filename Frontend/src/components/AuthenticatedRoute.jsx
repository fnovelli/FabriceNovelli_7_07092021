import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Auth from "../contexts/Auth"
import {Route} from "react-router-dom"

const AuthenticatedRoute = ({ path, component}) => {

  const { isAuthenticated } = useContext(Auth);

  return isAuthenticated ? (
      <Route exact path={path} component={component} />
  ) : ( 
      <Redirect to="login" />
  )
}

export default AuthenticatedRoute;