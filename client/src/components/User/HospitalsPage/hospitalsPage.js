import React, {useState, useEffect} from 'react';
import Header from '../../Header';
import {getAllHospitals} from '../../../services/hospitalService';
import GovernorateService from '../../../services/governorateService';
import Dropdown from "react-bootstrap/Dropdown";
import HospitalsTable from './hospitalsTable';
import '../../../styles/pharmacys.scss';


export default () => {
    const [allHospitals, setAllHospitals] = useState([]);
    const [hospitalsByGov, setHospitalsByGov] = useState([]);
    const [hospitalsByDistrict, setHospitalsByDistrict] = useState([]);

    const [hospitals, setHospitals] = useState([]);

    const [searchValue, setSearchValue] = useState('');

    const [governorate, setGovernorate] = useState("Governorate");
    const [district, setDistrict] = useState("District");

    const [allGovernorates, setAllGovernorates] = useState([]);
    const [allDistricts, setAllDistricts] = useState([]);

    useEffect( ()=>{
        getAllHospitals().then((response)=>{
            console.log(response.data)
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
        if (governorate !== 'Governorate') {
            allGovernorates.forEach((gov) => {
                if (gov.name === governorate) {
                    setAllDistricts(gov.districts);
                    setDistrict('District');
                }
            })
        }
    }, [governorate])


    const handleGovernorateSelect = (e) => {
        setGovernorate(e);
        setSearchValue('');
        let filteredByGov = allHospitals.filter(hospital => {
            return hospital.location[0].governorate === e;
        })
        setHospitals(filteredByGov);
        setHospitalsByGov(filteredByGov);
    }

    const handleDistrictSelect = (e) => {
        setDistrict(e);
        setSearchValue('');
        let filteredByDistrict = allHospitals.filter(hospital => {
            return hospital.location[0].governorate === governorate && hospital.location[0].district === e;
        })
        setHospitals(filteredByDistrict);
        setHospitalsByDistrict(filteredByDistrict);
    }


    const handleSearchValueChange = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
        if(governorate === "Governorate" && district === "District"){
            hospitalsByNameOnly(e.target.value);
        } else if(governorate !== "Governorate" && district === "District") {
            hospitalsByNameAndGov(e.target.value);
        } else if(governorate !== "Governorate" && district !== "District") {
            hospitalsByNameAndDistrict(e.target.value);
        } 
    }

    const hospitalsByNameOnly = (value) => {
        let filteredByName = allHospitals.filter(hospital => {
            let hospitalName = hospital.name;
            return hospitalName.includes(value)
        })
        setHospitals(filteredByName);
    }

    const hospitalsByNameAndGov = (value) => {
        let filteredByNameAndGov = hospitalsByGov.filter(hospital => {
            let hospitalName = hospital.name;
            return hospitalName.includes(value)
        })
        setHospitals(filteredByNameAndGov);
    }

    const hospitalsByNameAndDistrict = (value) => {
        let filteredByNameAndDistrict = hospitalsByDistrict.filter(hospital => {
            let hospitalName = hospital.name;
            return hospitalName.includes(value)
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
                        <Dropdown className="mt-4" onSelect={ handleGovernorateSelect }>
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
                        </Dropdown>

                        {(governorate !== 'Governorate') && <div className="d-flex flex-column align-content-center">
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
                        </div>}
                    </div>
                </div>
                
                <HospitalsTable hospitals={hospitals} />

            </div>
        </div>
    )
}