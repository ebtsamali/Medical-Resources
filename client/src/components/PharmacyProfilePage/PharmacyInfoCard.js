import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import PharmacyService from '../../services/pharmacy_service'

const PharmacyInfoCard = () => {

    const [pharmacyDataEditingMode, setPharmacyDataEditingMode] = useState(true)
    const [pharmacyName, setPharmacyName] = useState("")
    const [pharmacyGovernorate, setPharmacyGovernorate] = useState("")
    const [pharmacyDistrict, setPharmacyDistrict] = useState("")
    const [pharmacyStreet, setPharmacyStreet] = useState("")
    const [pharmacyHasDeliveryService, setPharmacyHasDeliveryService] = useState(false)
    const [phoneNumbers, setPhoneNumbers] = useState([])

    useEffect(() => {
        PharmacyService.getPharmacyData().then((response) => {
            setPharmacyName(response.data.name)
            setPharmacyGovernorate(response.data.location[0].governorate)
            setPharmacyDistrict(response.data.location[0].district)
            setPharmacyStreet(response.data.location[0].street)
            setPhoneNumbers(response.data.phoneNumbers)
            setPharmacyHasDeliveryService(response.data.delivery)

        }).catch(error => {

        })
    }, [])

    const removePhone = (id) => {
        return (e) => {
            setPhoneNumbers(phoneNumbers.filter((phone, index) => {
                return index !== id
            }))
        }
    }

    const handleChangePhone = (id) => {
        return (e) => {
            const {target: {value}} = e
            setPhoneNumbers(phoneNumbers.map((phone, index) => {
                if (id === index) {
                    phone = value
                }
                return phone
            }))
        }
    }

    return (<div className="pharmacy-info-card">
        <div className="x-card-header">
            <h4>Pharmacy Info</h4>
            {pharmacyDataEditingMode && <button onClick={() => {
                setPharmacyDataEditingMode(false)
            }} className="x-btn">Edit</button> ||
            <button onClick={() => {
                setPharmacyDataEditingMode(true)
            }} className="x-btn">Save</button>}
        </div>
        <div>
            <input className="form-input" value={pharmacyName} placeholder="Pharmacy Name" onChange={(e) => {
                const {target: {value}} = e;
                setPharmacyName(value)
            }} disabled={pharmacyDataEditingMode}/>
        </div>
        <div className="location-container">
            <input className="form-input" placeholder="Governorate" value={pharmacyGovernorate}
                   disabled={pharmacyDataEditingMode}
                   onChange={(e) => {
                       const {target: {value}} = e;
                       setPharmacyGovernorate(value)
                   }}/>
            <input className="form-input" placeholder="District" value={pharmacyDistrict}
                   disabled={pharmacyDataEditingMode} onChange={(e) => {
                const {target: {value}} = e;
                setPharmacyDistrict(value)
            }}/>
            <input className="form-input" placeholder="Street" value={pharmacyStreet} disabled={pharmacyDataEditingMode}
                   onChange={(e) => {
                       const {target: {value}} = e;
                       setPharmacyStreet(value)
                   }}/>
        </div>
        <div className="has-delivery-constainer">
            <label htmlFor="has_delivery">Has Delivery Service ?</label>
            <input type="checkbox" id="has_delivery" name="has_delivery" checked={pharmacyHasDeliveryService}
                   onChange={(event => {
                       const {target: {checked}} = event;
                       console.log(checked)
                       setPharmacyHasDeliveryService(checked)
                   })}
                   disabled={pharmacyDataEditingMode}/>
        </div>
        <div className="phones-card">
            {phoneNumbers.map((phone, index) => {
                return (<div><input className="form-input" placeholder="Phone" value={phone}
                                    onChange={handleChangePhone(index)} disabled={pharmacyDataEditingMode}/>
                    {<FontAwesomeIcon id={index} icon={faTimesCircle} size="lg" onClick={removePhone(index)}/>}</div>)
            })}
            {!pharmacyDataEditingMode &&
            <button onClick={() => {
                setPhoneNumbers(phoneNumbers.concat([""]))
            }} className="x-btn-rounded">ADD NEW PHONE</button>}
        </div>
    </div>)
}

export default PharmacyInfoCard
