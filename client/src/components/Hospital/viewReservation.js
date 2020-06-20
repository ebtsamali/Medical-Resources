import React, {useState, useEffect} from 'react';
import '../../styles/pharmacys.scss';
import Pagination from '../User/HospitalsPage/Pagination';
import Header from '../Header';
import {getHospitalReservations} from '../../services/hospitalReservationService';
import { BsCircleFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from './Beds/Sidebar';


export default () => {
    const [reservations, setReservations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [reservationsPerPage] = useState(10);

    const indexOfLastReservation = currentPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        getHospitalReservations().then(response => {
            setReservations(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])
    
    return (
        <div className="x-container-pharmacys">
            <Header />
            <div className="pharmacys-container">
                <table id="medicines" style={{width: "90%", alignSelf: "center"}}>
                    <thead>
                        <tr id="hospitals">
                            <th>Patient Name</th>
                            <th>National Identity</th>
                            <th>Phone Number</th>
                            <th>Room Number</th>
                            <th>Cost Per day</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        currentReservations.map(reservation => {
                            return(
                                <tr key={reservation._id}>
                                    <td>{ reservation.patientName }</td>
                                    <td>{ reservation.patientID }</td>
                                    <td>{ reservation.patientPhone }</td>
                                    <td>{ reservation.bed.roomNumber }</td>
                                    <td>{ reservation.bed.dayCost }</td>
                                    <td className="statusTd">
                                        <div>
                                            { reservation.status === "pending"? <BsCircleFill style={{color: "#f0ad4e"}} className="statusIcon"/> 
                                            : reservation.status === "cancelled" ? <BsCircleFill style={{color: "red"}} className="statusIcon"/> 
                                            : <BsCircleFill style={{color: "green", marginLeft: "-5px"}}  className="statusIcon"/>}
                                        </div>
                                        <div>
                                            { reservation.status }
                                        </div>
                                    </td>
                                    <td> <Link to={{ 
                                            pathname: '/hospital/reservation', 
                                            state: { reservation }
                                        }}>
                                            <FaEdit /> 
                                        </Link> 
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <Pagination
                    booksPerPage={reservationsPerPage}
                    totalBooks={reservations.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>
        </div>
    )
}