import React from "react";

const Sidebar = (props) => {

    const { selectedTab } = props

    const selectAllOrders = () => {
        props.setSelectedTab('all_orders');
    }

    const selectMedicineReservations = () => {
        props.setSelectedTab('medicine_reservations');
    }

    const selectHospitalReservations = () => {
        props.setSelectedTab('hospital_reservations');
    }

    return (
        <div className="sidebar">
            <ul className={"sidebar-ul"}>
                <li className={(selectedTab === 'all_orders') ? "sidebar-li active" : "sidebar-li"}>
                    <a onClick={selectAllOrders}>Medicine Orders</a>
                </li>
                <li className={(selectedTab === 'medicine_reservations') ? "sidebar-li active" : "sidebar-li"}>
                    <a onClick={selectMedicineReservations}>Medicine Reservations</a>
                </li>
                <li className={(selectedTab === 'hospital_reservations') ? "sidebar-li active" : "sidebar-li"}>
                    <a onClick={selectHospitalReservations}>Hospital Reservations</a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;
