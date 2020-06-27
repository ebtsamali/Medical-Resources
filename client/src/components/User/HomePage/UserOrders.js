import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../providers/auth_provider";
import UserService from '../../../services/userServices'
import Pagination from "../../Pagination";
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import RefreshIcon from '@material-ui/icons/Refresh';
import {Link} from "react-router-dom";

const UserOrders = () => {

    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [pages, setPages] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        UserService.getAllOrders(`page=${page}`, user.id).then((response) => {
            setOrders(response.data.orders)
            setPages(response.data.pageProps)
        })
    }, [page])

    const handleRefresh = () => {
        UserService.getAllOrders(`page=${page}`, user.id).then((response) => {
            setOrders(response.data.orders)
            setPages(response.data.pageProps)
            setPage(page);
        })
    }

    return (<>{orders.length === 0? <div className="d-flex justify-content-center mt-5 w-100 h-100">
            <h3>No Orders Available, Please <b><Link  to="/pharmacys">Order Medicine</Link></b></h3>
        </div> :
        <div className="d-flex flex-column">
            {/* <span onClick={handleRefresh} className="btn btn-success" style={{marginLeft: "75rem", marginBottom: "20px"}}>Refresh <RefreshIcon/></span> */}
            <table id="medicines" style={{width: "75rem"}}>
                <thead>
                    <tr>
                        <th>Order Status</th>
                        <th>Total Cost</th>
                        <th>Placed At</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>

                    {orders.map((order) => {
                        return (<tr key={order._id}>
                            <td>
                                {order.status === "placed" ? <HourglassFullIcon style={{ color: "#5bc0de", marginRight: "0.3rem" }} /> :
                                    (order.status === "shipped") ? <LocalShippingIcon style={{ color: "#f0ad4e ", marginRight: "0.3rem" }} /> :
                                        <DoneAllIcon style={{ color: "#5cb85c", marginRight: "0.3rem" }} />
                                }
                                {order.status}
                            </td>
                            <td>EGP {order.totalPrice}</td>
                            <td>{order.createdAt.split('T')[0]} {order.createdAt.split('T')[1].substring(0, order.createdAt.split('T')[1].length - 2)}</td>
                            <td>
                                <Link to={`/order/${order._id}`}>More Info</Link>
                            </td>
                        </tr>)
                    })}
                </tbody>

            </table>
            <Pagination page={page} setPage={setPage} hasPrevious={pages.hasPrev} hasNext={pages.hasNext} />
        </div>}</>
    )
}

export default UserOrders
