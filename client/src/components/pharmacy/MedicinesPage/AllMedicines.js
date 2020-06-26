import React, {useEffect, useState} from "react";
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MedicineService from '../../../services/medicine_service'
import Pagination from "../../Pagination";

const AllMedicines = (props) => {
    const {setSelectedMedicine,setSelectedTab} = props
    const [medicines, setMedicines] = useState([])
    const [pages, setPages] = useState({})
    const [page, setPage] = useState(1)
    useEffect(() => {
        MedicineService.getAllMedicines(`page=${page}`).then((response) => {
            setMedicines(response.data.medicines)
            setPages(response.data.pages)
        })
    }, [page])

    const editMedicine = (medicine) => {
        return (e) =>{
            setSelectedMedicine(medicine)

            setSelectedTab('edit_medicine')
        }
    }

    const deleteMedicine = (id) => {
        return (e) =>{
            MedicineService.deleteMedicine(id).then((response) => {
                console.log(response.data)
                setMedicines(medicines.filter((medicine)=> response.data._id.toString() !== id.toString()))
                setSelectedTab('all_medicine')
            })
        }
    }

    return (<>{medicines.length === 0? <div className="d-flex justify-content-center mt-5 w-100 h-100">
        <h3>No Medicines Available, Please <b><a style={{textDecoration: 'underline',color:'blue',cursor:'pointer'}} onClick={()=>{
            props.setSelectedTab('add_medicine')
        }}>Add Medicines</a></b></h3>
    </div> :<div className="medicines-container">
        <table id="medicines">
            <thead>
            <tr>
                <th>Medicine Name</th>
                <th>Medicine Price</th>
                <th>Medicine Quantity</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>

            {medicines.map((medicine)=>{
                return (<tr key={medicine._id}>
                    <td>{medicine.name}</td>
                    <td>{medicine.price} LE</td>
                    <td>{medicine.quantity}</td>
                    <td>
                        <div className="d-flex justify-content-around">
                            <FontAwesomeIcon icon={faEdit}
                                             size="lg"
                                             onClick={editMedicine(medicine)}/>
                             <FontAwesomeIcon icon={faTrashAlt}
                                              onClick={deleteMedicine(medicine._id)}
                                              size="lg"/>
                        </div>
                    </td>
                </tr>)
            })}
            </tbody>

        </table>
        <Pagination page={page} setPage={setPage} hasPrevious={pages.hasPrevious} hasNext={pages.hasNext}/>
    </div>}</>)
}

export default AllMedicines
