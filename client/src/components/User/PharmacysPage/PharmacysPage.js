import React from "react";
import Header from "../../Header";
import '../../../styles/pharmacys.scss'

const PharmacysPage = () => {
    return(<div className="x-container-pharmacys">
        <Header/>
        <div className="pharmacys-content">
            <div className="search-card">
                <div className="search-input-container">
                    <input  placeholder="Search For Medicines"/>
                </div>
                <div className="filters-container">
                    <div>
                        <select name="governorate" id="governorate">
                            <option value="cairo">Cairo</option>
                            <option value="giza">Giza</option>
                            <option value="helwan">Helwan</option>
                        </select>
                    </div>

                    <div>
                        <select name="district" id="district">
                            <option value="shubra">Shubra</option>
                            <option value="10th_of_Ramadan_1">10th of Ramadan 1</option>
                            <option value="minya">Minya</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default PharmacysPage
