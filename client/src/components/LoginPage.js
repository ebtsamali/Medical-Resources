import React, {useState, useContext, useEffect} from "react";
import '../styles/login.scss'
import {AuthContext} from "../providers/auth_provider";
import ErrorMessage from "./other/ErrorMessage";
import { Link } from 'react-router-dom';
import {AppContext} from "../providers/AppProvider";

const LoginPage = (props) => {

    const { login, error } = useContext(AuthContext);
    const { setTitle } = useContext(AppContext);
    const [emailInput,setEmailInput] = useState('')
    const [passwordInput,setPasswordInput] = useState('')

    const handleEmailChange = (e) => {
        const {target:{value}} = e;
        setEmailInput(value);
    }

    const handlePasswordChange = (e) => {
        const {target:{value}} = e;
        setPasswordInput(value);
    }

    const handleLoginClick = (e) => {
        e.preventDefault()
        login(emailInput, passwordInput)
        setPasswordInput("")
        setEmailInput("")
    }

    return(<div className="x-container">
        <div className="login-card">
            <h3>Login</h3>
            <input className="email-input" placeholder="Email" type="text" value={emailInput} onChange={handleEmailChange}/>
            <input className="password-input" placeholder="Password" type="password" value={passwordInput} onChange={handlePasswordChange}/>
            {error && <ErrorMessage message={error}/>}
            <button className="login-btn" onClick={handleLoginClick}>LOGIN</button>
            <p>Or - <Link to="/register">Create New Account</Link></p>
        </div>
    </div>)
}

export default LoginPage
