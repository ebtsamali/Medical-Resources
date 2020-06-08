import React from "react";
import { Redirect, Route } from "react-router-dom";

const AuthRoute = (props) => {
    const { type, privilege } = props;
    const user  = JSON.parse(localStorage.getItem("user"))
    if (type === "guest" && user ) {
        if(user.role === 'user') {
            return <Redirect to="/user" />;
        } else if(user.role === 'hospital') {
            return <Redirect to="/hospital"/>
        } else if(user.role === 'pharmacy') {
            if(user.profileIsCompleted){
                return <Redirect to="/medicines"/>
            } else {
                return <Redirect to="/pharmacy_profile"/>
            }
        }
    }
    else if (type === "private" && !user) {
        return <Redirect to="/login"/>;
    }

    if(type === "private" && user && privilege === user.role) {
        return <Route {...props} />;
    } else if(type === "private" && user && privilege !== user.role ) {
        return <Redirect to="/unauthorized"/>
    }
    return <Route {...props} />;
}

export default AuthRoute
