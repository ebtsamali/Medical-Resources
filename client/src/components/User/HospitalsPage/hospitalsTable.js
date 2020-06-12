import React, {useState} from 'react';
import '../../../styles/pharmacys.scss';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import BedsServices from '../../../services/bedService';



export default (props) => {
    const hospitals = props.hospitals;
    const [currentPage, setCurrentPage] = useState(1);
    const [hospitalsPerPage] = useState(5);
    const [bedsNumber, setBedsNumber] = useState(0);

    const indexOfLastHospital = currentPage * hospitalsPerPage;
    const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
    const currentHospitals = hospitals.slice(indexOfFirstHospital, indexOfLastHospital);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const availableBedsNumber = (id) => {
        BedsServices.getAllHospitalBeds(id).then(response => {
            if(response.data.length === 0){
                setBedsNumber(0);
            }else {
                setBedsNumber(response.data.length);
            }
        }).catch(error => {
            console.log(error.response);   
        })
    }
    
    return (
        <div className="pharmacys-container">
            <table id="medicines">
                <thead>
                    <tr id="hospitals">
                        <th>Hospital Name</th>
                        <th>Available Beds</th>
                        <th>Governorate</th>
                        <th>District</th>
                        <th>Street</th>
                    </tr>
                </thead>
                <tbody>
                {
                    currentHospitals.map(hospital => {
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
                booksPerPage={hospitalsPerPage}
                totalBooks={hospitals.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    )
}