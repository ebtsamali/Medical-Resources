import React, {useState} from "react";
import '../../styles/pharmacy_profile.scss'
import PharmacyInfoCard from "./PharmacyInfoCard";

const PharmacyProfilePage = () => {

    return (<div className="x-container-profile">
        <div className="x-content">

            <PharmacyInfoCard/>
        </div>

    </div>)
}

export default PharmacyProfilePage
