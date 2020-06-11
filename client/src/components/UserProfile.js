import React, { useState, useEffect, useContext, useRef } from "react";
import UserServices from "../services/userServices";
import GovernorateServices from "../services/governorateService";
import { AuthContext } from "../providers/auth_provider";
import RegistrationValidations from "./Registration/RegistrationValidations";
import Form from 'react-validation/build/form';
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import ErrorMessage from "./other/ErrorMessage";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';

let originalPassword = '';

const validateConfirmPassword = (value) => {
    if (value.length < 8 || value.length > 40 || value !== originalPassword) {
        return (
            <ErrorMessage message={"The password does not match."} />
        );
    }
}

const UserProfile = () => {

    const { user } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const [validPasswordMessage, setValidPasswordMessage] = useState(null);
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);
    const [validConfirmPasswordMessage, setValidConfirmPasswordMessage] = useState(null);
    const [address, setAddress] = useState({});
    const [birthdate, setBirthDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [governorates, setGovernorates] = useState([]);
    const [validGov, setValidGov] = useState(true);
    const [validGovMessage, setValidGovMessage] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [validDistrict, setValidDistrict] = useState(true);
    const [validDistrictMessage, setValidDistrictMessage] = useState(null);
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);
    const [loading, setLoading] = useState(false);
    const checkBtn = useRef(null);
    const form = useRef(null);

    useEffect(() => {
        UserServices.getUserInfo(user.id)
            .then(response => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                if (response.data.address) setAddress(response.data.address);
                if (response.data.birthdate) setBirthDate(response.data.birthdate.split('T')[0]);
                if (response.data.phoneNumber) setPhoneNumber(response.data.phoneNumber);
            })
            .catch(error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoading(false);
                setMessage(resMessage);
                setSuccessful(false);
            });

        GovernorateServices.getAllGovernorates()
            .then(response => {
                setGovernorates(response.data.governorates);
            })
            .catch(error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoading(false);
                setMessage(resMessage);
                setSuccessful(false);
            })

    }, []);

    useEffect(() => {
        if (address.governorate !== "") {
            governorates.forEach((gov) => {
                if (gov.name === address.governorate) {
                    setDistricts(gov.districts);
                }
            })
        }
    }, [address.governorate]);

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
        if (e.target.value !== "") {
            setValidPassword(true);
            setValidPasswordMessage(null);
            let reqReturn = RegistrationValidations.required(e.target.value);
            if (reqReturn) {
                setValidPassword(false);
                setValidPasswordMessage(reqReturn);
                return;
            }
            let validReturn = RegistrationValidations.validatePassword(e.target.value);
            if (validReturn) {
                setValidPassword(false);
                setValidPasswordMessage(validReturn);
            }
        } else {
            setValidPassword(true);
            setValidPasswordMessage(null);
        }
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPass(e.target.value);
        if (password && e.target.value !== "") {
            setValidConfirmPassword(true);
            setValidConfirmPasswordMessage(null);
            let reqReturn = RegistrationValidations.required(e.target.value);
            if (reqReturn) {
                setValidConfirmPassword(false);
                setValidConfirmPasswordMessage(reqReturn);
                return;
            }
            let validReturn = validateConfirmPassword(e.target.value);
            if (validReturn) {
                setValidConfirmPassword(false);
                setValidConfirmPasswordMessage(validReturn);
            }
        } else {
            setValidConfirmPassword(true);
            setValidConfirmPasswordMessage(null);
        }
    }

    const onChangeBirthdate = (e) => {
        setBirthDate(e.target.value);
    }

    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }

    const onChangeGovernorate = (e) => {
        setAddress({ ...address, governorate: e});
        setValidGov(true);
        setValidGovMessage(null);
        let reqReturn = RegistrationValidations.required(e);
        if (reqReturn) {
            setValidGov(false);
            setValidGovMessage(reqReturn);
            return;
        }
    }

    const onChangeDistrict = (e) => {
        setAddress({ ...address, district: e });
        setValidDistrict(true);
        setValidDistrictMessage(null);
        let reqReturn = RegistrationValidations.required(e);
        if (reqReturn) {
            setValidDistrict(false);
            setValidDistrictMessage(reqReturn);
            return;
        }
    }

    const onChangeStreet = (e) => {
        setAddress({ ...address, street: e.target.value });
    }

    const onChangeBlockNum = (e) => {
        setAddress({ ...address, blockNum: e.target.value });
    }

    const onChangeFlatNum = (e) => {
        setAddress({ ...address, flatNum: e.target.value });
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        setMessage('');
        setLoading(true);

        form.current.validateAll();
        if (password) {
            let reqReturn = RegistrationValidations.required(password);
            if (reqReturn) {
                setValidPassword(false);
                setValidPasswordMessage(reqReturn);
                setMessage('');
                setLoading(false);
                return;
            }
            let validReturn = RegistrationValidations.validatePassword(password);
            if (validReturn) {
                setValidPassword(false);
                setValidPasswordMessage(validReturn);
                setMessage('');
                setLoading(false);
                return;
            }
        }
        let reqGov = RegistrationValidations.required(address.governorate);
        if (reqGov) {
            setValidGov(false);
            setValidGovMessage(reqGov);
            setMessage('');
            setLoading(false);
            return;
        }
        let reqDis = RegistrationValidations.required(address.district);
        if (reqDis) {
            setValidDistrict(false);
            setValidDistrictMessage(reqDis);
            setMessage('');
            setLoading(false);
            return;
        }
        if (checkBtn.current.context._errors.length === 0) {
            UserServices.update(email, firstName, lastName, birthdate, phoneNumber, address, password, user.id)
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


    return (
        <div className="x-container">
            <div className="login-card mt-3 mb-3">
                <h3>Update Profile</h3>
                <Form
                    onSubmit={handleUpdate}
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
                        placeholder="Enter New Password"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        style={{ width: "30rem" }}
                    />
                    {!validPassword && <div style={{ width: "30rem" }}>{validPasswordMessage}</div>}
                    <Input
                        type="password"
                        className="password-input"
                        placeholder="Re-type Password"
                        name="confirm-password"
                        value={confirmPass}
                        onChange={onChangeConfirmPassword}
                        disabled={password ? false : true}
                        style={{ width: "30rem" }}
                    />
                    {!validConfirmPassword && <div style={{ width: "30rem" }}>{validConfirmPasswordMessage}</div>}
                    <Input
                        type="date"
                        className="email-input"
                        placeholder="Birth Date"
                        name="birthdate"
                        value={birthdate}
                        onChange={onChangeBirthdate}
                        style={{ width: "30rem" }}
                    />
                    <Input
                        type="text"
                        className="email-input"
                        placeholder="Phone Number"
                        name="phonenumber"
                        value={phoneNumber}
                        onChange={onChangePhoneNumber}
                        validations={[RegistrationValidations.required, RegistrationValidations.validatePhone]}
                        style={{ width: "30rem" }}
                    />
                    <Dropdown onSelect={onChangeGovernorate} style={{ marginLeft: "0.4rem"}}>
                        <DropdownToggle style={{width: "29rem"}}>
                            {address.governorate ? address.governorate : "Governorate"}
                        </DropdownToggle>
                        <DropdownMenu style={{width: "29rem"}}>
                            {governorates.map((gov) => {
                                return (
                                    <DropdownItem key={gov._id} eventKey={gov.name}>{gov.name}</DropdownItem>
                                )
                            })}
                        </DropdownMenu>
                    </Dropdown>
                    {!validGov && <div style={{ width: "30rem" }}>{validGovMessage}</div>}
                    <Dropdown onSelect={onChangeDistrict} style={{ marginLeft: "0.4rem", marginTop: "0.8rem"}}>
                        <DropdownToggle style={{width: "29rem"}}>
                            {address.district ? address.district : "District"}
                        </DropdownToggle>
                        <DropdownMenu style={{width: "29rem"}}>
                            {districts.map((district, index) => {
                                return (<DropdownItem key={index} eventKey={district}>{district}</DropdownItem>)
                            })}
                        </DropdownMenu>
                    </Dropdown>
                    {!validDistrict && <div style={{ width: "30rem", marginBottom: "0.6rem" }}>{validDistrictMessage}</div>}
                    <Input
                        type="text"
                        className="email-input"
                        placeholder="Street"
                        name="street"
                        value={address.street ? address.street : ''}
                        onChange={onChangeStreet}
                        validations={[RegistrationValidations.required]}
                        style={{ width: "30rem" }}
                    />
                    <Input
                        type="text"
                        className="email-input"
                        placeholder="Block Number"
                        name="block-num"
                        value={address.blockNum ? address.blockNum : ''}
                        onChange={onChangeBlockNum}
                        validations={[RegistrationValidations.required]}
                        style={{ width: "30rem" }}
                    />
                    <Input
                        type="text"
                        className="email-input"
                        placeholder="Flat Number"
                        name="flat-num"
                        value={address.flatNum ? address.flatNum : ''}
                        onChange={onChangeFlatNum}
                        validations={[RegistrationValidations.required]}
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
                        <span>Update</span>
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
                                {successful && <a href="/user" className="ml-3">Go To Home</a>}
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
    )
}
export default UserProfile;
