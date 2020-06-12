import React, { useEffect, useState } from "react";
import MedicineService from '../../../services/medicine_service';
import CollapsibleTable from './AllReservationsTable';

const AllReservations = (props) => {

    const [reservations, setReservations] = useState([])

    useEffect(() => {
        MedicineService.getMedicineReservations()
            .then((response) => {
                console.log(response.data.reservations);
                setReservations(response.data.reservations);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div style={{marginTop: "-350px", height: "300px"}}>
            <CollapsibleTable rows={reservations}/>
        </div>
    )
}

export default AllReservations