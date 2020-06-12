import React, {useState} from 'react';
import { Modal, Row, Container } from 'react-bootstrap';
import {saveReservationData} from '../../../services/hospitalReservationService';
import BedServices from '../../../services/bedService';
import ErrorMessage from "../../other/ErrorMessage";


export default (props) => {
    console.log(props);
    const [patientName, setPatientName] = useState("");
    const [patientID, setPatientID] = useState("");
    const [patientPhone, setPatientPhone] = useState("");
    const [errors, setErrors] = useState("");

    const handleNameChange = (e) => {
        e.preventDefault();
        setPatientName(e.target.value);
    }

    const handleNationalIdChange = (e) => {
        e.preventDefault();
        setPatientID(e.target.value);
    }

    const handlePhoneChange = (e) => {
        e.preventDefault();
        setPatientPhone(e.target.value);
    }

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

    const submitReservation = () => {
        const bed = {
            ...props.clickedBed,
            reserved: true
        }
        const data = {
            hospital: props.hospital._id,
            user: props.hospital.adminId,
            patientName,
            patientID,
            patientPhone,
            bed: props.clickedBed._id,
            timeLimit: props.hospital.maxTimeLimit
        }
        BedServices.updateReservedBed(bed).then(response => {
            console.log(response);
        })
        saveReservationData(data).then(response => {
            if (response) {
                console.log(response);
                setPatientName("");
                setPatientID("");
                setPatientPhone("");
                props.onHide();
            }
        }).catch(error => {
            console.log(error.response.data.errors.properties);  
            handleErrors(error);
        })
    }
    
    return(
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Patient Info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        <input 
                            type="text"
                            className="form-input"
                            name="patientName"
                            value={patientName}
                            placeholder="Patient Name"
                            onChange={handleNameChange}
                        />
                        {errors.patientName && <ErrorMessage message={errors.patientName}/>}
                    </Row>

                    <Row>
                        <input 
                            type="text"
                            className="form-input"
                            name="patientID"
                            value={patientID}
                            placeholder="Patient National Identity"
                            onChange={handleNationalIdChange}
                        />
                        {errors.patientID && <ErrorMessage message={errors.patientID}/>}
                    </Row>

                    <Row>
                        <input 
                            type="text"
                            className="form-input"
                            name="patientPhone"
                            value={patientPhone}
                            placeholder="Patient Phone Number"
                            onChange={handlePhoneChange}
                        />

                        {errors.patientPhone && <ErrorMessage message={errors.patientPhone}/>}
                    </Row>
                </Container>
            </Modal.Body>
            <div>
                <small style={{marginLeft: "15%"}}>Reservation will be canceled automatically after {props.hospital.maxTimeLimit} hours</small>
            </div>
            <Modal.Footer>
                <button onClick={props.onHide} className="modalBtn">Close</button>
                <button onClick={submitReservation} className="modalBtn">Confirm</button>
            </Modal.Footer>
        </Modal>
    )
}