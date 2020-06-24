import React, { useState, useContext, useEffect } from "react";
import '../styles/public_home.scss'
import { AuthContext } from "../providers/auth_provider";
import ErrorMessage from "./other/ErrorMessage";
import { Link, withRouter } from 'react-router-dom';
import { AppContext } from "../providers/AppProvider";
import LoginWithFacebook from './loginWithFacebook';
import UserService from "../services/userServices";
import PublicHeader from "./PublicHeader";

const LoginPage = (props) => {
    let windowObjectReference = null;
    let previousUrl = null;
    const { login, error, setError, successfulRegister, setSuccessfulRegister, registerMessage, setRegisterMessage, user, setUser } = useContext(AuthContext);
    const { setTitle } = useContext(AppContext);
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    useEffect(() => {
        setTitle('Medical Resources::Login')
    }, []);

    useEffect(() => {
        console.log("AAAAA")
        if (user)
            props.history.push("/")
    }, [user])

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
        setSuccessfulRegister(false);
        setRegisterMessage("");
    }

    const handleLoginWithGoogleClick = (url, name) => {
        return () => {
            // window features
            const strWindowFeatures =
                'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

            if (windowObjectReference === null || windowObjectReference.closed) {
                /* if the pointer to the window object in memory does not exist
                 or if such pointer exists but the window was closed */
                windowObjectReference = window.open(url, name, strWindowFeatures);
            } else if (previousUrl !== url) {
                /* if the resource to load is different,
                 then we load it in the already opened secondary window and then
                 we bring such window back on top/in front of its parent window. */
                windowObjectReference = window.open(url, name, strWindowFeatures);
                windowObjectReference.focus();
            } else {
                /* else the window reference must exist and the window
                 is not closed; therefore, we can bring it back on top of any other
                 window with the focus() method. There would be no need to re-create
                 the window or to reload the referenced resource. */
                windowObjectReference.focus();
            }
            // assign the previous URL
            previousUrl = url;
        }
    }

    const handleResetPassword = (e) => {
        e.preventDefault();
        if(!emailInput) {
            return setError("You must provide your email.");
        }
        UserService.passwordReset(emailInput)
            .then(response => {
                setUser(response.data.user);
                setSuccessfulRegister(true);
                setRegisterMessage(response.data.message);
                setError("");
            })
            .catch(error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setSuccessfulRegister(false);
                setRegisterMessage(resMessage);
            })
    }

    return (
        <div className="login-page-container">
        <PublicHeader/>
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
                    <button className="login-with-google-btn" onClick={handleLoginWithGoogleClick(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, 'Login With Google')}>Login With Google As User</button>
                    <LoginWithFacebook />
                    {/*<p>Or - <Link to="/register">Create New Account</Link></p>*/}
                    <p><a href="" onClick={handleResetPassword}>Forgot your Password?</a></p>
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

        </div>
    )
}

export default withRouter(LoginPage)
