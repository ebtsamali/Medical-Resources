import React, {useEffect, useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import GovernorateService from "../../../services/governorateService";
import { InputLabel, MenuItem, Select} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

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
const SearchCard = (props) => {
    const {setQuery, query} = props
    const [inputValue, setInputValue] = useState('')
    const [governorates, setGovernorates] = useState([])
    const [selectedGovernorate, setSelectedGovernorate] = useState('all governorates')
    const [selectedDistrict, setSelectedDistrict] = useState('all districts')
    const [districts, setDistricts] = useState([])

    const classes = useStyles();

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
        setSelectedGovernorate(e.target.value)
    }

    const handleSelectDistrict = (e) => {
        setSelectedDistrict(e.target.value)
    }

    return (<div className="search-card">
        <div className="search-input-container">
            <input onChange={handleSearchInput} value={inputValue} placeholder="Search For Medicines"/>
        </div>
        <div className="filters-container">
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={selectedGovernorate}
                onChange={handleSelectGovernorate}
                className={classes.select}
                inputProps={{
                    classes: {
                        icon: classes.icon,
                    }
                }}
            >
                <MenuItem key="all governorates" value="all governorates">all governorates</MenuItem>
                {governorates.map((gov) => {
                    return (
                        <MenuItem key={gov._id} value={gov.name}>{gov.name}</MenuItem>
                    )
                })}
            </Select>

            {(selectedGovernorate !== 'all governorates') && <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={selectedDistrict}
                onChange={handleSelectDistrict}
                className={classes.select}
                inputProps={{
                    classes: {
                        icon: classes.icon,
                    }
                }}
            >
                <MenuItem key="all districts" value="all districts">all districts</MenuItem>
                {districts.map((district) => {
                    return (
                        <MenuItem key={district} value={district}>{district}</MenuItem>
                    )
                })}
            </Select>}

            {/*{(selectedGovernorate !== 'all governorates') && <Dropdown onSelect={handleSelectDistrict}>*/}
            {/*    <Dropdown.Toggle style={{maxHeight: "40px"}} size="sm"*/}
            {/*                     id="dropdown-basic">*/}
            {/*        {selectedDistrict}*/}
            {/*    </Dropdown.Toggle>*/}

            {/*    <Dropdown.Menu>*/}
            {/*        {districts.map((district, index) => {*/}
            {/*            return (<Dropdown.Item key={index} eventKey={district}>{district}</Dropdown.Item>)*/}
            {/*        })}*/}
            {/*    </Dropdown.Menu>*/}
            {/*</Dropdown>}*/}
        </div>
    </div>)
}

export default SearchCard
