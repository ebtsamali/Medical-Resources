import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../providers/auth_provider";

const AuthRoute = (props) => {
    const { type, privilege } = props;
    const { setError } = useContext(AuthContext);

    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        let hoursDiff = (Date.now() - user.accessTokenCreationDate) / 36e5;
        if (hoursDiff > (user.accessTokenTTL / 3600)) {
            localStorage.removeItem('user');
            setError('Session Expired. Please Login Again.');
            return <Redirect to="/" />;
        }
    }
    if (type === "guest" && user) {
        if (user.role === 'user') {
            return <Redirect to="/user" />;
        } else if (user.role === 'hospital') {
            return <Redirect to="/hospital" />
        } else if (user.role === 'pharmacy') {
            if (user.profileIsCompleted) {
                return <Redirect to="/medicines" />
            } else {
                return <Redirect to="/pharmacy_profile" />
            }
        }
    }
    else if (type === "private" && !user) {
        return <Redirect to="/login" />;
    }

    if (type === "private" && user && privilege === user.role) {
        return <Route {...props} />;
    } else if (type === "private" && user && privilege !== user.role) {
        return <Redirect to="/unauthorized" />
    }
    return <Route {...props} />;
}

export default AuthRoute
