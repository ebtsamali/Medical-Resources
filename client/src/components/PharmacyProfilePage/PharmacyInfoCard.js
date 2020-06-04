import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const PharmacyInfoCard = () => {

    const pharmacy = {
        name: "",
    }
    const [pharmacyDataEditingMode, setPharmacyDataEditingMode] = useState(true)
    const [phoneNumbers,setPhoneNumbers] = useState([])

    const handleEditClick = () => {
        setPharmacyDataEditingMode(false)
    }

    const handleSaveClick = () => {
        setPharmacyDataEditingMode(true)
    }

    const handleAddNewPhone = () => {
        setPhoneNumbers(phoneNumbers.concat([{phoneNumber:""}]))
    }

    const removePhone = (id) => {
        return (e) => {
            setPhoneNumbers(phoneNumbers.filter((phone,index)=>{
                return index !== id
            }))
        }
    }

    const handleChangePhone = (id) => {
        return (e) => {
            const {target:{value}} = e
            setPhoneNumbers(phoneNumbers.map((phone,index)=>{
                if(id === index){
                    phone.phoneNumber = value
                }
                return phone
            }))
            // console.log(id)
        }
    }

    return (<div className="pharmacy-info-card">
        <div className="x-card-header">
            <h4>Pharmacy Info</h4>
            {pharmacyDataEditingMode && <button onClick={handleEditClick} className="x-btn">Edit</button> ||
            <button onClick={handleSaveClick} className="x-btn">Save</button>}
        </div>
        <div>
            <input className="form-input" value="" placeholder="Pharmacy Name"
                   disabled={pharmacyDataEditingMode}/>
        </div>
        <div className="location-container">
            <input className="form-input" placeholder="Governorate" disabled={pharmacyDataEditingMode}/>
            <input className="form-input" placeholder="District" disabled={pharmacyDataEditingMode}/>
            <input className="form-input" placeholder="Street" disabled={pharmacyDataEditingMode}/>
        </div>
        <div className="has-delivery-constainer">
            <label htmlFor="has_delivery">Has Delivery Service ?</label>
            <input type="checkbox" id="has_delivery" name="has_delivery" checked={false} disabled={pharmacyDataEditingMode}/>
        </div>
        <div className="phones-card">
            {phoneNumbers.map((phone, index)=>{
                console.log(phone.phoneNumber )
                return (<div><input className="form-input" placeholder="Phone" value={phone.phoneNumber } onChange={handleChangePhone(index)} disabled={pharmacyDataEditingMode}/> <FontAwesomeIcon id={index} icon={faTimesCircle} size="lg" onClick={removePhone(index)} /></div>)
            })}
            {!pharmacyDataEditingMode &&  <button onClick={handleAddNewPhone} className="x-btn-rounded" >ADD NEW PHONE</button>}
        </div>
    </div>)
}

export default PharmacyInfoCard
