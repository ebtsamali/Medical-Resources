import React, { useState, useContext, useEffect } from "react";
import '../styles/public_home.scss'
import { AuthContext } from "../providers/auth_provider";
import ErrorMessage from "./other/ErrorMessage";
import { AppContext } from "../providers/AppProvider";
import UserService from "../services/userServices";
import { useLocation, useHistory } from "react-router-dom";
import PublicHeader from "./PublicHeader";

const ResetPasswordPage = (props) => {

    const { error, setError, setSuccessfulRegister, setRegisterMessage } = useContext(AuthContext);
    const { setTitle } = useContext(AppContext);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const token = useLocation().pathname.split('/')[3];
    let history = useHistory();

    useEffect(() => {
        setTitle('Medical Resources::Reset Password')
    }, []);


    const handlePasswordChange = (e) => {
        const { target: { value } } = e;
        setPassword(value);
    }

    const handlePasswordConfirmChange = (e) => {
        const { target: { value } } = e;
        setPasswordConfirm(value);
    }

    const handleResetClick = (e) => {
        e.preventDefault()
        if (!password) {
            return setError("Password is Required.");
        }
        if (!passwordConfirm) {
            return setError("You should Retype your Password.");
        }
        if (password && password.length !== 8) {
            return setError("Password must be at least 8 characters.");
        }
        if (password !== passwordConfirm) {
            return setError("Password does not match.");
        }
        UserService.updatePassword(password, token)
            .then(response => {
                setSuccessfulRegister(true);
                setRegisterMessage(response.data.message);
                setError("");
                history.push('/');
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
                history.push('/');
            });
        setPassword("");
        setPasswordConfirm("");
    }


    return (
        <>
            <PublicHeader />
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
                        <h3>Reset Password</h3>
                        <input className="password-input-mod" placeholder="Password" type="password" value={password} onChange={handlePasswordChange} />
                        <input className="password-input-mod" placeholder="Retype Password" type="password" value={passwordConfirm} onChange={handlePasswordConfirmChange} />
                        {error && <ErrorMessage message={error} />}
                        <button className="login-btn" onClick={handleResetClick}>RESET PASSWORD</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPasswordPage;
