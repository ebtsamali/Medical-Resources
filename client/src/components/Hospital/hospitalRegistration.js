import React from "react";
import HospitalForm from './hospitalForm';
import HospitalAdminForm from './hospitalAdminForm';
import Header from '../User/HospitalsPage/header';

const HospitalRegistration = () => {
    return(
        <div>
            <Header />
            <HospitalAdminForm />
            <HospitalForm status="add"/>
        </div>
    )
}

export default HospitalRegistration