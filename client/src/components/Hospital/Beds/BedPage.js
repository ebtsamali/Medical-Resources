import React, {useState} from "react";
import Header from "../../Header";
import '../../../styles/medicines.scss'
import Sidebar from "./Sidebar";
import BedForm from "./BedForm";
import AllBeds from "./AllBeds";

const BedPage = () => {

    const [selectedTab, setSelectedTab] = useState('all_beds');
    const [selectedBed, setSelectedBed] = useState({});

    return (
    <div className="x-container-medicines">
        <Header/>
        <div className="body-medicines-container ">
            <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
            <div
                className={selectedTab === "all_beds" ? "medicines-content  align-items-start" : "medicines-content"}>
                {selectedTab === "all_beds" ?
                    <AllBeds setSelectedBed={setSelectedBed} setSelectedTab={setSelectedTab}/> :
                    (selectedTab === "add_bed") ? <BedForm selectedTab={selectedTab} setSelectedTab={setSelectedTab}/> :
                        <BedForm selectedTab={selectedTab} setSelectedTab={setSelectedTab}
                                      selectedBed={selectedBed}/>}
            </div>
        </div>
    </div>
    )
}

export default BedPage
