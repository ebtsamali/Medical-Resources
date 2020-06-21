import React, { useState, useContext, useEffect } from "react";
import Header from "../../Header";
import '../../../styles/medicines.scss'
import Sidebar from "./Sidebar";
import MedicineReservations from "./UserMedicineReservations";
import MedicineOrders from "./UserOrders";
import HospitalReservations from "./UserHospitalReservations";
import { AuthContext } from "../../../providers/auth_provider";
import UserProfile from "../../UserProfile";
import UserServices from "../../../services/userServices";
import {AppContext} from "../../../providers/AppProvider";

const UserHomePage = () => {

    // const { user } = useContext(AuthContext);
    const { setTitle } = useContext(AppContext);
    // const [profileComplete, setprofileComplete] = useState(true);
    const [selectedTab, setSelectedTab] = useState('all_orders');

    useEffect(()=>{
        setTitle('Home')
    },[])
    // useEffect(() => {

    //     UserServices.getUserInfo(user.id)
    //         .then(response => {
    //             if (!response.data.address || !response.data.phoneNumber) {
    //                 setprofileComplete(false);
    //             }
    //         })
    //     })

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

export default UserHomePage
