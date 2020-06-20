import React, { useEffect, useState } from "react";
import MedicineService from '../../../services/medicine_service';
import CollapsibleTable from './AllOrdersTable';

const AllOrders = (props) => {

    const [orders, setOrders] = useState([]);
    const [statusChanged, setStatusChanged] = useState(false);

    useEffect(() => {
        MedicineService.getMedicineOrders()
            .then((response) => {
                // console.log(response.data.orders);
                setOrders(response.data.orders);
            })
            .catch((error) => {
                // console.log(error);
            })
    }, [statusChanged]);

    return (
        <div style={{height: "600px", paddingTop: "auto"}}>
            <CollapsibleTable rows={orders} setStatusChanged={setStatusChanged} statusChanged={statusChanged} />
        </div>
    )
}

export default AllOrders
