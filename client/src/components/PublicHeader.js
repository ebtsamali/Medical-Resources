import React, { useContext, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import '../styles/header.scss'
import { AuthContext } from "../providers/auth_provider";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {deleteCart} from "../utils/cart_utils";

const PublicHeader = (props) => {

    const { user } = useContext(AuthContext);

    // console.log(user)
    return (
        <div className="header">
            <div className="nav-container">
                <ul>
                    <li className="nav-list">
                        <Link to="/pharmacys">Pharmacies</Link>
                    </li>
                    <li className="nav-list">
                        <Link to="/hospitals">Hospitals</Link>
                    </li>
                </ul>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                { <div className="ml-3">
                    <Link to="/user_cart"><FontAwesomeIcon color="#ffffff" size="2x" icon={faShoppingCart}/></Link>
                </div>}
                <div className="logout-container">
                    <ul>
                        <li className="nav-list"><Link to="/login" >Login</Link></li>
                        <li className="nav-list"><Link to="/register" >SignUp</Link></li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default withRouter(PublicHeader)
