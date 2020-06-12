import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faTimes} from "@fortawesome/free-solid-svg-icons";

const MedicineList = () => {
    return (<div className="medicines-list-container">
        <div className="medicines-list-arrows">
            <FontAwesomeIcon onClick={() => {
            }} size="2x" icon={faChevronLeft}/>
        </div>
        <div className="medicines-list-content">
            <div className="medicines-list-card">
                <div className="medicines-card-header">
                </div>
                <h5>medicinex</h5>
                 <div className="quantity-container">
                    <p>Quantity : 10</p>
                </div>
                <p>Unit Price : 233LE</p>
            </div>
        </div>
        <div className="medicines-card-cart-arrows">
            <FontAwesomeIcon onClick={() => {
            }} size="2x" icon={faChevronRight}/>
        </div>
    </div>)
}

export default MedicineList
