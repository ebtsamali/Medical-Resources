import React, {useState} from "react";
import '../../styles/pharmacy_profile.scss'
import PharmacyInfoCard from "./PharmacyInfoCard";
import PharmacyAdminInfoCard from "./PharmacyAdminInfoCard";

const PharmacyProfilePage = () => {

    return (<div className="x-container-profile">
        <div className="x-content">
            <PharmacyAdminInfoCard/>
            <PharmacyInfoCard/>
        </div>

    </div>)
}

export default PharmacyProfilePage
