import React from "react";
import MedicineList from "./MedicineList";

const PharmacyInfo = () => {
    return(<div className="pharmacy-info-container">
        <h4>Pharmacy Info</h4>
        <div>
            <div>
                <input className="form-input" disabled={true} type="text" value="Pharmacy"/>
            </div>
            <div>
                <input className="form-input w-100" disabled={true} type="text" value="12 asdwq sadsa, ASSA, qweqwewwq"/>
            </div>
        </div>
        <h6 className="mt-3 ml-3"><b>Status: </b>pending</h6>
        <h6 className="mt-2 ml-3">Mecicine List</h6>
        <MedicineList/>
    </div>)
}

export default PharmacyInfo
