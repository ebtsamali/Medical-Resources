import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../providers/auth_provider";
import UserService from '../../../services/userServices'
import Pagination from "../../Pagination";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RefreshIcon from '@material-ui/icons/Refresh';

const UserMedicineReservations = () => {

    const { user } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [pages, setPages] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        UserService.getAllMedicineReservations(`page=${page}`, user.id).then((response) => {
            setReservations(response.data.reservations)
            setPages(response.data.pageProps)
        })
    }, [page])

    const handleRefresh = () => {
        UserService.getAllMedicineReservations(`page=${page}`, user.id).then((response) => {
            setReservations(response.data.reservations)
            setPages(response.data.pageProps)
            setPage(page);
        })
    }

    return (
        <div className="d-flex flex-column">
            {/* <span onClick={handleRefresh} className="btn btn-success" style={{marginLeft: "75rem", marginBottom: "20px"}}>Refresh <RefreshIcon/></span> */}
            <table id="medicines" style={{width: "75rem"}}>
                <thead>
                    <tr>
                        <th>Reservation Status</th>
                        <th>Total Cost</th>
                        <th>Reserved At</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>

                    {reservations.map((reservation) => {
                        return (<tr key={reservation._id}>
                            <td>
                                {reservation.status === "cancelled" ? <FiberManualRecordIcon style={{ color: "red", marginRight: "0.3rem" }} /> :
                                    reservations.status === "fulfilled" ? <FiberManualRecordIcon style={{ color: "green", marginRight: "0.3rem" }} /> :
                                        <FiberManualRecordIcon style={{ color: "#f0ad4e", marginRight: "0.3rem" }} />
                                }
                                {reservation.status}
                            </td>
                            <td>EGP {reservation.totalPrice}</td>
                            <td>{reservation.createdAt.split('T')[0]} {reservation.createdAt.split('T')[1].substring(0, reservation.createdAt.split('T')[1].length - 2)}</td>
                            <td>
                                <a href={`/reservation/${reservation._id}`}>More Info</a>
                            </td>
                        </tr>)
                    })}
                </tbody>

            </table>
            <Pagination page={page} setPage={setPage} hasPrevious={pages.hasPrev} hasNext={pages.hasNext} />
        </div>
    )
}

export default UserMedicineReservations
