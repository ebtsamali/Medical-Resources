import React from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) => {

    const { selectedTab } = props

    const selectAllBeds = () => {
        props.setSelectedTab('all_beds');
    }

    const selectAddBed = () => {
        props.setSelectedTab('add_bed');
    }

    return (
        <div className="sidebar">
            <ul className={"sidebar-ul"}>
                <li className={(selectedTab === 'all_beds') ? "sidebar-li active" : "sidebar-li"}>
                    <Link onClick={selectAllBeds}>All Beds</Link>
                </li>
                <li className={(selectedTab === 'add_bed') ? "sidebar-li active" : "sidebar-li"}>
                    <Link onClick={selectAddBed}>Add Bed</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;
