import React, {useState, useEffect, useContext} from 'react';
import GovernorateService from '../../services/governorateService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {saveHospitalData, getHospitalData, editHospitalData} from '../../services/hospitalService';
import ErrorMessage from "../other/ErrorMessage";
import Dropdown from "react-bootstrap/Dropdown";
import {AuthContext} from "../../providers/auth_provider";

export default () => {
    const [name, setName] = useState("");
    const [governorate, setGovernorate] = useState("Governorate");
    const [district, setDistrict] = useState("District");
    const [street, setStreet] = useState("");
    const [maxTimeLimit, setMaxTimeLimit] = useState("");
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [regulations, setRegulations] = useState([]);
    const [hospitalId, setHospitalId] = useState("");
    const [allGovernorates, setAllGovernorates] = useState([]);
    const [allDistricts, setAllDistricts] = useState([])
    const [status, setStatus] = useState("add");
    const [disableStatus, setDisableStatus] = useState(true);
    const [errors, setErrors] = useState({});
    const {user, setUser} = useContext(AuthContext);
    const adminId = JSON.parse(localStorage.getItem("user")).id;

    useEffect(() => { 
        getHospital(); 
        GovernorateService.getAllGovernorates().then((response) => {
            setAllGovernorates(response.data.governorates)
        })
    }, []);

    useEffect(() => {
        if (governorate !== 'Governorate') {
            allGovernorates.forEach((gov) => {
                if (gov.name === governorate) {
                    setAllDistricts(gov.districts);
                    setDistrict('District');
                }
            })
        }
    }, [governorate])

    const getHospital = () => {
        getHospitalData(adminId).then(response => {
            if (response.data.length != 0) {                            
                const retrievedHospital = response.data[0];
                setRetrievedData(retrievedHospital);         
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
        setMaxTimeLimit(retrievedHospital.maxTimeLimit);
        setPhoneNumbers(retrievedHospital.phoneNumbers);
        setRegulations(retrievedHospital.regulations);
        setHospitalId(retrievedHospital._id)
    }
    
    const handleNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
    }
    const handleGovernorateChange = (e) => {
        setGovernorate(e)
    }
    const handleDistrictChange = (e) => {
        setDistrict(e)
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

    const handleErrors = (error) => {
        setErrors({})
        const allErrors =  error.response.data.errors; 
        for (let [key, value] of Object.entries(allErrors)) { 
            let errorKey = value.properties.path;
            let errorValue = value.properties.message; 
            setErrors(errors => ({
                ...errors,
                [errorKey]: errorValue
            }));
            // setErrors({ ...errors, [errorKey]: errorValue}) 
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault();      
        const data = {
            name,
            governorate: governorate === "Governorate"? "" : governorate,
            district: district === "District"? "" : district,
            street,
            maxTimeLimit,
            phoneNumbers,
            regulations,
            adminId
        }       
        if(status === "add"){
            saveHospitalData(data).then(response => {
                if (response) {
                    setErrors({});
                    setDisableStatus(true);
                    const user = JSON.parse(localStorage.getItem('user'));
                    user.profileIsCompleted = true;
                    setUser(user);
                    localStorage.setItem('user', JSON.stringify(user));
                }
            }).catch(error => {
                handleErrors(error);        
            });
        }  
        if(status === "edit") {           
            editHospitalData(data, hospitalId).then(response => {
                if (response) {
                    setErrors({});
                    setDisableStatus(true);
                }
            }).catch(error => {
                handleErrors(error);
            });  
        }
  
    }

    return (           
        <div className="pharmacy-info-card">
            
            <div className="x-card-header">
                <h4>Hospital Info</h4>
                { disableStatus ? 
                    <button type="submit" onClick={()=>{setDisableStatus(false)}} className="x-btn"> Edit </button> 
                    :
                    <button type="submit" onClick={handelSubmit} className="x-btn"> Save </button>
                }
            </div>
            <div>
                <input 
                    type="text"
                    className="form-input"
                    name="name"
                    value={name}
                    placeholder="Hospital Name"
                    onChange={handleNameChange}
                    disabled={disableStatus}
                />
            </div>
            {errors.name && <ErrorMessage message={errors.name}/>}

            <div className="location-container">
                <div className="d-flex flex-column align-content-center">
                    {/** <input 
                        type="text"
                        className="form-input"
                        name="governorate"
                        value={governorate}
                        placeholder="governorate"
                        onChange={handleGovernorateChange}
                        disabled={disableStatus}
                    />**/}
                    <Dropdown className="mt-4" onSelect={ handleGovernorateChange }>
                        <Dropdown.Toggle disabled={disableStatus} style={{maxHeight: "50px"}} size="sm" id="dropdown-basic">
                            {governorate}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {allGovernorates.map((governorate) => {
                                return (
                                    <Dropdown.Item key={governorate._id} eventKey={governorate.name}>
                                        {governorate.name}
                                    </Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    {errors.governorate && <ErrorMessage message={errors.governorate}/>}
                </div>

                {(governorate !== 'Governorate') && <div className="d-flex flex-column align-content-center">
                    <Dropdown className="mt-4" onSelect={ handleDistrictChange }>
                        <Dropdown.Toggle disabled={disableStatus} style={{maxHeight: "50px"}} size="sm" id="dropdown-basic">
                            {district}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {allDistricts.map((district, index) => {
                                return ( <Dropdown.Item key={index} eventKey={district}> {district} </Dropdown.Item> )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    {errors.district && <ErrorMessage message={errors.district}/>}
                </div>}
                {/** <div>
                    <input 
                        type="text"
                        className="form-input"
                        name="district"
                        value={district}
                        placeholder="district"
                        onChange={handleDistrictChange}
                        disabled={disableStatus}
                    />
                    {errors.district && <ErrorMessage message={errors.district}/>}
                </div>**/}

                <div>
                    <input 
                        type="text"
                        className="form-input"
                        name="street"
                        value={street}
                        placeholder="street"
                        onChange={handleStreetChange}
                        disabled={disableStatus}
                    />
                    {errors.street && <ErrorMessage message={errors.street}/>}
                </div>
            </div>
            
            <div>
                <div className="max-time-limit-constainer">
                    <label htmlFor="max_time_limit">Max Time Limit in Hours:</label>
                    <input id="max_time_limit" name="max_time_limit" className="form-input" type="number"
                        placeholder="Max Time Limit in Hours"
                        value={maxTimeLimit}
                        disabled={disableStatus}
                        onChange={(e) => {
                            const {target: {value}} = e;
                            setMaxTimeLimit(value)
                        }}/>

                </div>
                {errors.maxTimeLimit && <ErrorMessage message={errors.maxTimeLimit}/>}
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
                                onChange={handlePhoneChange(index)}
                                disabled={disableStatus}
                            />
                            { disableStatus ? "" :
                                <FontAwesomeIcon id={index} icon={faTimesCircle} size="lg" onClick={removePhone(index)}/>
                            }
                        </div>
                    )
                })}
                { disableStatus ? "" : 
                    <button onClick={() => {
                        setPhoneNumbers(phoneNumbers.concat([""]))
                    }} className="x-btn-rounded">ADD NEW PHONE</button>
                }
            </div>
            {errors.phoneNumbers && <ErrorMessage message={errors.phoneNumbers}/>}

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
                                onChange={handleRegulationChange(index)}
                                disabled={disableStatus}
                            />
                            { disableStatus ? "" : 
                                <FontAwesomeIcon id={index} icon={faTimesCircle} size="lg" onClick={removeRegulation(index)}/>
                            }
                        </div>
                    )
                })}
                { disableStatus ? "" : 
                    <button onClick={() => {
                        setRegulations(regulations.concat([""]))
                    }} className="x-btn-rounded">ADD REGULATION</button>
                }
            </div>
            {errors.regulations && <ErrorMessage message={errors.regulations}/>}
        </div>
    )
}
