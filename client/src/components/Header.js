import React, {useContext} from "react";
import {Link, withRouter} from "react-router-dom";
import '../styles/header.scss'
import {AuthContext} from "../providers/auth_provider";

const Header = (props) => {
    const logout = () => {
        localStorage.removeItem('user')
        props.history.push("/")
    }
    const {user} = useContext(AuthContext);
    // console.log(user)
    return (<div className="header">
        <div className="nav-container">
            {(user.role === "pharmacy") ? <ul>
                <li className="nav-list">
                    <Link to="/medicines">Medicines</Link>
                </li>
            </ul> : (user.role === "user") ? <ul>
                <li className="nav-list">
                    <Link to="/pharmacys">Pharmacys</Link>
                </li>
            </ul> : <ul>
                <li className="nav-list">
                    <Link to="/">Home</Link>
                </li>
            </ul>}
        </div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <div className="user-profile-container">
                <img src="../../img/user_avatar.jpg" alt="Avatar" className="avatar"/>
                <Link to={
                    (user.role === "pharmacy") ? "/pharmacy_profile" : (user.role === "user") ? "" : ""
                }><p className="user-name">{`${user.firstName} ${user.lastName}`}</p></Link>
            </div>
            <div className="logout-container">
                <ul>
                    <li className="logout-list"><a onClick={logout}>Logout</a></li>
                </ul>
            </div>
        </div>

    </div>)
}

export default withRouter(Header)