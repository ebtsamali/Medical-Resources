import React, {useContext, useEffect, useState} from "react";
import Header from "../../Header";
import '../../../styles/preview_status.scss'
import InfoCard from "./InfoCard";
import {AuthContext} from "../../../providers/auth_provider";
import UserService from "../../../services/userServices";
import {withRouter} from "react-router-dom";

const OrderStatusPage = (props) => {
    const {match:{params:{id}}} = props
    const {user} = useContext(AuthContext)
    const [orderDetails, setOrderDetails] = useState({})
    useEffect(()=>{
        UserService.getMedicineOrderDetails(user.id,id).then((response)=>{
            console.log(response.data)
            setOrderDetails(response.data)
        })
    },[])
    return(<div className="preview-status-container">
        <Header/>
        <div className="preview-status-content">
            <InfoCard type="order" data={orderDetails}/>
        </div>
    </div>)
}
export default withRouter(OrderStatusPage)
