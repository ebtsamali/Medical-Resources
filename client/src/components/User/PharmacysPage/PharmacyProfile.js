import React, {useState, useEffect} from 'react';
import Header from "../../Header";
import { Card } from 'react-bootstrap';
import '../../../styles/pharmacyProfile.scss';
import { MdLocationOn } from 'react-icons/md';
import { FaPhone, FaCheck, FaTimes } from 'react-icons/fa';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { GrDeliver } from 'react-icons/gr';
import { FcOvertime } from 'react-icons/fc';
import WorkingHours from '../../other/WorkingHours';
import PharmacyService from '../../../services/pharmacy_service';

export default () => {
    const [pharmacyName, setPharmacyName] = useState("")
    const [pharmacyGovernorate, setPharmacyGovernorate] = useState("Governorate")
    const [pharmacyDistrict, setPharmacyDistrict] = useState("District")
    const [pharmacyStreet, setPharmacyStreet] = useState("")
    const [pharmacyHasDeliveryService, setPharmacyHasDeliveryService] = useState(false)
    const [phoneNumbers, setPhoneNumbers] = useState([])
    const [maxTimeLimit, setMaxTimeLimit] = useState('')
    const [weekDetails, setWeekDetails] = useState([{day: 'Mon', startTime: 0, endTime: 0, isOpened: false}, {
        day: 'Tue',
        startTime: 0,
        endTime: 0,
        isOpened: false
    }, {day: 'Wed', startTime: 0, endTime: 0, isOpened: false}, {day: 'Thu', startTime: 0, endTime: 0, isOpened: false}, {
        day: 'Fri',
        startTime: 0,
        endTime: 0,
        isOpened: false
    }, {day: 'Sat', startTime: 0, endTime: 0, isOpened: false}, {day: 'Sun', startTime: 0, endTime: 0, isOpened: false}])

    const id = "5ee5b4375007e210fbbf54a6";

    const setNewPharmacyState = (data) => {
        setPharmacyName(data.name);
        setPharmacyGovernorate(data.location[0].governorate);
        setPharmacyDistrict(data.location[0].district);
        setPharmacyStreet(data.location[0].street);
        setPhoneNumbers(data.phoneNumbers);
        setPharmacyHasDeliveryService(data.delivery);
        setMaxTimeLimit(data.maxTimeLimit);
        setWeekDetails(data.workingHours);
    }

    useEffect(() => {
        PharmacyService.getPharmacy(id).then((response) => {
            console.log(response.data);
            setNewPharmacyState(response.data);
        }).catch(error => {
            console.log(error.response);  
        })
    }, [])


    return (
        <div id="pharmacyProfile">
            <Header />
            <div className="profileContent">
                <div className="leftContent">
                    <div className="leftLocationCard">
                        <img src="../../../../img/pharmacy.png" className="pharmacyImg"/>
                        <Card.Title className="pharmacyName">{pharmacyName}</Card.Title>
                        <div className="leftLocationCardBody">
                            <div>
                                <MdLocationOn style={{ color:"#4ABBA9", fontSize: "30px"}} />
                            </div>
                            <div className="leftContentCardsBody">
                                <h6 className="leftContentCardsBodyItem">{pharmacyGovernorate}</h6>
                                <h6 className="leftContentCardsBodyItem">{pharmacyDistrict}</h6>
                                <h6 className="leftContentCardsBodyItem">{pharmacyStreet}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="leftContactCard">
                        <Card.Header className="leftContactCardHeader">
                            <FaPhone className="leftContentCardsIcon"/>
                            CONTACT INFO
                        </Card.Header>
                        <div className="leftContentCardsBody">
                            {
                                phoneNumbers.map((phone, index)=> {
                                    return(
                                        <h6 key={index} className="leftContentCardsBodyItem">{phone}</h6>
                                    )
                                })
                            }  
                        </div>
                    </div>
                </div>

                <div className="rightContent"> 
                    <div className="rightContentBody">
                        <div className="rightContentBodyTop">
                            <Card.Header className="rightContentBodyTopHeader">
                                <FcOvertime className="leftContentCardsIcon"/>
                                WORKING HOURS
                            </Card.Header>
                            <div className="rightContentBodyTopBody">       
                                <WorkingHours weekDetails={weekDetails}/>
                            </div>
                        </div>
                        
                        <div className="rightContentBodyBottom">      
                            <div className="rightContentBodyBottomCard">
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <GrDeliver className="leftContentCardsIcon"/>
                                    <h5 style={{textAlign: "center", marginLeft: "10px"}}>DELIVERY</h5>
                                </div>
                                { pharmacyHasDeliveryService ? 
                                    <FaCheck className="leftContentCardsIcon" style={{color: "green"}}/> :  
                                    <FaTimes className="leftContentCardsIcon" style={{color: "red"}}/>
                                }
                                
                            </div>
                            <div className="rightContentBodyBottomCard">
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <AiOutlineFieldTime className="leftContentCardsIcon"/>
                                    <h5 style={{textAlign: "center", marginLeft: "10px"}}>MAX TIME LIMIT: {maxTimeLimit} H</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}