import React from 'react';
import '../src/styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./components/LoginPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import PharmacyProfilePage from "./components/pharmacy/PharmacyProfilePage/PharmacyProfilePage";
import AuthProvider from "./providers/auth_provider";
import AuthRoute from "./components/AuthRoute";
import HomePage from "./components/HomePage";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import RegistrationPage from './components/Registration/RegistrationPage';

import HospitalRegistration from "./components/Hospital/hospitalRegistration";
import AllBeds from './components/Hospital/Beds/AllBeds';
import AddBed from './components/Hospital/Beds/BedForm';
import BedPage from './components/Hospital/Beds/BedPage';

import MedicinesPage from "./components/pharmacy/MedicinesPage/MedicinesPage";
import PharmacysPage from "./components/User/PharmacysPage/PharmacysPage";

import HospitalsPage from './components/User/HospitalsPage/hospitalsPage';
import AppProvider from "./providers/AppProvider";
import AppHead from "./components/other/AppHead";
import HospitalProfile from './components/User/HospitalsPage/hospitalProfile';
import CartPage from "./components/User/CartPage/CartPage";

function App() {
    return (
        <>
            <AppProvider>
            <Router>
            <AppHead/>
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
                    <AuthRoute path="/hospital/beds/edit" privilege="hospital">
                        <BedPage/>
                    </AuthRoute>
                    <AuthRoute path="/hospital" type="private" privilege="hospital">
                        <HospitalRegistration/>
                    </AuthRoute>

                    <Route exact path="/hospitals/:name" >
                        <HospitalProfile />
                    </Route>
                        <AuthRoute path="/user" type="private" privilege="user">
                            <HomePage/>
                        </AuthRoute>

                        <AuthRoute path="/user_cart" type="private" privilege="user">
                            <CartPage/>
                        </AuthRoute>
                        {/** <AuthRoute path="/hospital/edit" privilege="hospital">
                         <EditHospitalData/>
                         </AuthRoute>**/}
                        <AuthRoute path="/hospital" type="private" privilege="hospital">
                            <HospitalRegistration/>
                        </AuthRoute>

                        <AuthRoute path="/hospitals" type="private" privilege="user">
                            <HospitalsPage/>
                        </AuthRoute>


                    <AuthRoute path="/pharmacys" type="private" privilege="user">
                        <PharmacysPage/>
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
            </AppProvider>
        </>
    );
}

export default App;
