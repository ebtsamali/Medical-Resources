import React from "react";
import Pagination from "../../Pagination";

const AllPharmacysHasSpecificMedicine = (props) => {
    const {pharmacys, pages,setPage, page} = props
    return (<div className="pharmacys-container">
        <table id="pharmacys">
            <thead>
            <tr>
                <th>Pharmacy Name</th>
                {/*<th>Pharmacy Phones</th>*/}
                <th>Pharmacy Address</th>
                <th>Delivery?</th>
                <th>Medicine Name</th>
                <th>Medicine Price</th>
                <th>Medicine Quantity</th>
            </tr>
            </thead>
            <tbody>
            {pharmacys &&
                pharmacys.map((pharmacy) => {
                    return (<tr key={pharmacy._id}>
                        <td>{pharmacy.pharmacy && pharmacy.pharmacy.name}</td>
                        {/*<td>{pharmacy.pharmacy && pharmacy.pharmacy.phoneNumbers.map((phone) => {*/}
                        {/*        return (<div key={phone}>{phone}<br/></div>)*/}
                        {/*    })*/}
                        {/*}</td>*/}
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
                    </tr>)
                })
            }
            </tbody>

        </table>
        <Pagination hasNext={pages.hasNext} hasPrevious={pages.hasPrevious} setPage={setPage} page={page}/>
    </div>)
}

export default AllPharmacysHasSpecificMedicine
