import React, {useEffect, useState} from "react";
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MedicineService from '../../services/medicine_service'

const AllMedicines = (props) => {
    const {setSelectedMedicine,setSelectedTab} = props
    const [medicines, setMedicines] = useState([])
    useEffect(() => {
        MedicineService.getAllMedicines().then((response) => {
            setMedicines(response.data)
        })
    }, [])

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

    return (<div className="medicines-container">
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
    </div>)
}

export default AllMedicines
