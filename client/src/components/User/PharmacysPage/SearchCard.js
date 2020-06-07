import React, {useEffect, useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import GovernorateService from "../../../services/governorateService";

const SearchCard = (props) => {
    const {setQuery, query} = props
    const [inputValue, setInputValue] = useState('')
    const [governorates, setGovernorates] = useState([])
    const [selectedGovernorate, setSelectedGovernorate] = useState('all governorates')
    const [selectedDistrict, setSelectedDistrict] = useState('all districts')
    const [districts, setDistricts] = useState([])

    useEffect(() => {
        GovernorateService.getAllGovernorates().then((response) => {
            setGovernorates(response.data.governorates)
        })
    }, [])

    useEffect(() => {
        if (selectedGovernorate !== 'all governorates') {
            governorates.forEach((governorate) => {
                if (governorate.name === selectedGovernorate) {
                    setDistricts(governorate.districts)
                    setSelectedDistrict('all districts')
                }
            })
        }
        setQuery({
            ...query,
            page:1,
            governorate: selectedGovernorate === 'all governorates' ? '' : selectedGovernorate,
            district: ""
        })
    }, [selectedGovernorate])

    useEffect(()=>{
        setQuery({
            ...query,
            page:1,
            governorate: selectedGovernorate === 'all governorates' ? '' : selectedGovernorate,
            district: selectedDistrict === 'all districts' ? '' : selectedDistrict
        })
    },[selectedDistrict])

    const handleSearchInput = (e) => {
        const {target: {value}} = e
        setQuery({...query,page:1, q: value ? value : ""})
        setInputValue(value)
    }

    const handleSelectGovernorate = (e) => {
        setSelectedGovernorate(e)
    }

    const handleSelectDistrict = (e) => {
        setSelectedDistrict(e)
    }

    return (<div className="search-card">
        <div className="search-input-container">
            <input onChange={handleSearchInput} value={inputValue} placeholder="Search For Medicines"/>
        </div>
        <div className="filters-container">

            <Dropdown onSelect={handleSelectGovernorate}>
                <Dropdown.Toggle style={{maxHeight: "40px"}} size="sm"
                                 id="dropdown-basic">
                    {selectedGovernorate}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                        eventKey='all governorates'>all governorates</Dropdown.Item>
                    {governorates.map((governorate) => {
                        return (<Dropdown.Item key={governorate._id}
                                               eventKey={governorate.name}>{governorate.name}</Dropdown.Item>)
                    })}
                </Dropdown.Menu>
            </Dropdown>

            {(selectedGovernorate !== 'all governorates') && <Dropdown onSelect={handleSelectDistrict}>
                <Dropdown.Toggle style={{maxHeight: "40px"}} size="sm"
                                 id="dropdown-basic">
                    {selectedDistrict}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {districts.map((district, index) => {
                        return (<Dropdown.Item key={index} eventKey={district}>{district}</Dropdown.Item>)
                    })}
                </Dropdown.Menu>
            </Dropdown>}
        </div>
    </div>)
}

export default SearchCard
