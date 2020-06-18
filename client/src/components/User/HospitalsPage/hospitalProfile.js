import React, {useState, useEffect} from 'react';
import ReservationModal from './bedReservationModal';
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import '../../../styles/hospitalProfile.scss';
import { Card, ListGroup } from 'react-bootstrap';
import { FaPhone, FaPoundSign } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { IoIosPaper } from 'react-icons/io';
import {GiBed} from 'react-icons/gi';
import { FcOvertime } from 'react-icons/fc';
import BedServices from '../../../services/bedService';
import { getHospitalInfo } from '../../../services/hospitalService'
import Pagination from './Pagination';
import Header from "../../Header";

export default () => {
    const hospitalId = useLocation().state.hospitalId;
    const [hospital, setHospital] = useState({});
    const [hospitalName, setHospitalName] = useState("");
    const [hospitalGovernorate, setHospitalGovernorate] = useState("Governorate");
    const [hospitalDistrict, setHospitalDistrict] = useState("District");
    const [hospitalStreet, setHospitalStreet] = useState("");
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [regulations, setRegulations] = useState([]);
    const [maxTimeLimit, setMaxTimeLimit] = useState('');

    const [modalShow, setModalShow] = useState(false);
    const [beds, setBeds] = useState([]);
    const [bedsNumber, setBedsNumber] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [bedsPerPage] = useState(4);
    const [clickedBed, setClickedBed] = useState({});

    const indexOfLastBed = currentPage * bedsPerPage;
    const indexOfFirstBed = indexOfLastBed - bedsPerPage;
    const currentBeds = beds.slice(indexOfFirstBed, indexOfLastBed);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const setHospitalData = (data) => {
        setHospitalName(data.name);
        setHospitalGovernorate(data.location[0].governorate);
        setHospitalDistrict(data.location[0].district);
        setHospitalStreet(data.location[0].street);
        setPhoneNumbers(data.phoneNumbers);
        setRegulations(data.regulations);
        setMaxTimeLimit(data.maxTimeLimit);
    }

    useEffect(()=>{
        getHospitalInfo(hospitalId).then(response => {
            setHospital(response.data);
            setHospitalData(response.data)
        }).catch(error => {
            console.log(error.response);   
        })

        BedServices.getAllHospitalBeds(hospitalId).then((response)=>{
            if(response.data.length === 0){
                setBedsNumber(0);
                setBeds([]);
            }else {
                setBeds(response.data);
                setBedsNumber(response.data.length);
            }
        }).catch(error => {
            console.log(error.response);   
        })
    }, [modalShow])


    return(
        <>
            <Header/>
            <div className="containerDiv">
                <div className="sidebarDiv">
                    <div className="sidebarChild sidebarBiggerChild">
                        <img src="../../../../img/hospital.png" className="hospitalImg" />
                        
                        <Card.Title className="hospitalName">{hospitalName}</Card.Title>
                        <div className="locationDiv">
                            <div>
                                <MdLocationOn style={{ color:"#4ABBA9", fontSize: "30px"}} />
                            </div>
                            <div className="locationInfo">
                                <p>{hospitalGovernorate}</p>
                                <p>{hospitalDistrict}</p>
                                <p>{hospitalStreet}</p>
                            </div>
                        </div>
                        
                    </div>

                    <div className="sidebarChild sidebarSmallerChild">
                        <Card.Header className="cardHeader">
                            <FaPhone className="phoneIcon" />
                            CONTACT INFO
                        </Card.Header>
                       {phoneNumbers.map((phone, index) => {
                           return (<p key={index}> {phone} </p>)
                       })} 
                    
                    </div>
                </div>
                
                <div className="body">
                    <div className="headerDiv">
                        <div className="headerChild headerBiggerChild">
                            <div className="bedDiv">
                                <Card.Header>
                                    <GiBed className="timeIcon" />
                                    AVAILABLE BEDS
                                </Card.Header>
                                <h5 style={{marginBottom: "10%"}}> {bedsNumber} BEDS</h5>
                            </div>
                            <div className="bedDiv">
                                <Card.Header>
                                    <FcOvertime className="timeIcon" />
                                    MAX RESERVATION TIME
                                </Card.Header>
                                <h5 style={{marginBottom: "10%"}}> {maxTimeLimit} HOURS</h5>
                            </div>
                        </div>

                        <div className="headerChild headerSmallerChild">
                            <Card.Header style={{textAlign: "center", width: "70%"}}>
                                <IoIosPaper className="timeIcon" />
                                Regulations
                            </Card.Header>
                            <ul className="regulationUl">
                                {regulations.length !== 0 ?
                                    hospital.regulations.map((regulation, index) => {
                                        return(
                                            <li key={index} style={{marginTop: "5px", padding: "7px"}}> - {regulation} </li>
                                        )
                                    }): 
                                    <h5 style={{marginTop: "15%"}}> No Regulations required </h5>
                                }
                            </ul> 
                        </div>
                    </div>
                    
                    <div className="content">
                        <div className="bedsDiv">
                            <div className="bedCard">
                               { currentBeds.map(bed => {
                                   return (
                                    <Card style={{ width: '12rem', height: "68%", marginTop: "3%" }} key={bed._id}>
                                        <GiBed style={{fontSize: "100px", marginLeft: "20%"}} />
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>Room Number: {bed.roomNumber} </ListGroup.Item>
                                            <ListGroup.Item> cost: 
                                                <FaPoundSign style={{color: "gray"}} /> {bed.dayCost}
                                                <small style={{color: "gray"}}>/DAY</small> 
                                            </ListGroup.Item>
                                        </ListGroup>
                                        <button className="reservBtn" onClick={()=>{setModalShow(true); setClickedBed(bed)}} >
                                            Reserve
                                        </button>
                                    </Card>
                                    )
                                })} 
                            </div>
                                <ReservationModal show={modalShow} onHide={() => { setModalShow(false); setClickedBed({}); }} hospital={hospital} clickedBed={clickedBed}/>
                            <div className="paginationDiv">
                                <Pagination
                                    booksPerPage={bedsPerPage}
                                    totalBooks={beds.length}
                                    currentPage={currentPage}
                                    paginate={paginate}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
       </>
    )
}
