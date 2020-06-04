import React from 'react';
import '../src/styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./components/LoginPage/LoginPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import PharmacyProfilePage from "./components/PharmacyProfilePage/PharmacyProfilePage";
import AuthProvider from "./providers/auth_provider";
import AuthRoute from "./components/AuthRoute";
import HomePage from "./components/HomePage";
import HomePageHospital from "./components/HomePageHospital";
import Unauthorized from "./components/Unauthorized/Unauthorized";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <AuthRoute exact={true} path="/" type="guest">
                        <LoginPage/>
                    </AuthRoute>

                    <AuthRoute path="/login" type="guest">
                        <LoginPage/>
                    </AuthRoute>

                    <AuthRoute path="/user" type="private" privilege="user">
                        <HomePage/>
                    </AuthRoute>

                    <AuthRoute path="/hospital" type="private" privilege="hospital">
                        <HomePageHospital/>
                    </AuthRoute>

                    <AuthRoute path="/pharmacy_profile" type="private" privilege="pharmacy">
                        <PharmacyProfilePage/>
                    </AuthRoute>

                    <Route path="/unauthorized" component={Unauthorized}/>
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
