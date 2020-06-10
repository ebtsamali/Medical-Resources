import React, {useContext, useEffect, useState} from "react";
import Header from "../../Header";
import '../../../styles/cart.scss'
import UserService from '../../../services/userServices'
import {getCart} from "../../../utils/cart_utils";
import {
    faArrowLeft,
    faArrowRight, faChevronLeft, faChevronRight,
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {AuthContext} from "../../../providers/auth_provider";
import {removePharmacyFromCart} from "../../../utils/cart_utils";
import {Link} from "react-router-dom";

const CartPage = () => {

    const {user} = useContext(AuthContext);
    const [cartDetails, setCartDetails] = useState([])
    const [currentMedicines, setCurrentMedicines] = useState([])
    const [currentPharmacyIndex, setCurrentPharmacyIndex] = useState(-1)
    const [currentMedicineIndex, setCurrentMedicineIndex] = useState(-1)
    const [totalPrice, setTotalPrice] = useState(0)


    useEffect(() => {
        UserService.getCartDetails(getCart()).then((response) => {
            const cart = response.data
            cart.forEach((pharmacy) => {
                pharmacy.medicines = pharmacy.medicines.map((medicine) => {
                    medicine.userQuantity = 1
                    return medicine
                })
            })
            setCartDetails(cart)
            if (response.data.length > 0) {
                setCurrentPharmacyIndex(0)
            }
        })
    }, [])

    useEffect(() => {
        if (currentPharmacyIndex >= 0) {
            setCurrentMedicineIndex(0)
            setCurrentMedicines(cartDetails[currentPharmacyIndex].medicines)
            setTotalPrice(cartDetails[currentPharmacyIndex].medicines.reduce((acc, medicine) => {
                return acc + (medicine.price*medicine.userQuantity)
            }, 0))
        } else {
            setCurrentPharmacyIndex(-1)
        }

    }, [currentPharmacyIndex])

    const handleChangeQuantity = (index) => {
        return (e) => {
            const {target: {value}} = e;
            setTotalPrice(((totalPrice - currentMedicines[index].userQuantity * currentMedicines[index].price) + (Number(value) * currentMedicines[index].price)))
            currentMedicines[index].userQuantity = value
            setCurrentMedicines(currentMedicines)
        }
    }

    const handleClickReserve = () => {
        const pharmacyId = cartDetails[currentPharmacyIndex].pharmacy._id
        const data = {totalPrice,order: []}
        currentMedicines.forEach((medicine)=>{
            data.order.push({medicine:medicine._id,quantity:medicine.userQuantity, price:medicine.price})
        })
        UserService.reserveMedicine(user.id,pharmacyId,data).then((response)=>{
            setCartDetails(cartDetails.filter((pharmacy)=> pharmacyId!== pharmacy.pharmacy._id))
            removePharmacyFromCart(pharmacyId)
        })
    }

    const handleClickCloseReservation = (pharmacyId) => {
        return () => {
            setCartDetails(cartDetails.filter((pharmacy)=> pharmacyId!== pharmacy.pharmacy._id))
            removePharmacyFromCart(pharmacyId)
        }
    }


    return (<div className="x-container-cart">
        <Header/>

        {currentPharmacyIndex<0 ? <div className="empty-cart-container">
            <img src="../../../../img/empty-cart.png"/>
            <h2>Your cart is empty!</h2>
            <Link to="/pharmacys"><h5>Add Medicines To Cart</h5></Link>
        </div> : <div className="body-cart-container">
            <div className="x-footer">

                {(currentPharmacyIndex - 1 >= 0) && <FontAwesomeIcon onClick={() => {
                    setCurrentPharmacyIndex(currentPharmacyIndex - 1)
                }} color="#28303A" size="3x" icon={faArrowLeft}/>}
            </div>
            {(currentPharmacyIndex >= 0 && cartDetails[currentPharmacyIndex]) && <div className="pharmacy-cart-card">
                <div className="pharmacy-cart-card-header">
                    <FontAwesomeIcon icon={faTimes}
                                     onClick={handleClickCloseReservation(cartDetails[currentPharmacyIndex].pharmacy._id)}/>
                </div>
                <div>
                    <h4>{cartDetails[currentPharmacyIndex].pharmacy.name}</h4>
                </div>
                <div>
                    <p>{`${cartDetails[currentPharmacyIndex].pharmacy.location[0].street}, ${cartDetails[currentPharmacyIndex].pharmacy.location[0].district}, ${cartDetails[currentPharmacyIndex].pharmacy.location[0].governorate}`}</p>
                </div>
                <div className="medicines-container-cart">
                    <div className="medicines-card-cart-arrows">
                        {(currentMedicineIndex - 1 >= 0) && <FontAwesomeIcon onClick={() => {
                            setCurrentMedicineIndex(currentMedicineIndex - 1)
                        }} size="2x" icon={faChevronLeft}/>}
                    </div>
                    <div className="medicines-card-content">


                        {(currentMedicineIndex >= 0 && currentMedicines[currentMedicineIndex]) &&
                        <div className="medicines-card">
                            <div className="medicines-card-header">
                                <FontAwesomeIcon size="xs" icon={faTimes}/>
                            </div>
                            <h5>{currentMedicines[currentMedicineIndex].name}</h5>
                            <div className="quantity-container">
                                <p>Quantity : </p>
                                <input type="number" onChange={handleChangeQuantity(currentMedicineIndex)}
                                       min="1"
                                       value={currentMedicines[currentMedicineIndex].userQuantity}
                                       max={currentMedicines[currentMedicineIndex].quantity}/>
                            </div>
                            <p>Unit Price : {currentMedicines[currentMedicineIndex].price}LE</p>
                        </div>}


                        {(currentMedicineIndex >= 0 && currentMedicineIndex + 1 < currentMedicines.length && currentMedicines[currentMedicineIndex]) &&
                        <div className="medicines-card">
                            <div className="medicines-card-header">
                                <FontAwesomeIcon size="xs" icon={faTimes}/>
                            </div>
                            <h5>{currentMedicines[currentMedicineIndex + 1].name}</h5>
                            <div className="quantity-container">
                                <p>Quantity : </p>
                                <input type="number" onChange={handleChangeQuantity(currentMedicineIndex + 1)}
                                       min="1"
                                       value={currentMedicines[currentMedicineIndex + 1].userQuantity}
                                       max={currentMedicines[currentMedicineIndex + 1].quantity}/>
                            </div>
                            <p>Unit Price : {currentMedicines[currentMedicineIndex + 1].price}LE</p>
                        </div>}
                    </div>
                    <div className="medicines-card-cart-arrows">
                        {(currentMedicineIndex + 2 < currentMedicines.length) && <FontAwesomeIcon onClick={() => {
                            setCurrentMedicineIndex(currentMedicineIndex + 1)
                        }} size="2x" icon={faChevronRight}/>}
                    </div>

                </div>
                <div className="pharmacy-cart-card-footer">
                    <h5>Total Price : {totalPrice}LE</h5>
                    <div className="btn-container">
                        {cartDetails[currentPharmacyIndex].pharmacy.delivery && <button>Order</button>}
                        <button onClick={handleClickReserve}>Reserve</button>
                    </div>
                </div>
            </div>}
            <div className="x-footer">

                {(currentPharmacyIndex + 1 < cartDetails.length) && <FontAwesomeIcon onClick={() => {
                    setCurrentPharmacyIndex(currentPharmacyIndex + 1)
                }} color="#28303A" size="3x" icon={faArrowRight}/>}
            </div>
        </div>}
    </div>)
}

export default CartPage
