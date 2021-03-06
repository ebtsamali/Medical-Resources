import React from "react";
import Pagination from "../../Pagination";
import { Link } from "react-router-dom";

const AllPharmacysTable = (props) => {

    const {pharmacys, pages,setPage, page} = props

    return (<>{pharmacys.length === 0 ? <div className="d-flex justify-content-center mt-5 w-100 h-100">
            <h1>No Pharmacy Available</h1>
        </div> :
    <div className="pharmacys-container">
        <table id="pharmacys">
            <thead>
            <tr>
                <th>Pharmacy Name</th>
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
                            state: {pharmacyId: pharmacy._id}
                        }}> {pharmacy.name} </Link>
                    </td>
                    <td>
                        {pharmacy.location && `${pharmacy.location[0].street}`}
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
    </div>
}</>)
}

export default AllPharmacysTable
