import React, {useState, useEffect} from 'react';
import {saveHospitalData, getHospitalData, editHospitalData} from '../../services/hospitalService';
import HospitalAdminForm from './hospitalAdminForm';
import ErrorMessage from "../other/ErrorMessage";

export default (props) => {
    const [name, setName] = useState("");
    const [governorate, setGovernorate] = useState("");
    const [district, setDistrict] = useState("");
    const [street, setStreet] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [hospitalId, setHospitalId] = useState("");
    const [adminData, setAdminData] = useState({});
    const [errors, setErrors] = useState({});
    const adminId = JSON.parse(localStorage.getItem("user")).id;

    useEffect(() => { 
        if(props.status === "edit"){
            getHospitalData(adminId).then(response => {
                if (response) {                    
                    const retrievedHospital = response.data[0];
                    const retrievedAdminData = response.data[0].adminId;
                    setRetrievedData(retrievedHospital);
                    setAdminData(retrievedAdminData);
                }
                }).catch(error => {
                    console.log(error.response); 
                });           
        }
    }, []);

    const setRetrievedData = (retrievedHospital) => {
        setName(retrievedHospital.name);
        setGovernorate(retrievedHospital.location[0].governorate);
        setDistrict(retrievedHospital.location[0].district);
        setStreet(retrievedHospital.location[0].street);
        setPhoneNumber(retrievedHospital.phoneNumber);
        setHospitalId(retrievedHospital._id)
    }

    const resetFields = () => {
        setName("");
        setGovernorate("");
        setDistrict("");
        setStreet("");
        setPhoneNumber("");
        setHospitalId("")
    }
    
    const handleNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
    }
    const handleGovernorateChange = (e) => {
        e.preventDefault();
        setGovernorate(e.target.value)
    }
    const handleDistrictChange = (e) => {
        e.preventDefault();
        setDistrict(e.target.value)
    }
    const handleStreetChange = (e) => {
        e.preventDefault();
        setStreet(e.target.value)
    }
    const handlePhoneChange = (e) => {
        e.preventDefault();
        setPhoneNumber(e.target.value)
    }

    const handelSubmit = (e) => {
        e.preventDefault();      
        const data = {
            name,
            governorate,
            district,
            street,
            phoneNumber,
            adminId
        }

        if(props.status === "add"){
            saveHospitalData(data).then(response => {
                if (response) {
                    resetFields();
                }
            }).catch(error => {
                    console.log(error.response); 
            });
        } else {
            editHospitalData(data, hospitalId).then(response => {
                if (response) {
                    console.log(response);
                }
            }).catch(error => {
                    console.log(error.response); 
            });  
        }
  
    }

    return ( 
        <div>
            {errors.name && <ErrorMessage message={errors.name}/>}
            {props.status === "edit"? <HospitalAdminForm /> : ""}
            <form onSubmit={handelSubmit}>
                <div>
                    <input 
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Hospital Name"
                        autoFocus
                        onChange={handleNameChange}
                    />
                    <input 
                        type="text"
                        name="governorate"
                        value={governorate}
                        placeholder="governorate"
                        autoFocus
                        onChange={handleGovernorateChange}
                    />
                    <input 
                        type="text"
                        name="district"
                        value={district}
                        placeholder="district"
                        autoFocus
                        onChange={handleDistrictChange}
                    />
                    <input 
                        type="text"
                        name="street"
                        value={street}
                        placeholder="street"
                        autoFocus
                        onChange={handleStreetChange}
                    />
                    <input 
                        type="text"
                        name="phoneNumber"
                        value={phoneNumber}
                        placeholder="Phone Number"
                        autoFocus
                        onChange={handlePhoneChange}
                    />
                    <button type="submit"> Submit </button>
                </div>
            </form>
        </div>
    )
}
