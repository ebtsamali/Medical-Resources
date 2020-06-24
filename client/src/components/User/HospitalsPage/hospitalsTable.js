import React, {useState, useEffect} from 'react';
import '../../../styles/pharmacys.scss';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import BedsServices from '../../../services/bedService';



export default (props) => {
    const hospitals = props.hospitals;
    const [currentPage, setCurrentPage] = useState(1);
    const [hospitalsPerPage] = useState(5);
    const [allbeds, setAllBeds] = useState([]);

    const indexOfLastHospital = currentPage * hospitalsPerPage;
    const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
    const currentHospitals = hospitals.slice(indexOfFirstHospital, indexOfLastHospital);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        BedsServices.getAllAvailableBeds().then(response => {
            if(response.data.length === 0){
                setAllBeds([]);
            }else {
                console.log(response.data);
                setAllBeds(response.data)
            }
        }).catch(error => {
            console.log(error.response);   
        })
    }, [])
    
    return (
        <div className="pharmacys-container">
            <table id="medicines">
                <thead>
                    <tr id="hospitals">
                        <th>Hospital Name</th>
                        <th>Available Rooms</th>
                        <th>Governorate</th>
                        <th>District</th>
                        <th>Street</th>
                    </tr>
                </thead>
                <tbody>
                {
                    currentHospitals.map(hospital => {
                        const hospitalbeds = allbeds.filter(bed => {
                            return bed.hospital === hospital._id
                        })

                        return(
                            <tr key={hospital._id}>
                                <td><Link to={{ 
                                        pathname: `/hospitals/${hospital.name}`, 
                                        state: { hospitalId: hospital._id}
                                    }}>
                                        {hospital.name} 
                                    </Link>
                                </td>
                                
                                <td>{hospitalbeds.length}</td>
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
