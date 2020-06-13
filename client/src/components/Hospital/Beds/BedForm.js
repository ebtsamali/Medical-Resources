import React, { useState, useEffect } from "react";
import BedService from '../../../services/bedService'
import ErrorMessage from "../../other/ErrorMessage";

const BedForm = (props) => {

    const { selectedTab, setSelectedTab } = props;
    const [roomNumber, setRoomNumber] = useState('');
    const [dayCost, setDayCost] = useState(0);
    const [reserved, setReserved] = useState(false);

    const title = (selectedTab === 'add_bed') ? 'Add New Bed' : 'Edit Current Bed';
    const btnText = (selectedTab === 'add_bed') ? 'Add New Bed' : 'Save Changes';
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (selectedTab === 'edit_bed') {
            const { selectedBed } = props;
            setFormState(selectedBed);
        }
    }, [])

    const setFormState = (bed) => {
        setRoomNumber(bed.roomNumber);
        setDayCost(bed.dayCost);
        setReserved(bed.reserved);
    }

    const onChangeRoomNumber = (e) => {
        setRoomNumber(e.target.value);
    }

    const onChangeDayCost = (e) => {
        setDayCost(e.target.value);
    }

    const onChangeReserve = (e) => {
        setReserved(e.target.checked);
    }

    const onSubmit = () => {

        if(!roomNumber) {
            setErrors({...errors, roomNumber: "Room Number is Required"});
            return;
        }

        if(!dayCost || dayCost === 0) {
            setErrors({...errors, dayCost: "Day Cost is Required"});
            return;
        }

        const bed = {
            roomNumber,
            dayCost,
            reserved
        }

        if (selectedTab === 'add_bed') {
            BedService.addBed(bed).then((response) => {
                setFormState({ roomNumber: '', dayCost: 0, reserved: false });
                setSelectedTab('all_beds')
            }).catch((error) => {
                setErrors(error.response.data.errors)
            })
        } else {
            const { selectedBed } = props;
            const updatedBedKeys = Object.keys(bed);
            updatedBedKeys.forEach(key => {
                selectedBed[key] = bed[key];
            })
            BedService.updateBed(selectedBed).then((response) => {
                setFormState({ roomNumber: '', dayCost: 0, reserved: false });
                setSelectedTab('all_beds')
            }).catch((error) => {
                setErrors(error.response.data.errors)
            })

        }
    }
    return (
    <div className="x-medicine-form">
        <h3>{title}</h3>
        <div className="d-flex flex-row">
            <p>Room Number: </p>
            <div >
                <input className="form-input" value={roomNumber} onChange={ onChangeRoomNumber } type="text" placeholder="Room Number" />
            </div>
        </div>
        {errors.roomNumber && <ErrorMessage message={errors.roomNumber} />}

        <div>
            <p>Day Cost:</p>
            <div className="ml-5">
                <input className="form-input" value={dayCost} onChange={ onChangeDayCost } type="number" placeholder="Day Cost" />
            </div>
        </div>

        {errors.dayCost && <ErrorMessage message={errors.dayCost} />}
        <div>
            <p>Reserved? </p>
            <div>
                <input style={{marginLeft: "-27rem"}} className="form-input" checked={reserved} onChange={ onChangeReserve } type="checkbox"/>
            </div>
        </div>
        {errors.quantity && <ErrorMessage message={errors.quantity} />}

        <button onClick={ onSubmit } className="submit">{btnText}</button>
    </div>
    )
}

export default BedForm
