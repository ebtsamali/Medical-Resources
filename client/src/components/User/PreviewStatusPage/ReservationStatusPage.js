import React, {useContext, useEffect, useState} from "react";
import Header from "../../Header";
import '../../../styles/preview_status.scss'
import InfoCard from "./InfoCard";
import {withRouter} from 'react-router-dom'
import UserService from '../../../services/userServices'
import {AuthContext} from "../../../providers/auth_provider";
const ReservationStatusPage = (props) => {
    const {match:{params:{id}}} = props
    const {user} = useContext(AuthContext)
    const [reservationDetails, setReservationDetails] = useState({})
    useEffect(()=>{
        UserService.getMedicineReservationDetails(user.id,id).then((response)=>{
            console.log(response.data)
            setReservationDetails(response.data)
        })
    },[])
    return(<div className="preview-status-container">
        <Header/>

        <div className="preview-status-content">
            <InfoCard type="reservation" data={reservationDetails}/>
        </div>
    </div>)
}

export default withRouter(ReservationStatusPage)
