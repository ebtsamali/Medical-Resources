import React from "react";
import Pagination from "../../Pagination";
import { Link } from "react-router-dom";

const AllPharmacysTable = (props) => {

    const {pharmacys, pages,setPage, page} = props

    return (<div className="pharmacys-container">
        <table id="pharmacys">
            <thead>
            <tr>
                <th>Pharmacy Name</th>
                {/*<th>Pharmacy Phones</th>*/}
                <th>Pharmacy Address</th>
                <th>Delivery?</th>
            </tr>
            </thead>
            <tbody>
            {pharmacys && pharmacys.map((pharmacy) => {
                    return (<tr key={pharmacy._id}>
                        <td>
                        <Link to={{ 
                            pathname: `/pharmacys/${pharmacy.name}`, 
                            state: { pharmacyId: pharmacy._id}
                        }}> {pharmacy.name} </Link>
                        </td>


                        {/*<td>{pharmacy && pharmacy.phoneNumbers &&*/}
                        {/*    pharmacy.phoneNumbers.map((phone) => {*/}
                        {/*        return (<div key={phone}>{phone}<br/></div>)*/}
                        {/*    })*/}
                        {/*}</td>*/}
                        <td>
                            {pharmacy.location && `${ pharmacy.location[0].street}, ${pharmacy.location[0].district}, ${pharmacy.location[0].governorate}`}
                        </td>
                        <td>
                            {pharmacy.delivery ? 'Yes' : 'No'}
                        </td>
                    </tr>)
                })
            }
            </tbody>

        </table>
        <Pagination hasNext={pages.hasNext} hasPrevious={pages.hasPrevious} setPage={setPage} page={page}/>
    </div>)
}

export default AllPharmacysTable
