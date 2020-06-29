import React, { useState, useEffect } from "react";
import BedService from '../../../services/bedService'
import ErrorMessage from "../../other/ErrorMessage";
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import RegistrationValidations from "../../Registration/RegistrationValidations";
import { isNumeric } from "validator";

const useStyles = makeStyles((theme) => ({
    select: {
        '&:before': {
            borderColor: "#4ABBA9",
        },
        '&:after': {
            borderColor: "#4ABBA9",
        }
    },
    icon: {
        fill: "#4ABBA9",
    },
    label: {
        '.MuiInputLabel-root': {
            color: "#4ABBA9",
        }
    },
}));

const BedForm = (props) => {

    const { selectedTab, setSelectedTab } = props;
    const [roomNumber, setRoomNumber] = useState(0);
    const [dayCost, setDayCost] = useState(0);
    const [reserved, setReserved] = useState(false);
    const [category, setCategory] = useState("normal");
    const classes = useStyles();
    const [validCategory, setValidCategory] = useState(true);
    const [validCategoryMessage, setValidCategoryMessage] = useState(null);
    const [categories] = useState(["normal", "intensive care"]);

    const title = (selectedTab === 'add_bed') ? 'Add New Room' : 'Edit Current Room';
    const btnText = (selectedTab === 'add_bed') ? 'Add New Room' : 'Save Changes';
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (selectedTab === 'edit_bed') {
            const { selectedBed } = props;
            setFormState(selectedBed);
        }
    }, [])

    const validateCategory = (value) => {
        if (value !== "normal" && value !== "intensive care") {
            return (
                <ErrorMessage message={"Invalid Room Type."} />
            );
        }
    }

    const setFormState = (bed) => {
        setRoomNumber(bed.roomNumber);
        setDayCost(bed.dayCost);
        setReserved(bed.reserved);
        setCategory(bed.category);
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

    const onChangeCategory = (e) => {
        setCategory(e.target.value);
        setValidCategory(true);
        setValidCategoryMessage(null);
        let reqReturn = RegistrationValidations.required(e.target.value);
        if (reqReturn) {
            setValidCategory(false);
            setValidCategoryMessage(reqReturn);
            return;
        }
        let validReturn = validateCategory(e.target.value);
        if (validReturn) {
            setValidCategory(false);
            setValidCategoryMessage(validReturn);
        }
    }

    const onSubmit = () => {

        if (errors.roomNumber) {
            setErrors(delete errors.roomNumber);
        }

        if (errors.dayCost) {
            setErrors(delete errors.dayCost);
        }

        if (typeof roomNumber === 'string') {
            if (!roomNumber || roomNumber == 0 || !isNumeric(roomNumber)) {
                setErrors({ ...errors, roomNumber: "Room Number is Required and must be a Number" });
                return;
            }

            if(parseInt(roomNumber) < 0) {
                setErrors({ ...errors, roomNumber: "Room Number must be a positive Number" });
                return;
            }
        } else {

            if (!roomNumber || roomNumber == 0) {
                setErrors({ ...errors, roomNumber: "Room Number is Required" });
                return;
            }

            if(roomNumber < 0) {
                setErrors({ ...errors, roomNumber: "Room Number must be a positive Number" });
                return;
            }

        }

        if(typeof dayCost === "string") {
            if (!dayCost || dayCost == 0 || !isNumeric(dayCost)) {
                setErrors({ ...errors, dayCost: "Day Cost is Required and must be a Number" });
                return;
            }
            if(parseInt(dayCost) < 0) {
                setErrors({ ...errors, dayCost: "Day Cost must be a positive Number" });
                return;
            }

        } else {
            if (!dayCost || dayCost == 0) {
                setErrors({ ...errors, dayCost: "Day Cost is Required" });
                return;
            }

            if(dayCost < 0) {
                setErrors({ ...errors, dayCost: "Day Cost must be a positive Number" });
                return;
            }
        }

        const bed = {
            roomNumber,
            dayCost,
            reserved,
            category
        }

        if (selectedTab === 'add_bed') {
            BedService.addBed(bed).then((response) => {
                setFormState({ roomNumber: '', dayCost: 0, reserved: false, category: "normal" });
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
                setFormState({ roomNumber: '', dayCost: 0, reserved: false, category: "normal" });
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
                    <input className="form-input" value={roomNumber} onChange={onChangeRoomNumber} type="number" placeholder="Room Number" />
                </div>
            </div>
            {errors.roomNumber && <ErrorMessage message={errors.roomNumber} />}

            <div>
                <p>Day Cost:</p>
                <div className="ml-5">
                    <input className="form-input" value={dayCost} onChange={onChangeDayCost} type="number" placeholder="Day Cost" />
                </div>
            </div>

            {errors.dayCost && <ErrorMessage message={errors.dayCost} />}

            <div style={{ marginTop: "1rem" }}>
                <p>Category: </p>
                <div style={{ marginLeft: "12rem" }}>
                    <FormControl>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={category}
                            onChange={onChangeCategory}
                            label="Category"
                            className={classes.select}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                }
                            }}
                            style={{ width: "33rem" }}
                        >
                            {categories.map((r) => {
                                return (
                                    <MenuItem key={r} value={r}>{r}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl><br />
                </div>
            </div>

            {!validCategory && <div style={{ width: "30rem" }}>{validCategoryMessage}</div>}
            <div style={{ marginTop: "1rem" }}>
                <p>Reserved? </p>
                <div>
                    <input style={{ marginLeft: "-27rem" }} className="form-input" checked={reserved} onChange={onChangeReserve} type="checkbox" />
                </div>
            </div>
            {errors.reserved && <ErrorMessage message={errors.reserved} />}

            <button onClick={onSubmit} className="submit">{btnText}</button>
        </div>
    )
}

export default BedForm
