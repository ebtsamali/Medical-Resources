import React, {useContext} from "react";
import {Link, Redirect} from "react-router-dom";
import { Navbar, Form, FormControl, Dropdown } from 'react-bootstrap';
import {AuthContext} from "../../../providers/auth_provider";
import { useHistory } from "react-router-dom";

export default () => {
    const {user} = useContext(AuthContext);
    let history = useHistory();
    
    const logout = () => {
        localStorage.removeItem('user')
        // return <Redirect to='/' />
        history.push('/');
    }
    return (
        <Navbar bg="dark" variant="dark" style={{maxHeight: "60px"}}>
            <Navbar.Brand href="#" className="mr-auto">Hospitals</Navbar.Brand>

            <div className="user-profile-container">
                <img src="../../img/user_avatar.jpg" alt="Avatar" className="avatar"/>
                <Link to="#"><p className="user-name">{`${user.firstName} ${user.lastName}`}</p></Link>
            </div>
            <div className="logout-container">
                <ul>
                    <li className="logout-list"><a onClick={logout}>Logout</a></li>
                </ul>
            </div>
        </Navbar>
    )
}