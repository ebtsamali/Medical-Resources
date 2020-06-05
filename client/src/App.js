import React from 'react';
import './App.css';
import '../src/styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./components/LoginPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import AuthProvider from "./providers/auth_provider";
import AuthRoute from "./components/AuthRoute";
import HomePage from "./components/HomePage";
import HomePageHospital from "./components/HomePageHospital";
import HomePagePharmacy from "./components/HomePagePharmacy";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import RegistrationPage from './components/Registration/RegistrationPage';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <AuthRoute exact={true} path="/" type="guest">
                        {/*<AuthProvider>*/}
                        <LoginPage/>
                        {/*</AuthProvider>*/}
                    </AuthRoute>
                    <AuthRoute path="/login" type="guest">

                        <LoginPage/>

                    </AuthRoute>

                    <AuthRoute path="/register" type="guest">
                        <RegistrationPage/>
                    </AuthRoute>

                    <AuthRoute path="/user" type="private" privilege="user">
                        <HomePage/>
                    </AuthRoute>
                    <AuthRoute path="/hospital" type="private" privilege="hospital">
                        <HomePageHospital/>
                    </AuthRoute>
                    <AuthRoute path="/pharmacy" type="private" privilege="pharmacy">
                        <HomePagePharmacy/>
                    </AuthRoute>
                    <Route path="/unauthorized" component={Unauthorized}/>
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
