import React from "react";
import HospitalForm from './hospitalForm';
import HospitalAdminForm from './hospitalAdminForm';
// import Header from '../User/HospitalsPage/header';
import Header from '../Header';

const HospitalRegistration = () => {
    return (
        <div>
            <Header />
            <div className="x-content">
                <HospitalAdminForm />
                <HospitalForm status="add" />
            </div>
        </div>
    )
}

export default HospitalRegistration