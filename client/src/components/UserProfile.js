
import React, { useState, useEffect, useContext, useRef } from "react";
import UserServices from "../services/userServices";
import { AuthContext } from "../providers/auth_provider";
import RegistrationValidations from "./Registration/RegistrationValidations";
import Form from 'react-validation/build/form';
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const UserProfile = () => {

    const { user } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState({});
    const [birthdate, setBirthDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
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

    const onChangeBirthdate = (e) => {
        setBirthDate(e.target.value);
    }

    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }

    const onChangeGovernorate = (e) => {
        setAddress({ ...address, governorate: e.target.value });
    }

    const onChangeDistrict = (e) => {
        setAddress({ ...address, district: e.target.value });
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
        if (checkBtn.current.context._errors.length === 0) {
            UserServices.update(email, firstName, lastName, birthdate, phoneNumber, address, user.id)
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
                        type="date"
                        className="email-input"
                        placeholder="Birth Date"
                        name="birthdate"
                        value={birthdate}
                        onChange={onChangeBirthdate}
                        validations={[RegistrationValidations.required]}
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
                    <Input
                        type="text"
                        className="email-input"
                        placeholder="Governorate"
                        name="governorate"
                        value={address.governorate ? address.governorate : ''}
                        onChange={onChangeGovernorate}
                        validations={[RegistrationValidations.required]}
                        style={{ width: "30rem" }}
                    />
                    <Input
                        type="text"
                        className="email-input"
                        placeholder="District"
                        name="district"
                        value={address.district ? address.district : ''}
                        onChange={onChangeDistrict}
                        validations={[RegistrationValidations.required]}
                        style={{ width: "30rem" }}
                    />
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
