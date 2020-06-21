import React, { useEffect, useState } from "react";
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BedService from '../../../services/bedService'
import Pagination from "../../Pagination";

const AllBeds = (props) => {

    const { setSelectedBed, setSelectedTab } = props
    const [beds, setBeds] = useState([])
    const [pages, setPages] = useState({})
    const [page, setPage] = useState(1)

    useEffect(() => {
        BedService.getAllBeds(`page=${page}`).then((response) => {
            console.log(response.data);
            setBeds(response.data.beds)
            setPages(response.data.pageProps)
        })
    }, [page])

    const editBed = (bed) => {
        setSelectedBed(bed)
        setSelectedTab('edit_bed')
    }

    const deleteBed = (bed) => {
        BedService.deleteBed(bed._id).then((response) => {
            setBeds(beds.filter((bed) => response.data.bed._id.toString() !== bed._id.toString()))
            setSelectedTab('all_beds')
        })
    }

    return (
        <div className="medicines-container">
            <table id="medicines">
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Day Cost</th>
                        <th>Reservation Status</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {beds.map((bed) => {
                        return (<tr key={bed._id}>
                            <td>{bed.roomNumber}</td>
                            <td>EGP {bed.dayCost}</td>
                            <td>{bed.reserved ? "Reserved" : "Available"}</td>
                            <td>{bed.category}</td>
                            <td>
                                <div className="d-flex justify-content-around">
                                    <FontAwesomeIcon icon={faEdit}
                                        size="lg"
                                        onClick={() => editBed(bed)}
                                    />
                                    <FontAwesomeIcon icon={faTrashAlt}
                                        onClick={() => deleteBed(bed)}
                                        size="lg" />
                                </div>
                            </td>
                        </tr>)
                    })}
                </tbody>

            </table>
            <Pagination page={page} setPage={setPage} hasPrevious={pages.hasPrev} hasNext={pages.hasNext} />
        </div>
    )
}

export default AllBeds
