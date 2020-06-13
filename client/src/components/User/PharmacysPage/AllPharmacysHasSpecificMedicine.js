import React, {useState} from "react";
import Pagination from "../../Pagination";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import {addToCart, medicineIsExist, removeMedicineFromCart, getCart} from "../../../utils/cart_utils";

const AllPharmacysHasSpecificMedicine = (props) => {

    const {pharmacys, pages,setPage, page} = props;
    const [cart, setCart] = useState(getCart())
    const handleAddToCart = (pharmacyId,medicineId) => {
        return () => {
            setCart(addToCart(pharmacyId, medicineId));
        }
    }

    const handleRemoveFromCart = (pharmacyId,medicineId) => {
        return () => {
            setCart(removeMedicineFromCart(pharmacyId,medicineId))
        }
    }
    return (<div className="pharmacys-container">
        <table id="pharmacys">
            <thead>
            <tr>
                <th>Pharmacy Name</th>
                <th>Pharmacy Address</th>
                <th>Delivery?</th>
                <th>Medicine Name</th>
                <th>Medicine Price</th>
                <th>Medicine Quantity</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {pharmacys &&
                pharmacys.map((pharmacy) => {
                    return (<tr key={pharmacy._id}>
                        <td>{pharmacy.pharmacy && pharmacy.pharmacy.name}</td>
                        <td>
                            {pharmacy.pharmacy && `${ pharmacy.pharmacy.location[0].street}, ${pharmacy.pharmacy.location[0].district}, ${pharmacy.pharmacy.location[0].governorate}`}
                        </td>
                        <td>
                            {pharmacy.pharmacy &&  pharmacy.pharmacy.delivery ? 'Yes' : 'No'}
                        </td>
                        <td>
                            {pharmacy.name}
                        </td>
                        <td>
                            {pharmacy.price}
                        </td>
                        <td>
                            {pharmacy.quantity}
                        </td>
                        <td>
                            {pharmacy.pharmacy && (pharmacy.quantity === 0 ? `Sold Out` :((medicineIsExist(pharmacy._id)) ? <RemoveShoppingCartIcon onClick={handleRemoveFromCart( pharmacy.pharmacy._id,pharmacy._id)}/> : <AddShoppingCartIcon onClick={handleAddToCart( pharmacy.pharmacy._id,pharmacy._id)}/>))}
                        </td>
                    </tr>)
                })
            }
            </tbody>

        </table>
        <Pagination hasNext={pages.hasNext} hasPrevious={pages.hasPrevious} setPage={setPage} page={page}/>
    </div>)
}

export default AllPharmacysHasSpecificMedicine
