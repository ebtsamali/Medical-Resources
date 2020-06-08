import React from 'react';
import '../../../styles/pharmacys.scss';


export default (props) => {
    const hospitals = props.hospitals
    
    return (
        <div className="pharmacys-container">
            <table id="medicines">
                <thead>
                    <tr id="hospitals">
                        <th>Hospital Name</th>
                        <th>Phone Numbers</th>
                        <th>Governorate</th>
                        <th>District</th>
                        <th>Street</th>
                    </tr>
                </thead>
                <tbody>
                {
                    hospitals.map(hospital => {
                        return(
                            <tr key={hospital._id}>
                                <td>{hospital.name}</td>
                                <td>{
                                    hospital.phoneNumbers.map( (phone, index) => {
                                        return(<p key={index}> {phone} </p>)
                                    }
                                )}
                                </td>
                                <td>{hospital.location? hospital.location[0].governorate : ""}</td>
                                <td>{hospital.location? hospital.location[0].district : ""}</td>
                                <td>{hospital.location? hospital.location[0].street : ""}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}