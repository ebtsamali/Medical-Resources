import React,{ useState } from "react";
import MedicineService from '../../services/medicine_service'

const MedicineForm = (props) => {

    const {selectedTab,setSelectedTab} = props;
    const [medicineName,setMedicineName] = useState('');
    const [medicinePrice,setMedicinePrice] = useState(0);
    const [medicineQuantity,setMedicineQuantity] = useState(1);
    const title = (selectedTab === 'add_medicine') ? 'Add New Medicine' : 'Edit Current Medicine';
    const btnText = (selectedTab === 'add_medicine') ? 'Add New Medicine' : 'Save Changes';

    const submit = () => {
        const medicine = {
            name:medicineName,
            price:medicinePrice,
            quantity:medicineQuantity
        }
        if(selectedTab === 'add_medicine') {
            MedicineService.addMedicine(medicine).then((response)=>{
                console.log(response.data)
                setMedicinePrice(0)
                setMedicineQuantity(1);
                setMedicineName('')
                setSelectedTab('all_medicine')
            }).catch((error)=>{
                console.log(error.response.data)
            })
        }
    }
    return(<div className="x-medicine-form">
        <h3>{title}</h3>
        <div>
            <p>Medicine Name :</p>
            <div>
                <input className="form-input" value={medicineName} onChange={(e)=> { const {target: {value}} = e; setMedicineName(value)}} type="text" placeholder="Medicine Name"/>
            </div>
        </div>

        <div>
            <p>Medicine Price :</p>
            <div>
                <input className="form-input" value={medicinePrice} onChange={(e)=> { const {target: {value}} = e; setMedicinePrice(value)}} type="number" placeholder="Medicine Price"/>
            </div>
        </div>

        <div>
            <p>Medicine Quantity :</p>
            <div>
                <input min="1"  className="form-input" value={medicineQuantity} onChange={(e)=> { const {target: {value}} = e; setMedicineQuantity(value)}} type="number" placeholder="Medicine Quantity"/>
            </div>
        </div>

        <button onClick={submit} className="submit">{btnText}</button>
    </div>)
}

export default MedicineForm
