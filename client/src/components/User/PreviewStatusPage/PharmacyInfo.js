import React from "react";
import MedicineList from "./MedicineList";

const PharmacyInfo = (props) => {
    const {data} = props
    return(<div className="pharmacy-info-container">
        <h4>Pharmacy Info</h4>
        <div>
            <div>
                <input className="form-input" disabled={true} type="text" value={data.name}/>
            </div>
            <div>
                <input className="form-input w-100" disabled={true} type="text" value={data.address}/>
            </div>
        </div>
        <h6 className="mt-3 ml-3"><b>Status: </b>{data.status}</h6>
        <h6 className="mt-2 ml-3">Medicine List</h6>
        {data.medicines && <MedicineList data={data.medicines}/>}
    </div>)
}

export default PharmacyInfo
