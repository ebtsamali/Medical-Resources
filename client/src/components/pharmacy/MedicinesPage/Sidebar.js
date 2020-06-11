import React from "react";

const Sidebar = (props) => {
    const { selectedTab } = props;
    const status = 0;

    const selectAllReservations = () => {
        props.setSelectedTab('all_reservations');
    }

    const selectAllOrders = () => {
        props.setSelectedTab('all_orders');
    }

    return (
        <div className="sidebar">
            <ul className={"sidebar-ul"}>
                <li className={(selectedTab === 'all_medicine') ? "sidebar-li active" : "sidebar-li"}><a onClick={() => {
                    props.setSelectedTab('all_medicine')
                }}>All Medicine</a></li>
                <li className={(selectedTab === 'add_medicine') ? "sidebar-li active" : "sidebar-li"}><a onClick={() => {
                    props.setSelectedTab('add_medicine')
                }}>Add Medicine</a></li>
                <li className={(selectedTab === 'all_reservations') ? "sidebar-li active" : "sidebar-li"}>
                    <a onClick={selectAllReservations}>All Reservations</a>
                </li>
                <li className={(selectedTab === 'all_orders') ? "sidebar-li active" : "sidebar-li"}>
                    <a onClick={selectAllOrders}>All Orders</a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;
