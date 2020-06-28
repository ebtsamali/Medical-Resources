import React, {useState, useRef, useEffect, useContext} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faQuestionCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import '../../styles/user_registration.scss';
import '../../styles/login.scss'
import GovernorateService from '../../services/governorateService'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link, withRouter} from "react-router-dom";
import {AppContext} from "../../providers/AppProvider";
import {AuthContext} from "../../providers/auth_provider";
import PublicHeader from "../PublicHeader";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import ErrorMessage from "../other/ErrorMessage";
import { signupAsHospital } from '../../services/hospitalService';


const theme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: "0.95rem",
                // color: "yellow",
                // backgroundColor: "red"
            }
        }
    }
});

const useStyles = makeStyles((theme) => ({
    select: {
        '&:before': {
            borderColor: "#4ABBA9",
            width: "100%"
        },
        '&:after': {
            borderColor: "#4ABBA9",
        },

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
const HospitalRegistrationPage = (props) => {

    const {setTitle} = useContext(AppContext);
    const {setSuccessfulRegister, setRegisterMessage} = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [currentForm, setCurrentForm] = useState('admin_info')

    const [governorates, setGovernorates] = useState([])
    const [districts, setDistricts] = useState([])
    const [hospitalName, setHospitalName] = useState("")
    const [hospitalGovernorate, setHospitalGovernorate] = useState("Governorate")
    const [hospitalDistrict, setHospitalDistrict] = useState("District")
    const [hospitalStreet, setHospitalStreet] = useState("")
    const [maxTimeLimit, setMaxTimeLimit] = useState('')
    const [phoneNumbers, setPhoneNumbers] = useState([])
    const [regulations, setRegulations] = useState([])
  
    const [errors, setErrors] = useState({})


    const classes = useStyles();

    useEffect(() => {
        setTitle('Medical Resources::Sign Up')
        GovernorateService.getAllGovernorates().then((response) => {
            setGovernorates(response.data.governorates)
        })
    }, []);

    useEffect(() => {
        if (hospitalGovernorate !== 'Governorate') {
            governorates.forEach((governorate) => {
                if (governorate.name === hospitalGovernorate) {
                    setDistricts(governorate.districts)
                    setHospitalDistrict('District')
                }
            })
        }
    }, [hospitalGovernorate])

    useEffect(()=>{
        if(errors.email || errors.firstName || errors.lastName || errors.password || errors.confirmPassword) {
            setCurrentForm('admin_info')
        }
    }, [errors])

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        // originalPassword = e.target.value;
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPass(e.target.value);
    }

    const onClickNext = () => {
        const errorsObj = {}
        let isErrorExist = false
        if(firstName.trim().length === 0 ){
            errorsObj.firstName = "First Name is required"
            isErrorExist = true
        }
        if(lastName.trim().length === 0 ){
            errorsObj.lastName = "Last Name is required"
            isErrorExist = true
        }
        if(email.trim().length === 0 ){
            errorsObj.email = "Email is required"
            isErrorExist = true
        }
        if (password.length < 8) {
            errorsObj.password = `Password must be at least 8 symbols.`
            isErrorExist = true
        }
        if(password.trim().length === 0 ){
            errorsObj.password = "Password is required"
            isErrorExist = true
        }
        if(password !== confirmPass){
            errorsObj.confirmPassword = 'Password & Confirm Password does not match'
            isErrorExist = true
        }
        if(isErrorExist) {
            setErrors(errorsObj)
            return;
        }
        setCurrentForm('pharmacy_info')
    }

    const onChangeHospitalName = (e) => {
        setHospitalName(e.target.value);
    }

    const onChangeGovernorate = (e) => {
        setHospitalGovernorate(e.target.value)
    }

    const onChangeDistrict = (e) => {
        setHospitalDistrict(e.target.value)
    }

    const onChangeStreet = (e) => {
        setHospitalStreet(e.target.value)
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

    const handleChangeRegulation = (id) => {
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
            if (value.properties !== undefined) { 
                let errorKey = value.properties.path;
                let errorValue = value.properties.message; 
                setErrors(errors => ({
                    ...errors,
                    [errorKey]: errorValue
                }));
            } else {
                setErrors(errors => ({
                    ...errors,
                    ...allErrors
                }));
            }
            // setErrors({ ...errors, [errorKey]: errorValue}) 
        }
    }

    const onClickSubmit = () => {

        const data = {
            adminFirstName:firstName,
            adminLastName:lastName,
            adminEmail:email,
            adminPassword:password,
            phoneNumbers,
            hospitalLocation: [{
                governorate: hospitalGovernorate === 'Governorate' ? "" : hospitalGovernorate,
                district: hospitalDistrict === 'District' ? "" : hospitalDistrict,
                street: hospitalStreet
            }],
            hospitalName,
            maxTimeLimit,
            regulations
        }

        signupAsHospital(data).then((response)=>{
            console.log(response.data);
            setRegisterMessage(response.data.message);
            setSuccessfulRegister(true);
            props.history.push('/');
        }).catch(error=>{
            if(error.response && error.response.data && error.response.data.errors)
            console.log(error.response.data);
            // setErrors(error.response.data.errors)
            handleErrors(error);
        })
    }

    const onClickprevious = () => {
        setCurrentForm('admin_info')
    }

    return (
        <div className="register-page-container">
            <PublicHeader/>
            <div className="x-container-mod">
                <div
                    className={currentForm !== 'admin_info' ? "login-card pharmacy-form" : "login-card pharmacy-form mt-5 mb-5"}>
                    <Link to="/register" style={{color: "black", width: "70px"}}>
                        <span>
                            <ArrowBackIosIcon style={{fontSize: "20px"}}/>
                            <b>Back</b>
                        </span>
                    </Link>
                    <h3>Register as Hospital</h3>
                    {(currentForm === 'admin_info') ? <div className="info-container">
                            <h5 className="mt-0 mb-2 ml-2"><b>Admin Info</b></h5>
                            <div className="input-container">
                                <input placeholder="First Name" className="email-input w-100" onChange={onChangeFirstName}
                                       value={firstName}/>
                                {errors.firstName && <ErrorMessage message={errors.firstName}/>}
                            </div>
                            <div className="input-container">
                                <input placeholder="Last Name" className="email-input w-100" onChange={onChangeLastName}
                                       value={lastName}/>
                                {errors.lastName && <ErrorMessage message={errors.lastName}/>}
                            </div>
                            <div className="input-container">
                                <input placeholder="Email" type="email" className="email-input w-100"
                                       onChange={onChangeEmail} value={email}/>
                                {errors.email && <ErrorMessage message={errors.email}/>}
                            </div>
                            <div className="input-container">
                                <input placeholder="Passwrod" type="password" className="email-input w-100"
                                       onChange={onChangePassword} value={password}/>
                                {errors.password && <ErrorMessage message={errors.password}/>}
                            </div>
                            <div className="input-container">
                                <input placeholder="Confirm Passwrod" type="password" className="email-input w-100"
                                       onChange={onChangeConfirmPassword} value={confirmPass}/>
                            </div>
                            {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword}/>}
                            <div className="btn-pharmacy-registar-container">
                                <button onClick={onClickNext}>Next</button>
                            </div>
                        </div>


                        :


                        <div className="info-container">
                            <h5 className="mt-0 mb-2 ml-2"><b>Hospital Info</b></h5>
                            <div className="input-container">
                                <input placeholder="Hospital Name" className="email-input w-100"
                                       onChange={onChangeHospitalName}
                                       value={hospitalName}/>
                                {errors.name && <ErrorMessage message={errors.name}/>}
                            </div>
                            <div className="input-container">
                                <FormControl style={{width: "98%", marginLeft: "0.8rem"}}>
                                    <InputLabel id="demo-simple-select-outlined-label">Governorate</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={hospitalGovernorate}
                                        onChange={onChangeGovernorate}
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
                                </FormControl>
                                {errors.governorate && <ErrorMessage message={errors.governorate}/>}
                            </div>

                            <div className="input-container">
                                <FormControl style={{width: "98%", marginLeft: "0.8rem"}}>
                                    <InputLabel id="demo-simple-select-outlined-label">District</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={hospitalDistrict}
                                        onChange={onChangeDistrict}
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
                                </FormControl>
                                {errors.district && <ErrorMessage message={errors.district}/>}
                            </div>

                            <div className="input-container">
                                <input placeholder="Street" className="email-input w-100"
                                       onChange={onChangeStreet}
                                       value={hospitalStreet}/>
                                {errors.street && <ErrorMessage message={errors.street}/>}
                            </div>

                            <div className="input-container">
                                <div className="w-100 d-flex flex-row justify-content-between">


                                    <input id="max_time_limit" name="max_time_limit" className="email-input w-100"
                                           type="number"
                                           placeholder="Max Time Limit in Hours"
                                           value={maxTimeLimit}
                                           onChange={(e) => {
                                               const {target: {value}} = e;
                                               setMaxTimeLimit(value)
                                           }}/>
                                    <MuiThemeProvider theme={theme}>
                                        <Tooltip
                                            title={`Number of Hours the reservation will be cancelled after theme`}
                                            placement="top"
                                        >
                                            <button className="info-icon"><FontAwesomeIcon size="lg"
                                                                                           icon={faQuestionCircle}/>
                                            </button>
                                        </Tooltip>
                                    </MuiThemeProvider>
                                </div>
                                {errors.maxTimeLimit && <ErrorMessage message={errors.maxTimeLimit}/>}
                            </div>

                            <div className="input-container">
                                <div className="phones-card">
                                    {phoneNumbers.map((phone, index) => {
                                        return (<div key={index}><input className="form-input" placeholder="Phone"
                                                                        value={phone}
                                                                        onChange={handleChangePhone(index)}/>
                                            {
                                                <FontAwesomeIcon className="ml-2" id={index} icon={faTimesCircle}
                                                                 size="lg" onClick={removePhone(index)}/>}</div>)
                                    })}
                                    {
                                        <button onClick={() => {
                                            setPhoneNumbers(phoneNumbers.concat([""]))
                                        }} className="x-btn-rounded">ADD NEW PHONE</button>}
                                </div>
                                {errors.phoneNumbers && <ErrorMessage message={errors.phoneNumbers}/>}
                            </div>

                            <div className="input-container">
                                <div className="phones-card">
                                    {regulations.map((regulation, index) => {
                                        return (<div key={index}><input className="form-input" placeholder="Regulation"
                                                                        value={regulation}
                                                                        onChange={handleChangeRegulation(index)}/>
                                            {
                                                <FontAwesomeIcon className="ml-2" id={index} icon={faTimesCircle}
                                                                 size="lg" onClick={removeRegulation(index)}/>}</div>)
                                    })}
                                    {
                                        <button onClick={() => {
                                            setRegulations(regulations.concat([""]))
                                        }} className="x-btn-rounded">ADD NEW REGULATION</button>}
                                </div>
                                {errors.regulations && <ErrorMessage message={errors.regulations}/>}
                            </div>
                            <div className="btn-pharmacy-registar-container">
                                <button onClick={onClickprevious}>Previous</button>
                                <button onClick={onClickSubmit}>Submit</button>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default withRouter(HospitalRegistrationPage);
