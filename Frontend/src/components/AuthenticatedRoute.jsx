import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Auth from "../contexts/Auth"
import {Route} from "react-router-dom"

function AuthenticatedRoute ({component: Component, authed, ...rest}) {


    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }

export default AuthenticatedRoute;