import React, { useState, useRef } from "react";
import Form from 'react-validation/build/form';
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { makeStyles } from '@material-ui/core/styles';
import '../../styles/login.scss'
import ErrorMessage from "../other/ErrorMessage";
import UserServices from '../../services/userServices';
import RegistrationValidations from "./RegistrationValidations";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    select: {
        '&:before': {
            borderColor: "#4ABBA9",
        },
        '&:after': {
            borderColor: "#4ABBA9",
        }
    },
    icon: {
        fill: "#4ABBA9",
    },
    label: {
        '.MuiInputLabel-root': {
            color: "#4ABBA9",
        }
    },
}));
let originalPassword = '';

const validateConfirmPassword = (value) => {
    // console.log(this.originalPassword);
    if (value.length < 8 || value.length > 40 || value !== originalPassword) {
        return (
            <ErrorMessage message={"The password does not match."}/>
        );
    }
}

const RegistrationPage = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("");
    const [confirmPass, setConfirmPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);
    const [validRole, setValidRole] = useState(true);
    const [validRoleMessage, setValidRoleMessage] = useState(null);
    const checkBtn = useRef(null);
    const form = useRef(null);
    const [roles] = useState(["user", "hospital", "pharmacy"]);
    const classes = useStyles();

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

    const onChangeRole = (e) => {
        setRole(e.target.value);
        setValidRole(true);
        setValidRoleMessage(null);
        let reqReturn = RegistrationValidations.required(e.target.value);
        if(reqReturn) {
            setValidRole(false);
            setValidRoleMessage(reqReturn);
            return;
        }
        let validReturn = RegistrationValidations.validateRole(e.target.value);
        if(validReturn) {
            setValidRole(false);
            setValidRoleMessage(validReturn);
        }
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage('');
        setLoading(true);
        setValidRole(true);
        setValidRoleMessage(null);

        form.current.validateAll();
        let reqReturn = RegistrationValidations.required(role);
        if(reqReturn) {
            setValidRole(false);
            setValidRoleMessage(reqReturn);
            setMessage('');
            setLoading(false);
            return;
        }
        let validReturn = RegistrationValidations.validateRole(role);
        if(validReturn) {
            setValidRole(false);
            setValidRoleMessage(validReturn);
            setMessage('');
            setLoading(false);
            return;
        }
        if (checkBtn.current.context._errors.length === 0) {
            UserServices.register(email, password, firstName, lastName, role)
                .then(
                    response => {
                        setMessage(response.data.message);
                        setSuccessful(true);
                        setLoading(false);
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
                    }
                )
        } else {
            setLoading(false);
        }
    }

    return(
    <div className="x-container">
        <div className="login-card">
            <h3>Register</h3>
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
                    style={{width: "30rem"}}
                />
                <Input
                    type="text"
                    className="email-input"
                    placeholder="Last Name"
                    name="lastname"
                    value={lastName}
                    onChange={onChangeLastName}
                    validations={[RegistrationValidations.required, RegistrationValidations.validateLastname]}
                    style={{width: "30rem"}}
                />
                <Input
                    type="text"
                    className="email-input"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[RegistrationValidations.required, RegistrationValidations.validateEmail]}
                    style={{width: "30rem"}}
                />
                <Input
                    type="password"
                    className="password-input"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[RegistrationValidations.required, RegistrationValidations.validatePassword]}
                    style={{width: "30rem"}}
                />
                <Input
                    type="password"
                    className="password-input"
                    placeholder="Re-type Password"
                    name="confirm-password"
                    value={confirmPass}
                    onChange={onChangeConfirmPassword}
                    validations={[RegistrationValidations.required, validateConfirmPassword]}
                    style={{width: "30rem"}}
                />
                <FormControl style={{width: "29rem", marginLeft: "0.8rem"}}>
                    <InputLabel id="demo-simple-select-outlined-label">Account Type</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={role}
                    onChange={onChangeRole}
                    className={classes.select}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        }
                    }}
                    >        
                        {roles.map((r) => {
                            return (
                                <MenuItem key={r} value={r}>{r}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl><br/>
                {!validRole && <div style={{width: "30rem"}}>{validRoleMessage}</div>}
                <button
                    className="login-btn"
                    disabled={loading}
                    style={{width: "30rem"}}
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
    </div>)
}

export default RegistrationPage;
