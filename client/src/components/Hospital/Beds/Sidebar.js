import React from "react";

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
                    <a onClick={selectAllBeds}>All Rooms</a>
                </li>
                <li className={(selectedTab === 'add_bed') ? "sidebar-li active" : "sidebar-li"}>
                    <a onClick={selectAddBed}>Add Room</a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;
