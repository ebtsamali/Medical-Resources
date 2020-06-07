import React, {useState, useEffect} from 'react';
import  { Redirect } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {saveHospitalData, getHospitalData, editHospitalData} from '../../services/hospitalService';
import HospitalAdminForm from './hospitalAdminForm';
import ErrorMessage from "../other/ErrorMessage";

export default () => {
    const [name, setName] = useState("");
    const [governorate, setGovernorate] = useState("");
    const [district, setDistrict] = useState("");
    const [street, setStreet] = useState("");
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [regulations, setRegulations] = useState([]);
    const [hospitalId, setHospitalId] = useState("");
    const [status, setStatus] = useState("add");
    const [errors, setErrors] = useState({});
    const adminId = JSON.parse(localStorage.getItem("user")).id;

    useEffect(() => { 
        getHospital();   
    }, []);

    const getHospital = () => {
        getHospitalData(adminId).then(response => {
            if (response.data.length != 0) {                            
                const retrievedHospital = response.data[0];
                setRetrievedData(retrievedHospital);
                console.log("status set to edit");
                
                setStatus("edit");
            }
        }).catch(error => {
            console.log(error); 
        });
    }

    const setRetrievedData = (retrievedHospital) => {
        setName(retrievedHospital.name);
        setGovernorate(retrievedHospital.location[0].governorate);
        setDistrict(retrievedHospital.location[0].district);
        setStreet(retrievedHospital.location[0].street);
        setPhoneNumbers(retrievedHospital.phoneNumbers);
        setRegulations(retrievedHospital.regulations);
        setHospitalId(retrievedHospital._id)
    }

    const resetFields = () => {
        setName("");
        setGovernorate("");
        setDistrict("");
        setStreet("");
        setPhoneNumbers([]);
        setRegulations([]);
        setHospitalId("");
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

    const handlePhoneChange = (id) => {
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

    const handleRegulationChange = (id) => {
        return (e) => {
            const {target: {value}} = e
            setRegulations(regulations.map((regulation, index) => {
                if (id === index) {
                    regulation = value
                }
                return regulation
            }))
        }
    }

    const removePhone = (id) => {
        return (e) => {
            setPhoneNumbers(phoneNumbers.filter((phone, index) => {
                return index !== id
            }))
        }
    }

    const removeRegulation = (id) => {
        return (e) => {
            setRegulations(regulations.filter((regulation, index) => {
                return index !== id
            }))
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault();      
        const data = {
            name,
            governorate,
            district,
            street,
            phoneNumbers,
            regulations,
            adminId
        }       

        if(status === "add"){
            console.log("add");
            saveHospitalData(data).then(response => {
                if (response) {
                    resetFields();
                    // getHospital();
                    // return <Redirect to='/hospital' />
                    window.location.reload(false);
                    // setStatus("edit")
                }
            }).catch(error => {
                    console.log(error.response); 
            });
        }  
        if(status === "edit") {
            console.log("edit");
            editHospitalData(data, hospitalId).then(response => {
                if (response) {
                    console.log(response);
                    // return <Redirect to='/hospital' />
                    window.location.reload(false);
                }
            }).catch(error => {
                    console.log(error.response); 
            });  
        }
  
    }

    return ( 
        <div>
            <HospitalAdminForm />
            <div className="pharmacy-info-card">
                
                <div className="x-card-header">
                    <h4>Hospital Info</h4>
                    <button onClick={handelSubmit} type="submit" className="x-btn"> {status=== "edit"? "Edit" : "Save"} </button>
                </div>
                <div>
                    <input 
                        type="text"
                        className="form-input"
                        name="name"
                        value={name}
                        placeholder="Hospital Name"
                        autoFocus
                        onChange={handleNameChange}
                    />
                </div>
                <div className="location-container">
                    <div>
                        <input 
                            type="text"
                            className="form-input"
                            name="governorate"
                            value={governorate}
                            placeholder="governorate"
                            autoFocus
                            onChange={handleGovernorateChange}
                        />
                    </div>
                    <div>
                        <input 
                            type="text"
                            className="form-input"
                            name="district"
                            value={district}
                            placeholder="district"
                            autoFocus
                            onChange={handleDistrictChange}
                        />
                    </div>
                    <div>
                        <input 
                            type="text"
                            className="form-input"
                            name="street"
                            value={street}
                            placeholder="street"
                            autoFocus
                            onChange={handleStreetChange}
                        />
                    </div>
                </div>
                <div className="phones-card">
                    {phoneNumbers.map((phone, index) => {
                        return(
                            <div key={index}>
                                <input 
                                    type="text"
                                    className="form-input"
                                    name="phoneNumbers"
                                    value={phone}
                                    placeholder="Phone Number"
                                    autoFocus
                                    onChange={handlePhoneChange(index)}
                                />
                                <FontAwesomeIcon id={index} icon={faTimesCircle} size="lg" onClick={removePhone(index)}/>
                            </div>
                        )
                    })}
                    <button onClick={() => {
                        setPhoneNumbers(phoneNumbers.concat([""]))
                    }} className="x-btn-rounded">ADD NEW PHONE</button>
                </div>

                <div className="phones-card">
                    {regulations.map((regulation, index) => {
                        return(
                            <div key={index}>
                                <input 
                                    type="text"
                                    className="form-input"
                                    name="regulations"
                                    value={regulation}
                                    placeholder="Regulation"
                                    autoFocus
                                    onChange={handleRegulationChange(index)}
                                />
                                <FontAwesomeIcon id={index} icon={faTimesCircle} size="lg" onClick={removeRegulation(index)}/>
                            </div>
                        )
                    })}
                    <button onClick={() => {
                        setRegulations(regulations.concat([""]))
                    }} className="x-btn-rounded">ADD REGULATION</button>
                </div>
                
            </div>
        </div>
    )
}
