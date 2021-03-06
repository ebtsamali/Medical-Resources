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
import Unauthorized from "./components/Unauthorized/Unauthorized";

import RegistraionHome from "./components/Registration/RegistrationHomePage";
import UserRegistrationPage from './components/Registration/UserRegistrationPage';
import HospitalRegistrationPage from './components/Registration/HospitalRegistrationPage';
import PharmacyRegistrationPage from './components/Registration/PharmcyRegistrationPage';

import HospitalRegistration from "./components/Hospital/hospitalRegistration";
import BedPage from './components/Hospital/Beds/BedPage';
import HospitalReservations from './components/Hospital/viewReservation';
import HospitalReservation from './components/Hospital/editReservationModal';

import MedicinesPage from "./components/pharmacy/MedicinesPage/MedicinesPage";
import PharmacysPage from "./components/User/PharmacysPage/PharmacysPage";
import PharmacyProfile from './components/User/PharmacysPage/PharmacyProfile';

import HospitalsPage from './components/User/HospitalsPage/hospitalsPage';
import HospitalProfile from './components/User/HospitalsPage/hospitalProfile';
import CartPage from "./components/User/CartPage/CartPage";
import ReservationStatusPage from "./components/User/PreviewStatusPage/ReservationStatusPage";
import OrderStatusPage from "./components/User/PreviewStatusPage/OrderStatusPage";
import UserHistory from "./components/User/HomePage/UserHomePage";
import UserProfile from "./components/UserProfile";
import MailActivationPage from './components/MailActivation';
import UserHome from './components/User/UserHome';
import LoginWithGoogleSuccess from "./components/User/LoginWithGoogleSuccess";
import ForgetPassword from "./components/ForgetPassword";


function App() {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Switch>
                        <AuthRoute exact={true} path="/" type="guest">
                            <LoginPage/>
                        </AuthRoute>

                        <AuthRoute path="/login" type="guest">
                            <LoginPage/>

                        </AuthRoute>

                        <AuthRoute path="/auth/google/success" type="guest">
                            <LoginWithGoogleSuccess/>
                        </AuthRoute>

                        <AuthRoute exact path="/register/user" type="guest">
                            <UserRegistrationPage/>
                        </AuthRoute>

                        <AuthRoute exact path="/register/hospital" type="guest">
                            <HospitalRegistrationPage/>
                        </AuthRoute>

                        <AuthRoute exact path="/register/pharmacy" type="guest">
                            <PharmacyRegistrationPage/>
                        </AuthRoute>
                        
                        <AuthRoute path="/register" type="guest">
                            {/* <UserRegistrationPage /> */}
                            <RegistraionHome />
                        </AuthRoute>

                        <AuthRoute path="/user/activation/:token" type="guest">
                            <MailActivationPage/>
                        </AuthRoute>

                        <AuthRoute path="/password/reset/:token" type="guest">
                            <ForgetPassword/>
                        </AuthRoute>
                        
                        <AuthRoute exact path="/user/home" type="private" privilege="user">
                            <UserHome />
                        </AuthRoute>

                        <AuthRoute path="/user/profile" type="private" privilege="user">
                            <UserProfile />
                        </AuthRoute>
                        
                        <AuthRoute path="/user" type="private" privilege="user">
                            <UserHistory />
                        </AuthRoute>

                        <AuthRoute path="/hospital/beds/edit" privilege="hospital">
                            <BedPage/>
                        </AuthRoute>

                        <AuthRoute exact path="/hospital/reservations" type="private" privilege="hospital">
                            <HospitalReservations/>
                        </AuthRoute>

                        <AuthRoute exact path="/hospital" type="private" privilege="hospital">
                            <HospitalRegistration/>
                        </AuthRoute>

                        <AuthRoute exact path="/hospital/reservation" type="private" privilege="hospital">
                            <HospitalReservation/>
                        </AuthRoute>

                        <AuthRoute exact path="/hospitals" type="public" >
                            <HospitalsPage/>
                        </AuthRoute>

                        <AuthRoute exact path="/hospitals/:name" type="public">
                            <HospitalProfile/>
                        </AuthRoute>
                        
                        <AuthRoute path="/reservation/:id" type="private" privilege="user">
                            <ReservationStatusPage/>
                        </AuthRoute>

                        <AuthRoute path="/order/:id" type="private" privilege="user">
                            <OrderStatusPage/>
                        </AuthRoute>
                        
                        <AuthRoute path="/user_cart" type="public">
                            <CartPage/>
                        </AuthRoute>

                        <AuthRoute exact path="/pharmacys" type="public" >
                            <PharmacysPage/>
                        </AuthRoute>

                        <AuthRoute exact path="/pharmacys/:name" type="public" >
                            <PharmacyProfile/>
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
        </>
    );
}

export default App;
