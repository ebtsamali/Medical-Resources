import React from "react";
import '../../styles/registration_home.scss'
import PublicHeader from "../PublicHeader";
import { useHistory } from "react-router-dom";

const RegistrationHomePage = () => {

    let history = useHistory();

    const handleSignUpAsUser = () => {
        history.push("/register/user");
    }

    const handleSignUpAsHospital = () => {
        history.push("/register/hospital");
    }

    const handleSignUpAsPharmacy = () => {
        history.push("/register/pharmacy");
    }

    return (
        <div className="main-registration-container">
            <PublicHeader />
            <div className="registration-container">
                <div className="user-signup-container">
                    <h3>Register as User</h3>
                    <p>
                        You can reserve the room you select from the hospital you choose.<br></br>
                        Also, you can reserve and order medicines from multiple pharmacies as well.<br></br>
                        <b>All starts just When you Sign Up.</b>
                    </p>
                    <button onClick={handleSignUpAsUser} className="signup-btn">Sign Up as User</button>
                </div>

                <div className="hospital-signup-container">
                    <h3>Register as Hospital</h3>
                    <p>
                        You can add, edit and delete info about the rooms in the hospital you represent.<br></br>
                        Also, you can keep track of all the reservations you'll receive.<br></br>
                        <b>All starts just When you Sign Up.</b>
                    </p>
                    <button onClick={handleSignUpAsHospital} className="signup-btn">Sign Up as Hospital</button>
                </div>

                <div className="pharmacy-signup-container">
                    <h3>Register as Pharmacy</h3>
                    <p>
                        You can add, edit and delete info about the medicines in the pharmacy you represent.<br></br>
                        Also, you can keep track of all the reservations and orders you'll receive.<br></br>
                        <b>All starts just When you Sign Up.</b>
                    </p>
                    <button onClick={handleSignUpAsPharmacy} className="signup-btn">Sign Up as Pharmacy</button>
                </div>
            </div>
        </div>

    )
}

export default RegistrationHomePage
