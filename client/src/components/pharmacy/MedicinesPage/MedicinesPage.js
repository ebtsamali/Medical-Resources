import React, {useContext, useEffect, useState} from "react";
import Header from "../../Header";
import '../../../styles/medicines.scss'
import Sidebar from "./Sidebar";
import MedicineForm from "./MedicineForm";
import AllMedicines from "./AllMedicines";
import AllReservations from "./AllReservations";
import AllOrders from "./AllOrders";
import { AppContext } from "../../../providers/AppProvider";

const MedicinesPage = () => {

    const [selectedTab, setSelectedTab] = useState('all_medicine')
    const [selectedMedicine, setSelectedMedicine] = useState({})
    const { setTitle } = useContext(AppContext)
    useEffect(()=>{
        setTitle('Medicines')
    },[])
    return (
        <div className="x-container-medicines">
            <Header />
            <div className="body-medicines-container ">
                <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <div
                    className={selectedTab === "all_medicine" ? "medicines-content  align-items-start" : "medicines-content"}>
                    {selectedTab === "all_medicine" ?
                        <AllMedicines setSelectedMedicine={setSelectedMedicine} setSelectedTab={setSelectedTab} /> : (selectedTab === "add_medicine") ?
                            <MedicineForm selectedTab={selectedTab} setSelectedTab={setSelectedTab} /> : (selectedTab === "all_orders") ? <AllOrders />
                                : (selectedTab === "all_reservations") ? <AllReservations /> :
                                    <MedicineForm selectedTab={selectedTab} setSelectedTab={setSelectedTab}
                                        selectedMedicine={selectedMedicine} />}
                </div>
            </div>
        </div>
    )
}

export default MedicinesPage
