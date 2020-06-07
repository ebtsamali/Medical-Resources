import React from 'react';
import '../src/styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./components/LoginPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import PharmacyProfilePage from "./components/PharmacyProfilePage/PharmacyProfilePage";
import AuthProvider from "./providers/auth_provider";
import AuthRoute from "./components/AuthRoute";
import HomePage from "./components/HomePage";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import RegistrationPage from './components/Registration/RegistrationPage';

import HospitalRegistration from "./components/Hospital/hospitalRegistration";
// import EditHospitalData from './components/Hospital/editHospitalData';

import MedicinesPage from "./components/MedicinesPage/MedicinesPage";
import PharmacysPage from "./components/User/PharmacysPage/PharmacysPage";

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

                    <AuthRoute path="/register" type="guest">
                        <RegistrationPage/>
                    </AuthRoute>

                    <AuthRoute path="/user" type="private" privilege="user">
                        <HomePage/>
                    </AuthRoute>
                    {/** <AuthRoute path="/hospital/edit" privilege="hospital">
                        <EditHospitalData/>
                    </AuthRoute>**/}
                    <AuthRoute path="/hospital" privilege="hospital">
                        <HospitalRegistration/>
                    </AuthRoute>

                    <AuthRoute path="/pharmacys" type="private" privilege="user">
                        <PharmacysPage/>
                    </AuthRoute>

                    <AuthRoute path="/pharmacy_profile" type="private" privilege="pharmacy">
                        <PharmacyProfilePage/>
                    </AuthRoute>
                    <AuthRoute path="/medicines" type="private" privilege="pharmacy">
                        <MedicinesPage/>
                    </AuthRoute>

                    <Route path="/unauthorized" component={Unauthorized}/>
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
