import React, {useState, useEffect} from 'react';
import {saveHospitalData, getHospitalData, editHospitalData} from '../../services/hospitalService';

export default () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const adminId = JSON.parse(localStorage.getItem("user")).id;

    useEffect(() => { 
        getHospitalData(adminId).then(response => {
            if (response) {                    
                const retrievedAdminData = response.data[0].adminId;
                setAdminData(retrievedAdminData);
            }
            }).catch(error => {
                console.log(error.response); 
            });           
    }, []);

    const setAdminData = (retrievedAdminData) => {
        setFirstName(retrievedAdminData.firstName);
        setLastName(retrievedAdminData.lastName);
        setPassword(retrievedAdminData.password);
    }

    const handleFirstNameChange = (e) => {
        e.preventDefault();
        setFirstName(e.target.value);
    }
    const handleLastNameChange = (e) => {
        e.preventDefault();
        setLastName(e.target.value);
    }
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    placeholder="First Name"
                    autoFocus
                />
                <input 
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleLastNameChange}
                    placeholder="Last Name"
                    autoFocus
                />
                <input 
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    autoFocus
                />
                <input 
                    type="text"
                    name="role"
                    value="Admin"
                    autoFocus
                />
            </form>
        </div>
    )
}