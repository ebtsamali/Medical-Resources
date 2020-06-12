import React, { useContext, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import '../styles/header.scss'
import { AuthContext } from "../providers/auth_provider";
// import UserService from "../services/userServices";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Header = (props) => {


    const logout = () => {
        localStorage.removeItem('user')
        props.history.push("/")
    }
    const { user } = useContext(AuthContext);
    // console.log(user)
    return (
    <div className="header">
        <div className="nav-container">
            {(user.role === "pharmacy") ? <ul>
                {(user.profileIsCompleted) && <li className="nav-list">
                    <Link to="/medicines">Medicines</Link>
                </li>}
            </ul> : (user.role === "user") ? <ul>
                <li className="nav-list">
                    <Link to="/pharmacys">Pharmacies</Link>
                </li>
                <li className="nav-list">
                    <Link to="/hospitals">Hospitals</Link>
                </li>
            </ul> : (user.role === "hospital") ? <ul>
                <li className="nav-list">
                    <Link to="/hospital/beds/edit">Beds</Link>
                </li>
            </ul> : <ul>
                        <li className="nav-list">
                            <Link to="/">Home</Link>
                        </li>
                    </ul>}
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <div className="user-profile-container">
                <img src="../../img/user_avatar.jpg" alt="Avatar" className="avatar" />
                <Link to={
                    (user.role === "pharmacy") ? "/pharmacy_profile" : (user.role === "user") ? "/user/profile" : ""
                }><p className="user-name">{`${user.firstName} ${user.lastName}`}</p></Link>
            </div>
            {user.role === "user" && <div className="ml-3">
                <Link to="/user_cart"><FontAwesomeIcon color="#ffffff" size="2x" icon={faShoppingCart}/></Link>
            </div>}
            <div className="logout-container">
                <ul>
                    <li className="logout-list"><a onClick={logout}>Logout</a></li>
                </ul>
            </div>
        </div>

    </div>
    )
}

export default withRouter(Header)
