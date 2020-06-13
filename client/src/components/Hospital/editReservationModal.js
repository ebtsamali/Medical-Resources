import React, {useState} from 'react';
import { updateReservation } from '../../services/hospitalReservationService';
import BedServices from '../../services/bedService';
import ErrorMessage from "../other/ErrorMessage";
import Dropdown from "react-bootstrap/Dropdown";
import { BrowserRouter as Router, useLocation } from "react-router-dom"; 
import Header from '../Header';


export default () => {
    const reservation = useLocation().state.reservation;
    const [patientName, setPatientName] = useState(reservation.patientName);
    const [patientID, setPatientID] = useState(reservation.patientID);
    const [patientPhone, setPatientPhone] = useState(reservation.patientPhone);
    const [roomNumber, setRoomNumber] = useState(reservation.bed.roomNumber);
    const [dayCost, setDayCost] = useState(reservation.bed.dayCost);
    const [totalDays, setTotalDays] = useState("");
    const [totalCost, setTotalCost] = useState("");
    const [status, setStatus] = useState(reservation.status);
    const [createdAt, setCreatedAt] = useState(reservation.createdAt);
    const [disableStatus, setDisableStatus] = useState(true);
    const [errors, setErrors] = useState("");

    
    const handleErrors = (error) => {
        setErrors({})
        const allErrors =  error.response.data.errors; 
        for (let [key, value] of Object.entries(allErrors)) { 
            let errorKey = value.properties.path;
            let errorValue = value.properties.message; 
            setErrors(errors => ({
                ...errors,
                [errorKey]: errorValue
            }));
        }
    }

    const handelSubmit = () => {
        const bed = {
            _id: reservation.bed._id,
            hospital: reservation.hospital,
            roomNumber,
            dayCost,
            reserved: status === "cancelled"? false : true
        }

        const data = {
            user: reservation.user,
            patientName,
            patientID,
            patientPhone,
            bed: reservation.bed._id,
            totalDays,
            totalCost,
            timeLimit: reservation.timeLimit,
            status,
        }

        updateReservation(data, reservation._id).then(response => {
            if(status !== reservation.status){
                BedServices.updateBed(bed).then(response => {
                    setDisableStatus(true);
                    setErrors({});
                })
            }
            setDisableStatus(true);
            setErrors({});
        }).catch (error => {
            handleErrors(error);
        })
    }
    
    return(
        <div>
            <Header />
            <div className="x-content">
                <div className="pharmacy-info-card">
                    <div className="x-card-header">
                        <h4>Reservation Info</h4>
                        { disableStatus ? 
                            <button type="submit" onClick={()=>{setDisableStatus(false)}} className="x-btn"> Edit </button> 
                            :
                            <button type="submit" onClick={handelSubmit} className="x-btn"> Save </button>
                        }
                    </div>
                    
                    <div className="location-container">
                        <div>
                            <small style={{fontSize: "15px"}}>Patient Name </small>
                            <input 
                                type="text"
                                className="form-input"
                                name="patientName"
                                value={patientName}
                                placeholder="patient name"
                                onChange={ e => { e.preventDefault(); setPatientName(e.target.value) } }
                                disabled={disableStatus}
                            />
                            {errors.patientName && <ErrorMessage message={errors.patientName}/>}
                        </div>

                        <div>
                            <small style={{fontSize: "15px"}}>Patient Identity </small>
                            <input 
                                type="text"
                                className="form-input"
                                name="patientID"
                                value={patientID}
                                placeholder="patient ID"
                                onChange={ e => { e.preventDefault(); setPatientID(e.target.value) } }
                                disabled={disableStatus}
                            />
                            {errors.patientID && <ErrorMessage message={errors.patientID}/>}
                        </div>
                    </div>

                    <div className="location-container">
                        <div>
                            <small style={{fontSize: "15px"}}>Patient Phone </small>
                            <input 
                                type="text"
                                className="form-input"
                                name="patientPhone"
                                value={patientPhone}
                                placeholder="patient Phone"
                                onChange={ e => { e.preventDefault(); setPatientPhone(e.target.value) } }
                                disabled={disableStatus}
                            />
                            {errors.patientPhone && <ErrorMessage message={errors.patientPhone}/>}
                        </div>

                        <div>
                            <small style={{fontSize: "15px"}}>Room Number </small>
                            <input 
                                type="text"
                                className="form-input"
                                name="roomNumber"
                                value={roomNumber}
                                placeholder="room number"
                                onChange= { e => { e.preventDefault(); setRoomNumber(e.target.value) } }
                                disabled
                            />
                        </div>
                    </div>

                       
                    <div className="d-flex flex-column align-content-center" style={{marginLeft: "35%"}}>
                        <Dropdown className="mt-4" onSelect={e => setStatus(e)}>
                            <Dropdown.Toggle disabled={disableStatus} style={{maxHeight: "50px"}} size="sm" id="dropdown-basic">
                                {status}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="pending">pending</Dropdown.Item>     
                                <Dropdown.Item eventKey="cancelled">cancelled</Dropdown.Item>     
                                <Dropdown.Item eventKey="fulfilled">fulfilled</Dropdown.Item>     
                            </Dropdown.Menu>
                            {errors.status && <ErrorMessage message={errors.status}/>}
                        </Dropdown>
                    </div>      
                    
                    
                    <br/>
                    <div className="location-container">
                        <div>
                            <small style={{fontSize: "15px"}}>Created At </small>
                            <input 
                                type="text"
                                className="form-input"
                                name="createdAt"
                                value={createdAt}
                                placeholder="created at"
                                disabled
                            />
                        </div>
                        
                        <div>
                            <small style={{fontSize: "15px"}}>Day Cost </small>
                            <input 
                                type="text"
                                className="form-input"
                                name="dayCost"
                                value={dayCost}
                                placeholder="day cost"
                                onChange={ e => { e.preventDefault(); setDayCost(e.target.value) } }
                                disabled={disableStatus}
                            />
                            {errors.dayCost && <ErrorMessage message={errors.dayCost}/>}   
                        </div>
                    </div> 

                    <div className="location-container">
                        <div>
                            <small style={{fontSize: "15px"}}>Total Days </small>
                            <input 
                                type="text"
                                className="form-input"
                                name="totalDays"
                                value={totalDays}
                                placeholder="Total Days Number"
                                onChange={ e => { e.preventDefault(); setTotalDays(e.target.value) } }
                                disabled={disableStatus}
                            />
                            {errors.totalDays && <ErrorMessage message={errors.totalDays}/>}
                        </div>

                        <div>
                            <small style={{fontSize: "15px"}}>Total Cost </small>
                            <input 
                                type="text"
                                className="form-input"
                                name="totalCost"
                                value={totalCost}
                                placeholder="total cost"
                                onChange={ e => { e.preventDefault(); setTotalCost(e.target.value) } }
                                disabled={disableStatus}
                            />
                            {errors.totalCost && <ErrorMessage message={errors.totalCost}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    )
}