import React, { useState, useContext, useEffect } from "react";
import '../styles/public_home.scss'
import { AuthContext } from "../providers/auth_provider";
import ErrorMessage from "./other/ErrorMessage";
import { Link } from 'react-router-dom';
import { AppContext } from "../providers/AppProvider";
import LoginWithFacebook from './login/loginWithFacebook';

const LoginPage = (props) => {

    const { login, error, successfulRegister, registerMessage } = useContext(AuthContext);
    const { setTitle } = useContext(AppContext);
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    useEffect(() => {
        setTitle('Medical Resources::Login')
    }, []);

    const handleEmailChange = (e) => {
        const { target: { value } } = e;
        setEmailInput(value);
    }

    const handlePasswordChange = (e) => {
        const { target: { value } } = e;
        setPasswordInput(value);
    }

    const handleLoginClick = (e) => {
        e.preventDefault()
        login(emailInput, passwordInput)
        setPasswordInput("")
        setEmailInput("")
    }

    return (
        <div className="main-container">
            <div className="left-container">
                <span className="proj-title">
                    <h1>Medical Resources</h1>
                    <h5>Where Hospitals, Pharmacies and Users come Together</h5>
                </span>
                <span className="separator"></span>
                <p>
                    Reserve the Room at the Hospital you select.<br></br>
                    Reserve and Order the Medicine you want from the Pharmacy you Choose.<br></br>
                    <b>All in One Place.</b>
                </p>
            </div>
            <div className="right-container">
                <div className="login-card-mod">
                    <h3>Login</h3>
                    <input className="email-input-mod" placeholder="Email" type="text" value={emailInput} onChange={handleEmailChange} />
                    <input className="password-input-mod" placeholder="Password" type="password" value={passwordInput} onChange={handlePasswordChange} />
                    {error && <ErrorMessage message={error} />}
                    <button className="login-btn" onClick={handleLoginClick}>LOGIN</button>
                    <LoginWithFacebook />
                    <p>Or - <Link to="/register">Create New Account</Link></p>
                    {registerMessage && (
                        <div className="form-group">
                            <div
                                className={
                                    successfulRegister
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {registerMessage}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoginPage
