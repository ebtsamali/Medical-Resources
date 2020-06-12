import React from "react";
import Header from "../../Header";
import '../../../styles/preview_status.scss'
import InfoCard from "./InfoCard";

const OrderStatusPage = () => {
    return(<div className="preview-status-container">
        <Header/>
        <div className="preview-status-content">
            <InfoCard/>
        </div>
    </div>)
}
export default OrderStatusPage
