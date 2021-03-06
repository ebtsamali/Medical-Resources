import React from "react";
import UserInfo from "./UserInfo";
import PharmacyInfo from "./PharmacyInfo";
import {Link} from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const InfoCard = (props) => {
    const {type, data} = props

    const buildUserInfo = (type, data) => {
        const user = {}
        if (type === 'reservation' && data.user) {
            console.log(data.user.address)
            user.name = `${data.user.firstName} ${data.user.lastName}`;
            user.phone = (data.user.phoneNumber)?`${data.user.phoneNumber}`:'';
            user.address = (data.user.address && data.user.address.street && data.user.address.district && data.user.address.governorate && data.user.address.flatNum) ?  `${data.user.address.street}, ${data.user.address.district}, ${data.user.address.governorate}, Flat Number: ${data.user.address.flatNum}` : '';
        } else if (type === 'order' && data.user) {
            user.name = `${data.user.firstName} ${data.user.lastName}`
            user.phone = data.userPhone
            user.address = data.userAddress
        }
        return user
    }

    const buildPharmacyInfo = (data) => {
        const pharmacy = {}
        if (data.pharmacy) {
            pharmacy.name = `${data.pharmacy.name}`
            pharmacy.address = `${data.pharmacy.location[0].street}, ${data.pharmacy.location[0].district}, ${data.pharmacy.location[0].governorate}`
            pharmacy.status = data.status
            pharmacy.medicines = buildMedicinesList(data)
        }
        return pharmacy
    }

    const buildMedicinesList = (data) => {
        let medicines = []
        if (data.order) {
            medicines = data.order.map((medicine) => {
                return {
                    price: medicine.price,
                    quantity: medicine.quantity,
                    name: medicine.medicine.name,
                    id: medicine._id
                }
            })
        }
        return medicines
    }
    return (
        <div className="info-card-container">
            <Link to="/user" style={{color: "black", width: "70px"}}>
                <span>
                    <ArrowBackIosIcon style={{fontSize: "20px"}}/>
                    <b>Back</b>
                </span>
            </Link>
            <UserInfo data={buildUserInfo(type, data)}/>
            <PharmacyInfo data={buildPharmacyInfo(data)}/>
            <div className="x-footer">
                <h5><b>Total Price:</b> {data.totalPrice}</h5>
            </div>
        </div>)
}

export default InfoCard
