import React from "react";
import UserInfo from "./UserInfo";
import PharmacyInfo from "./PharmacyInfo";

const InfoCard = () => {
    return(<div className="info-card-container">
        <UserInfo/>
        <PharmacyInfo/>
        <div className="x-footer">
            <h5><b>Total Price:</b> 2333</h5>
        </div>
    </div>)
}

export default InfoCard
