import React, { useEffect, useState } from "react";
import MedicineService from '../../../services/medicine_service';
import CollapsibleTable from './AllReservationsTable';

const AllReservations = (props) => {

    const [reservations, setReservations] = useState([])

    useEffect(() => {
        MedicineService.getMedicineReservations()
            .then((response) => {
                setReservations(response.data.reservations);
            })
            .catch((error) => {
                // console.log(error);
            });
    }, []);

    return (
        <div style={{height: "600px", paddingTop: "auto"}}>
            <CollapsibleTable rows={reservations}/>
        </div>
    )
}

export default AllReservations
