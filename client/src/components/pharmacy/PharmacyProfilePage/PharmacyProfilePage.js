import React, {useContext, useState} from "react";
import '../../../styles/pharmacy_profile.scss'
import PharmacyInfoCard from "./PharmacyInfoCard";
import PharmacyAdminInfoCard from "./PharmacyAdminInfoCard";
import Header from "../../Header";
import {AppContext} from "../../../providers/AppProvider";
const PharmacyProfilePage = () => {

    const {setTitle} = useContext(AppContext)
    setTitle('Pharmacy Profile')
    return (<div className="x-container-profile">
        <Header/>
        <div className="x-content">
            <PharmacyAdminInfoCard/>
            <PharmacyInfoCard/>
        </div>

    </div>)
}

export default PharmacyProfilePage
