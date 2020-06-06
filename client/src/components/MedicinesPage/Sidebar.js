import React from "react";
import { Link } from "react-router-dom";
const Sidebar = (props) => {
    const {selectedTab} = props
    const status = 0
    return(<div className="sidebar">
        <ul className={"sidebar-ul"}>
            <li className={(selectedTab === 'all_medicine') ? "sidebar-li active":"sidebar-li" }><a onClick={() =>{
                props.setSelectedTab('all_medicine')
            }}>All Medicine</a></li>
            <li className={(selectedTab === 'add_medicine') ? "sidebar-li active":"sidebar-li" }><a onClick={() =>{
                props.setSelectedTab('add_medicine')
            }}>Add Medicine</a></li>
        </ul>
    </div>)
}

export default Sidebar;
