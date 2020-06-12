import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faTimes} from "@fortawesome/free-solid-svg-icons";

const MedicineList = (props) => {
    const {data} = props
    const [medicines,setMedicines] = useState(data)
    const [currentMedicineIndex, setCurrentMedicineIndex] = useState(-1)
    useEffect(()=>{
        if(medicines.length > 0) {
            setCurrentMedicineIndex(0)
        }
    },[medicines])
    return (<div className="medicines-list-container">
        <div className="medicines-list-arrows">
            {(currentMedicineIndex - 1 >= 0) && <FontAwesomeIcon onClick={() => {
                setCurrentMedicineIndex(currentMedicineIndex-1)
            }} size="2x" icon={faChevronLeft}/>}
        </div>
        <div className="medicines-list-content">
            {(currentMedicineIndex >= 0) && <div className="medicines-list-card">
                <div className="medicines-card-header">
                </div>
                <h5>{medicines[currentMedicineIndex].name}</h5>
                <div className="quantity-container">
                    <p>Quantity : {medicines[currentMedicineIndex].quantity}</p>
                </div>
                <p>Unit Price : {medicines[currentMedicineIndex].price}LE</p>
            </div>}
        </div>
        <div className="medicines-card-cart-arrows">
            {(currentMedicineIndex + 1 < medicines.length) &&<FontAwesomeIcon onClick={() => {
                setCurrentMedicineIndex(currentMedicineIndex+1)
            }} size="2x" icon={faChevronRight}/>}
        </div>
    </div>)
}

export default MedicineList
