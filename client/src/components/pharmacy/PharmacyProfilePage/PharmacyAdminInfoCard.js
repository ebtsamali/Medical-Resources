import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../providers/auth_provider";
import UserService from '../../../services/userServices'
import ErrorMessage from "../../other/ErrorMessage";

const PharmacyAdminInfoCard = () => {

    const [adminDataEditingMode, setAdminDataEditingMode] = useState(true)
    const [adminFirstName, setAdminFirstName] = useState("")
    const [adminLastName, setAdminLastName] = useState("")
    const [adminEmail, setAdminEmail] = useState("")
    const [adminPassword, setAdminPassword] = useState("")
    const [errors, setErrors] = useState({})

    const {user, setUser} = useContext(AuthContext);
    useEffect(() => {
        UserService.getUserInfo(user.id).then((response) => {
            setErrors({})
            setNewAdminInfoState(response.data)
        })
    }, [])

    const setNewAdminInfoState = (data) => {
        setAdminFirstName(data.firstName)
        setAdminLastName(data.lastName)
        setAdminEmail(data.email)
        setAdminPassword("")
    }

    const saveUpdatedData = () => {
        setErrors({})
        let errors = {}
        let errorISExisted = false

        if (adminFirstName.trim().length === 0) {
            errorISExisted = true
            errors.firstName = "First Name is required"
        }

        if (adminLastName.trim().length === 0) {
            errors.lastName = "Last Name is required"
            errorISExisted = true
        }
        if (adminEmail.trim().length === 0) {
            errorISExisted = true
            errors.email = "Email is required"
        }

        if (errorISExisted) {
            setErrors(errors)
            return;
        }
        setAdminDataEditingMode(true)
        UserService.update(adminEmail, adminFirstName, adminLastName, null, null, null, adminPassword === "" ? null : adminPassword, user.id).then((response) => {
            setErrors({})
            setNewAdminInfoState(response.data)
            const user = JSON.parse(localStorage.getItem('user'))
            user.firstName = response.data.user.firstName
            user.lastName = response.data.user.lastName
            setUser(user)
            localStorage.setItem('user', JSON.stringify(user))
        }).catch((error) => {
            setAdminDataEditingMode(false)
            if (error.response.data.message && error.response.data.message.errors) {
                setErrors(error.response.data.message.errors)
            } else {
                setErrors({})
            }
        });
    }


    return (<div className="pharmacy-admin-info-card">
        <div className="x-card-header">
            <h4>Admin Info</h4>
            {adminDataEditingMode && <button onClick={() => {
                setAdminDataEditingMode(false)
            }} className="x-btn">Edit</button> ||
            <button onClick={saveUpdatedData} className="x-btn">Save</button>}
        </div>

        <div className="admin-name-container">
            <div>
                <input className="form-input" value={adminFirstName} placeholder="First Name" onChange={(e) => {
                    const {target: {value}} = e;
                    setAdminFirstName(value)
                }} disabled={adminDataEditingMode}/>
                {errors.firstName && <ErrorMessage message={errors.firstName}/>}
            </div>

            <div>
                <input className="form-input" value={adminLastName} placeholder="Last Name" onChange={(e) => {
                    const {target: {value}} = e;
                    setAdminLastName(value)
                }} disabled={adminDataEditingMode}/>
                {errors.lastName && <ErrorMessage message={errors.lastName}/>}
            </div>

        </div>

        <div>
            <input className="form-input" type="email" value={adminEmail} placeholder="Email" onChange={(e) => {
                const {target: {value}} = e;
                setAdminEmail(value)
            }} disabled={adminDataEditingMode}/>
            {errors.email && <ErrorMessage message={errors.email}/>}
        </div>

        <div>
            <input className="form-input" type="password" value={adminPassword} placeholder="New Password"
                   onChange={(e) => {
                       const {target: {value}} = e;
                       setAdminPassword(value)
                   }} disabled={adminDataEditingMode}/>
            {errors.password && <ErrorMessage message={errors.password}/>}
        </div>
    </div>)
}

export default PharmacyAdminInfoCard
