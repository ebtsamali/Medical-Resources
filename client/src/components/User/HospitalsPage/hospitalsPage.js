import React, {useState, useEffect, useContext} from 'react';
import Header from '../../Header';
import {getAllHospitals} from '../../../services/hospitalService';
import GovernorateService from '../../../services/governorateService';
import Dropdown from "react-bootstrap/Dropdown";
import HospitalsTable from './hospitalsTable';
import '../../../styles/pharmacys.scss';
import {AppContext} from "../../../providers/AppProvider";
import { InputLabel, MenuItem, Select} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


export default () => {
    const {setTitle} = useContext(AppContext);
    const [allHospitals, setAllHospitals] = useState([]);
    const [hospitalsByGov, setHospitalsByGov] = useState([]);
    const [hospitalsByDistrict, setHospitalsByDistrict] = useState([]);

    const [hospitals, setHospitals] = useState([]);

    const [searchValue, setSearchValue] = useState('');

    const [governorate, setGovernorate] = useState("all governorates");
    const [district, setDistrict] = useState("all districts");

    const [allGovernorates, setAllGovernorates] = useState([]);
    const [allDistricts, setAllDistricts] = useState([]);

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

    const classes = useStyles();

    useEffect( ()=>{
        setTitle('Hospitals')
        getAllHospitals().then((response)=>{
            setHospitals(response.data);
            setAllHospitals(response.data)
        }).catch( error => {
            console.log(error);          
        })

        GovernorateService.getAllGovernorates().then((response) => {
            setAllGovernorates(response.data.governorates)
        })
    }, [] )

    useEffect(() => {
        if (governorate !== 'all governorates') {
            allGovernorates.forEach((gov) => {
                if (gov.name === governorate) {
                    setAllDistricts(gov.districts);
                    setDistrict('all districts');
                }
            })
        }
    }, [governorate])


    const handleGovernorateSelect = (e) => {
        setGovernorate(e.target.value);
        setSearchValue('');
        if(e.target.value !== "all governorates"){
            let filteredByGov = allHospitals.filter(hospital => {
                return hospital.location[0].governorate === e.target.value;
            })
            setHospitals(filteredByGov);
            setHospitalsByGov(filteredByGov);
        } else {
            setHospitals(allHospitals);
            setHospitalsByGov(allHospitals);
        }
    }

    const handleDistrictSelect = (e) => {
        setDistrict(e.target.value);
        setSearchValue('');
        if(e.target.value !== "all districts"){
            let filteredByDistrict = allHospitals.filter(hospital => {
                return hospital.location[0].governorate === governorate && hospital.location[0].district === e.target.value;
            })
            setHospitals(filteredByDistrict);
            setHospitalsByDistrict(filteredByDistrict);
        } else {
            let filteredByAllDistrict = allHospitals.filter(hospital => {
                return hospital.location[0].governorate === governorate;
            })
            setHospitals(filteredByAllDistrict);
            setHospitalsByDistrict(filteredByAllDistrict);
        }
    }


    const handleSearchValueChange = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
        if(governorate === "all governorates" && district === "all districts"){
            hospitalsByNameOnly(e.target.value);
        } else if(governorate !== "all governorates" && district === "all districts") {
            hospitalsByNameAndGov(e.target.value);
        } else if(governorate !== "all governorates" && district !== "all districts") {
            hospitalsByNameAndDistrict(e.target.value);
        } 
    }

    const hospitalsByNameOnly = (value) => {
        let filteredByName = allHospitals.filter(hospital => {
            let hospitalName = hospital.name;
            return hospitalName.toLowerCase().includes(value.toLowerCase())
        })
        setHospitals(filteredByName);
    }

    const hospitalsByNameAndGov = (value) => {
        let filteredByNameAndGov = hospitalsByGov.filter(hospital => {
            let hospitalName = hospital.name;
            return hospitalName.toLowerCase().includes(value.toLowerCase())
        })
        setHospitals(filteredByNameAndGov);
    }

    const hospitalsByNameAndDistrict = (value) => {
        let filteredByNameAndDistrict = hospitalsByDistrict.filter(hospital => {
            let hospitalName = hospital.name;
            return hospitalName.toLowerCase().includes(value.toLowerCase())
        })
        setHospitals(filteredByNameAndDistrict);
    }


    return (
        <div className="x-container-pharmacys">
            <Header />
            <div className="pharmacys-content">
                <div className="search-card">
                    <div className="search-input-container">
                        <input 
                            type="text"
                            className="form-input"
                            name="search"
                            value={searchValue}
                            placeholder="Search For Hospital By Name"
                            onChange={handleSearchValueChange}
                        /> 
                    </div>  
                    <div className="filters-container">
                        {/** <Dropdown className="mt-4" onSelect={ handleGovernorateSelect }>
                            <Dropdown.Toggle style={{maxHeight: "50px"}} size="sm" id="dropdown-basic">
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
                            </Dropdown>**/}
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={governorate}
                            onChange={handleGovernorateSelect}
                            className={classes.select}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                }
                            }}
                        >
                            <MenuItem key="all governorates" value="all governorates">all governorates</MenuItem>
                            {allGovernorates.map((gov) => {
                                return (
                                    <MenuItem key={gov._id} value={gov.name}>{gov.name}</MenuItem>
                                )
                            })}
                        </Select>

                        {(governorate !== 'all governorates') && 
                            
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={district}
                                onChange={handleDistrictSelect}
                                className={classes.select}
                                inputProps={{
                                    classes: {
                                        icon: classes.icon,
                                    }
                                }}
                            >
                                <MenuItem key="all districts" value="all districts">all districts</MenuItem>
                                    {allDistricts.map((district) => {
                                    return (
                                        <MenuItem key={district} value={district}>{district}</MenuItem>
                                    )
                                })}
                            </Select>    
                        }
                        {/** <div className="d-flex flex-column align-content-center">
                            <Dropdown className="mt-4" onSelect={ handleDistrictSelect }>
                                <Dropdown.Toggle style={{maxHeight: "50px"}} size="sm" id="dropdown-basic">
                                    {district}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {allDistricts.map((district, index) => {
                                        return ( <Dropdown.Item key={index} eventKey={district}> {district} </Dropdown.Item> )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                                </div>**/}
                    </div>
                </div>
                
                <HospitalsTable hospitals={hospitals} />

            </div>
        </div>
    )
}
