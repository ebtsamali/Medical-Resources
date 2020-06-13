import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../providers/auth_provider";
import UserService from '../../../services/userServices'
import Pagination from "../../Pagination";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const UserHospitalReservations = () => {

    const { user } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [pages, setPages] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        UserService.getAllBedReservations(`page=${page}`, user.id).then((response) => {
            setReservations(response.data.reservations)
            setPages(response.data.pageProps)
            console.log(reservations);
        })
    }, [page])


    return (
        <div className="medicines-container">
            <table id="medicines">
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
                                {reservation.status === "cancelled" ? <FiberManualRecordIcon style={{ color: "red", marginRight: "0.3rem" }} /> : <FiberManualRecordIcon style={{ color: "green", marginRight: "0.3rem" }} />}
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

export default UserHospitalReservations
