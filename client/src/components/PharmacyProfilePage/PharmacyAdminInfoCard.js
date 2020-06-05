import React, {useEffect, useState} from "react";
import ErrorMessage from "../other/ErrorMessage";

const PharmacyAdminInfoCard = () => {

    const [adminDataEditingMode, setAdminDataEditingMode] = useState(true)
    const [adminFirstName, setAdminFirstName] = useState("")
    const [adminLastName, setAdminLastName] = useState("")
    const [adminEmail, setAdminEmail] = useState("")
    const [adminPassword, setAdminPassword] = useState("")

    useEffect(() => {
        // PharmacyService.getPharmacyData().then((response) => {
        //     setNewPharmacyState(response.data)
        //
        // }).catch(error => {
        //
        // })
    }, [])

    const setNewAdminInfoState = (data) => {
        setAdminFirstName(data.firstName)
        setAdminLastName(data.lastName)
        setAdminEmail(data.email)
        setAdminPassword("")
    }

    const saveUpdatedData = () => {
        setAdminDataEditingMode(true)
    }




    return(<div className="pharmacy-admin-info-card">
        <div className="x-card-header">
            <h4>Admin Info</h4>
            {adminDataEditingMode && <button onClick={() => {
                setAdminDataEditingMode(false)
            }} className="x-btn">Edit</button> ||
            <button onClick={saveUpdatedData} className="x-btn">Save</button>}
        </div>

        <div className="admin-name-container">
            <div>
                <input className="form-input" value={adminFirstName} placeholder="First Name" onChange={(e) => {
                    const {target: {value}} = e;
                    setAdminFirstName(value)
                }} disabled={adminDataEditingMode}/>
                {/*{errors.name && <ErrorMessage message={errors.name}/>}*/}
            </div>

            <div>
                <input className="form-input" value={adminLastName} placeholder="Last Name" onChange={(e) => {
                    const {target: {value}} = e;
                    setAdminLastName(value)
                }} disabled={adminDataEditingMode}/>
                {/*{errors.name && <ErrorMessage message={errors.name}/>}*/}
            </div>

        </div>

        <div>
            <input className="form-input" value={adminEmail} placeholder="Email" onChange={(e) => {
                const {target: {value}} = e;
                setAdminEmail(value)
            }} disabled={adminDataEditingMode}/>
            {/*{errors.name && <ErrorMessage message={errors.name}/>}*/}
        </div>

        <div>
            <input className="form-input" value={adminPassword} placeholder="New Password" onChange={(e) => {
                const {target: {value}} = e;
                setAdminPassword(value)
            }} disabled={adminDataEditingMode}/>
            {/*{errors.name && <ErrorMessage message={errors.name}/>}*/}
        </div>
    </div>)
}

export default PharmacyAdminInfoCard
