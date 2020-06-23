import React, { useState, useContext, useEffect } from "react";
import Header from "../../Header";
import '../../../styles/medicines.scss'
import Sidebar from "./Sidebar";
import MedicineReservations from "./UserMedicineReservations";
import MedicineOrders from "./UserOrders";
import HospitalReservations from "./UserHospitalReservations";
import {AppContext} from "../../../providers/AppProvider";

const UserHistory = () => {

    const { setTitle } = useContext(AppContext);
    const [selectedTab, setSelectedTab] = useState('all_orders');

    useEffect(()=>{
        setTitle('Home')
    },[])

        return (
            
            
            <div className="x-container-medicines">
                <Header />
                <div className="body-medicines-container ">
                    <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                    <div className="medicines-content  align-items-start">
                        {
                            selectedTab === "all_orders" ?
                                <MedicineOrders /> :
                                (selectedTab === "medicine_reservations") ?
                                    <MedicineReservations /> :
                                    <HospitalReservations />
                        }
                    </div>
                </div>
            </div>
        )
    }

export default UserHistory
