import React,{ useState, useEffect } from "react";
import MedicineService from '../../../services/medicine_service'
import ErrorMessage from "../../other/ErrorMessage";

const MedicineForm = (props) => {

    const {selectedTab,setSelectedTab} = props;
    const [medicineName,setMedicineName] = useState('');
    const [medicinePrice,setMedicinePrice] = useState(0);
    const [medicineQuantity,setMedicineQuantity] = useState(1);
    const title = (selectedTab === 'add_medicine') ? 'Add New Medicine' : 'Edit Current Medicine';
    const btnText = (selectedTab === 'add_medicine') ? 'Add New Medicine' : 'Save Changes';
    const [errors, setErrors] = useState({})

    useEffect(()=>{
        if(selectedTab === 'edit_medicine') {
            const {selectedMedicine} = props
            setFormState(selectedMedicine)
        }
    },[])

    const setFormState = (medicine) => {
        setMedicinePrice(medicine.price)
        setMedicineQuantity(medicine.quantity);
        setMedicineName(medicine.name)
    }

    const submit = () => {
        const medicine = {
            name:medicineName,
            price:medicinePrice,
            quantity:medicineQuantity
        }
        if(selectedTab === 'add_medicine') {
            MedicineService.addMedicine(medicine).then((response)=>{
                setFormState({name:'',price: 0,quantity: 1})
                setSelectedTab('all_medicine')
            }).catch((error)=>{
                console.log(error.response.data)
                setErrors(error.response.data.errors)
            })
        } else {
            const {selectedMedicine} = props
            MedicineService.updateMedicine(selectedMedicine._id,medicine).then((response)=>{
                setFormState({name:'',price: 0,quantity: 1})
                setSelectedTab('all_medicine')
            }).catch((error)=>{
                console.log(error.response.data)
                setErrors(error.response.data.errors)
            })

        }
    }
    return(<div className="x-medicine-form">
        <h3>{title}</h3>
        <div className="d-flex flex-row">
            <p>Medicine Name :</p>
            <div >
                <input className="form-input" value={medicineName} onChange={(e)=> { const {target: {value}} = e; setMedicineName(value)}} type="text" placeholder="Medicine Name"/>
            </div>
        </div>
        {errors.name && <ErrorMessage message={errors.name}/>}

        <div>
            <p>Medicine Price :</p>
            <div>
                <input className="form-input" value={medicinePrice} onChange={(e)=> { const {target: {value}} = e; setMedicinePrice(value)}} type="number" placeholder="Medicine Price"/>
            </div>
        </div>

        {errors.price && <ErrorMessage message={errors.price}/>}
        <div>
            <p>Medicine Quantity :</p>
            <div >
                <input min="1"  className="form-input" value={medicineQuantity} onChange={(e)=> { const {target: {value}} = e; setMedicineQuantity(value)}} type="number" placeholder="Medicine Quantity"/>
            </div>
        </div>
        {errors.quantity && <ErrorMessage message={errors.quantity}/>}

        <button onClick={submit} className="submit">{btnText}</button>
    </div>)
}

export default MedicineForm
