import ErrorMessage from "../other/ErrorMessage";
import React from "react";
import { isEmail } from "validator";

function RegistrationValidations () {
    return ({

        required: value => {
            if (!value) {
                return (
                    <ErrorMessage message={"This field is required!"}/>
                );
            }
        },
        validateFirstname: value => {
            if (value.length < 2 || value.length > 20 || !/^[a-zA-Z][a-zA-Z\s]*$/.test(value)) {
                return (
                    <div style={{width: "30rem"}}>
                        <ErrorMessage message={"First Name must be between 2 and 20 alphabetical characters."}/>
                    </div>
                );
            }
        },
        validateLastname: value => {
            if (value.length < 2 || value.length > 20 || !/^[a-zA-Z][a-zA-Z\s]*$/.test(value)) {
                return (
                    <div style={{width: "30rem"}}>
                        <ErrorMessage message={"Last Name must be between 2 and 20 alphabetical characters."}/>
                    </div>
                );
            }
        },
        validateEmail: value => {
            if (!isEmail(value)) {
                return (
                    <ErrorMessage message={"This is not a valid email."}/>
                );
            }
        },
        validatePassword: value => {
            if (value.length < 8 || value.length > 40) {
                return (
                    <ErrorMessage message={"The password must be at least 8 characters."}/>
                );
            }
        },
        validateRole: (value) => {
            if (value !== "user" && value !== "pharmacy" && value !== "hospital") {
                return (
                    <ErrorMessage message={"Invalid Account Type."}/>
                );
            }
        },
        validatePhone: (value) => {
            let regex = '^01[0-2,5][0-9]{8}$';
            if (!value.match(regex)) {
                return (
                    <ErrorMessage message={"Invalid Phone Number Format."}/>
                );
            }
        },
    
    })
}

export default new RegistrationValidations();