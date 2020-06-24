import React, { useState, useRef, useEffect, useContext } from "react";
import Form from 'react-validation/build/form';
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import '../../styles/user_registration.scss';
import '../../styles/login.scss'
import ErrorMessage from "../other/ErrorMessage";
import UserServices from '../../services/userServices';
import RegistrationValidations from "./RegistrationValidations";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from "react-router-dom";
import { AppContext } from "../../providers/AppProvider";
import { AuthContext } from "../../providers/auth_provider";
import { useHistory } from "react-router-dom";
import PublicHeader from "../PublicHeader";

let originalPassword = '';

const validateConfirmPassword = (value) => {
    if (value.length < 8 || value.length > 40 || value !== originalPassword) {
        return (
            <ErrorMessage message={"The password does not match."} />
        );
    }
}

const PharmacyRegistrationPage = (props) => {

    const { setTitle } = useContext(AppContext);
    const { setSuccessfulRegister, setRegisterMessage } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);
    const checkBtn = useRef(null);
    const form = useRef(null);
    let history = useHistory();

    useEffect(() => {
        setTitle('Medical Resources::Sign Up')
    }, []);

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        originalPassword = e.target.value;
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPass(e.target.value);
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage('');
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            UserServices.register(email, password, firstName, lastName, "pharmacy")
                .then(
                    response => {
                        setMessage(response.data.message);
                        setSuccessful(true);
                        setLoading(false);
                        setSuccessfulRegister(true);
                        setRegisterMessage(response.data.message);
                        history.push('/');
                    },
                    error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        setLoading(false);
                        setMessage(resMessage);
                        setSuccessful(false);
                        setSuccessfulRegister(false);
                        setRegisterMessage(resMessage);
                    }
                )
        } else {
            setLoading(false);
        }
    }

    return (
        <div className="register-page-container">
            <PublicHeader />
            <div className="x-container-mod">
                <div className="login-card">
                    <Link to="/register" style={{ color: "black", width: "70px" }}>
                        <span>
                            <ArrowBackIosIcon style={{ fontSize: "20px" }} />
                            <b>Back</b>
                        </span>
                    </Link>
                    <h3>Register as Pharmacy</h3>
                    <Form
                        onSubmit={handleRegister}
                        ref={form}
                    >
                        <Input
                            type="text"
                            className="email-input"
                            placeholder="First Name"
                            name="firstname"
                            value={firstName}
                            onChange={onChangeFirstName}
                            validations={[RegistrationValidations.required, RegistrationValidations.validateFirstname]}
                            style={{ width: "30rem" }}
                        />
                        <Input
                            type="text"
                            className="email-input"
                            placeholder="Last Name"
                            name="lastname"
                            value={lastName}
                            onChange={onChangeLastName}
                            validations={[RegistrationValidations.required, RegistrationValidations.validateLastname]}
                            style={{ width: "30rem" }}
                        />
                        <Input
                            type="text"
                            className="email-input"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[RegistrationValidations.required, RegistrationValidations.validateEmail]}
                            style={{ width: "30rem" }}
                        />
                        <Input
                            type="password"
                            className="password-input"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[RegistrationValidations.required, RegistrationValidations.validatePassword]}
                            style={{ width: "30rem" }}
                        />
                        <Input
                            type="password"
                            className="password-input"
                            placeholder="Re-type Password"
                            name="confirm-password"
                            value={confirmPass}
                            onChange={onChangeConfirmPassword}
                            validations={[RegistrationValidations.required, validateConfirmPassword]}
                            style={{ width: "30rem" }}
                        />

                        <button
                            className="login-btn"
                            disabled={loading}
                            style={{ width: "30rem" }}
                        >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Sign Up</span>
                        </button>
                        {message && (
                            <div className="form-group">
                                <div
                                    className={
                                        successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={checkBtn}
                        />
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default PharmacyRegistrationPage;
