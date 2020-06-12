import React, {useState} from 'react';
import '../../../styles/pharmacys.scss';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import BedsServices from '../../../services/bedService';



export default (props) => {
    const [reservations, setReservations]
    const [currentPage, setCurrentPage] = useState(1);
    const [reservationsPerPage] = useState(5);

    const indexOfLastReservation = currentPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    
    return (
        <div className="pharmacys-container">
            <table id="medicines">
                <thead>
                    <tr id="hospitals">
                        <th>Patient Name</th>
                        <th>National Identity</th>
                        <th>Phone Number</th>
                        <th>Room Number</th>
                        <th>Cost Per day</th>
                        <th>Number of Days</th>
                        <th>Total Cost</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    currentReservations.map(hospital => {
                        return(
                            <tr key={hospital._id}>
                                <td> <Link to={{ 
                                        pathname: `/hospitals/${hospital.name}`, 
                                        hash: "#411@%19#", 
                                        state: { hospital }
                                    }}>
                                        {hospital.name} 
                                    </Link>
                                </td>
                                
                                {/** 
                                    hospital.phoneNumbers.map( (phone, index) => {
                                        return(<p key={index}> {phone} </p>)
                                    })
                                **/}
                                
                                <td>{hospital.avaalableBeds? hospital.avaalableBeds : "-"}</td>
                                <td>{hospital.location? hospital.location[0].governorate : ""}</td>
                                <td>{hospital.location? hospital.location[0].district : ""}</td>
                                <td>{hospital.location? hospital.location[0].street : ""}</td>
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
    )
}