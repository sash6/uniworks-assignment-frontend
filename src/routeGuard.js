import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
console.log("auth:" + localStorage.getItem('isAuthenticated'))
    return(
        <Route {...rest} render={(props) => (
            localStorage.getItem('isAuthenticated')
                ? <Component {...props} />
                : <Redirect to='/' />
        )} />
    )
}

export default GuardedRoute;