import React, { useEffect, useState } from "react";
import MedicineService from '../../../services/medicine_service';
import CollapsibleTable from './AllReservationsTable';

const AllReservations = (props) => {

    const { setSelectedBed, setSelectedTab } = props
    const [reservations, setReservations] = useState([])
    const [pages, setPages] = useState({})
    const [page, setPage] = useState(1)

    useEffect(() => {
        MedicineService.getMedicineReservations(`page=${page}`)
            .then((response) => {
                console.log(response.data.reservations);
                setReservations(response.data.reservations);
                setPages(response.data.pageProps);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [page]);

    return (
        <div style={{marginTop: "-350px", height: "300px", width: "85rem"}}>
            <CollapsibleTable rows={reservations}/>
        </div>
    )
}

export default AllReservations