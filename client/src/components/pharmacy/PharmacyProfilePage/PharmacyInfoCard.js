import React, {useState, useEffect, useContext} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import PharmacyService from '../../../services/pharmacy_service'
import GovernorateService from '../../../services/governorateService'
import ErrorMessage from "../../other/ErrorMessage";
import {AuthContext} from "../../../providers/auth_provider";
import Dropdown from "react-bootstrap/Dropdown";
import {MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import WorkingHours from "../../other/WorkingHours";

const useStyles = makeStyles((theme) => ({
    select: {
        '&:before': {
            borderColor: "#4ABBA9",
        },
        '&:after': {
            borderColor: "#4ABBA9",
        }
    },
    icon: {
        fill: "#4ABBA9",
    },
    label: {
        '.MuiInputLabel-root': {
            color: "#4ABBA9",
        }
    },
}));
const PharmacyInfoCard = () => {

    const [pharmacyDataEditingMode, setPharmacyDataEditingMode] = useState(true)
    const [pharmacyName, setPharmacyName] = useState("")
    const [pharmacyGovernorate, setPharmacyGovernorate] = useState("Governorate")
    const [pharmacyDistrict, setPharmacyDistrict] = useState("District")
    const [pharmacyStreet, setPharmacyStreet] = useState("")
    const [pharmacyHasDeliveryService, setPharmacyHasDeliveryService] = useState(false)
    const [phoneNumbers, setPhoneNumbers] = useState([])
    const [pharmacyId, setPharmacyId] = useState('')
    const [maxTimeLimit, setMaxTimeLimit] = useState('')
    const [errors, setErrors] = useState({})
    const [governorates, setGovernorates] = useState([])
    const [districts, setDistricts] = useState([])
    const {user, setUser} = useContext(AuthContext);
    const [weekDetails, setWeekDetails] = useState([{day: 'Mon', startTime: 0, endTime: 0, isOpened: false}, {
        day: 'Tue',
        startTime: 0,
        endTime: 0,
        isOpened: false
    }, {day: 'Wed', startTime: 0, endTime: 0, isOpened: false}, {day: 'Thu', startTime: 0, endTime: 0, isOpened: false}, {
        day: 'Fri',
        startTime: 0,
        endTime: 0,
        isOpened: false
    }, {day: 'Sat', startTime: 0, endTime: 0, isOpened: false}, {day: 'Sun', startTime: 0, endTime: 0, isOpened: false}])

    const classes = useStyles();

    const setNewPharmacyState = (data) => {
        setPharmacyName(data.name)
        setPharmacyGovernorate(data.location[0].governorate)
        setPharmacyDistrict(data.location[0].district)
        setPharmacyStreet(data.location[0].street)
        setPhoneNumbers(data.phoneNumbers)
        setPharmacyHasDeliveryService(data.delivery)
        setMaxTimeLimit(data.maxTimeLimit);
        setPharmacyId(data._id)
        setWeekDetails(data.workingHours)
    }

    useEffect(() => {
        PharmacyService.getPharmacyData(user.id).then((response) => {
            setNewPharmacyState(response.data)

        }).catch(error => {

        })
        GovernorateService.getAllGovernorates().then((response) => {
            // console.log(response.data)
            setGovernorates(response.data.governorates)
        })
    }, [])

    useEffect(() => {
        if (pharmacyGovernorate !== 'Governorate') {
            governorates.forEach((governorate) => {
                if (governorate.name === pharmacyGovernorate) {
                    setDistricts(governorate.districts)
                    setPharmacyDistrict('District')
                }
            })
        }
    }, [pharmacyGovernorate])

    const removePhone = (id) => {
        return (e) => {
            setPhoneNumbers(phoneNumbers.filter((phone, index) => {
                return index !== id
            }))
        }
    }

    const saveUpdatedData = () => {
        setPharmacyDataEditingMode(true)
        const pharmacy = {
            delivery: pharmacyHasDeliveryService,
            phoneNumbers,
            location: [{
                governorate: pharmacyGovernorate === 'Governorate' ? "" : pharmacyGovernorate,
                district: pharmacyDistrict === 'District' ? "" : pharmacyDistrict,
                street: pharmacyStreet
            }],
            name: pharmacyName,
            maxTimeLimit,
            workingHours:weekDetails
        }
        if (pharmacyId) {
            PharmacyService.updatePharmacyData(pharmacyId, pharmacy).then((response) => {
                setErrors({})
                setNewPharmacyState(response.data)
            }).catch((error) => {
                setPharmacyDataEditingMode(false)
                setErrors(error.response.data.errors)
            });
        } else {
            PharmacyService.addNewPharmacy(pharmacy).then((response) => {
                setErrors({})
                setNewPharmacyState(response.data)
                const user = JSON.parse(localStorage.getItem('user'))
                user.profileIsCompleted = true
                setUser(user)
                localStorage.setItem('user', JSON.stringify(user))
            }).catch((error) => {
                // console.log(error.response.data.errors)
                setPharmacyDataEditingMode(false)
                setErrors(error.response.data.errors)
            });
        }

    }

    const handleSelectGovernorate = (e) => {
        setPharmacyGovernorate(e.target.value)
    }

    const handleSelectDistrict = (e) => {
        setPharmacyDistrict(e.target.value)
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
            <button onClick={saveUpdatedData} className="x-btn">Save</button>}
        </div>
        <div>
            <input className="form-input" value={pharmacyName} placeholder="Pharmacy Name" onChange={(e) => {
                const {target: {value}} = e;
                setPharmacyName(value)
            }} disabled={pharmacyDataEditingMode}/>
            {errors.name && <ErrorMessage message={errors.name}/>}
        </div>
        <div className="location-container">
            <div className="d-flex flex-column align-content-center">
                <Select
                    disabled={pharmacyDataEditingMode}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={pharmacyGovernorate}
                    onChange={handleSelectGovernorate}
                    className={classes.select}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        }
                    }}
                >
                    {governorates.map((gov) => {
                        return (
                            <MenuItem key={gov._id} value={gov.name}>{gov.name}</MenuItem>
                        )
                    })}
                </Select>
                {errors.governorate && <ErrorMessage message={errors.governorate}/>}
            </div>
            {(pharmacyGovernorate !== 'Governorate') && <div className="d-flex flex-column align-content-center">
                <Select
                    disabled={pharmacyDataEditingMode}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={pharmacyDistrict}
                    onChange={handleSelectDistrict}
                    className={classes.select}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        }
                    }}
                >
                    {districts.map((district) => {
                        return (
                            <MenuItem key={district} value={district}>{district}</MenuItem>
                        )
                    })}
                </Select>
                {errors.district && (pharmacyDistrict === "District") && <ErrorMessage message={errors.district}/>}
            </div>}
            <div>
                <input className="form-input w-100" placeholder="Street" value={pharmacyStreet}
                       disabled={pharmacyDataEditingMode}
                       onChange={(e) => {
                           const {target: {value}} = e;
                           setPharmacyStreet(value)
                       }}/>
                {errors.street && <ErrorMessage message={errors.street}/>}
            </div>
        </div>
        <div className="has-delivery-constainer">
            <label htmlFor="has_delivery">Has Delivery Service ?</label>
            <input type="checkbox" id="has_delivery" name="has_delivery" checked={pharmacyHasDeliveryService}
                   onChange={(event => {
                       const {target: {checked}} = event;
                       setPharmacyHasDeliveryService(checked)
                   })}
                   disabled={pharmacyDataEditingMode}/>
        </div>


        <div>
            <div className="max-time-limit-constainer">
                <label htmlFor="max_time_limit">Max Time Limit in Hours:</label>
                <input id="max_time_limit" name="max_time_limit" className="form-input" type="number"
                       placeholder="Max Time Limit in Hours"
                       value={maxTimeLimit}
                       disabled={pharmacyDataEditingMode}
                       onChange={(e) => {
                           const {target: {value}} = e;
                           setMaxTimeLimit(value)
                       }}/>

            </div>
            {errors.maxTimeLimit && <ErrorMessage message={errors.maxTimeLimit}/>}
        </div>
        {!pharmacyDataEditingMode && <div>
            <label>Working Hours</label>
            <WorkingHours weekDetails={weekDetails} setWeekDetails={setWeekDetails}/>
            {errors.workingHours && <ErrorMessage message={errors.workingHours}/>}
        </div>}
        <div className="phones-card">
            {phoneNumbers.map((phone, index) => {
                return (<div key={index}><input className="form-input" placeholder="Phone" value={phone}
                                                onChange={handleChangePhone(index)} disabled={pharmacyDataEditingMode}/>
                    {!pharmacyDataEditingMode &&
                    <FontAwesomeIcon id={index} icon={faTimesCircle} size="lg" onClick={removePhone(index)}/>}</div>)
            })}
            {!pharmacyDataEditingMode &&
            <button onClick={() => {
                setPhoneNumbers(phoneNumbers.concat([""]))
            }} className="x-btn-rounded">ADD NEW PHONE</button>}
        </div>
        {errors.phoneNumbers && <ErrorMessage message={errors.phoneNumbers}/>}
    </div>)
}

export default PharmacyInfoCard
