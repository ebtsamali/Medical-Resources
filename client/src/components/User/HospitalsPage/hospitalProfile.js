import React, {useState, useEffect} from 'react';
import ReservationModal from './bedReservationModal';
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import '../../../styles/hospitalProfile.scss';
import '../../../styles/pharmacyProfile.scss';
import { Card, ListGroup } from 'react-bootstrap';
import { FaPhone, FaPoundSign } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
import {GiBed} from 'react-icons/gi';
import { FcOvertime } from 'react-icons/fc';
import BedServices from '../../../services/bedService';
import { getHospitalInfo } from '../../../services/hospitalService'
import Pagination from './Pagination';
import Header from "../../Header";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PublicHeader from "../../PublicHeader";

export default () => {
    const history = useHistory();
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
    const [bedsPerPage] = useState(3);
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
            {localStorage.getItem("user")? <Header/> : <PublicHeader/> }
            <div id="hospitalProfile">
                <div className="leftContent">
                    <div className="leftLocationCard">
                        <img src="../../../../img/hospital.png" className="hospitalImg" />  
                        <Card.Title className="pharmacyName">{hospitalName}</Card.Title>
                        <div className="leftLocationCardBody">     
                            <div className="leftContentCardsBody">
                                <h6 className="leftContentCardsBodyItem">{hospitalGovernorate}</h6>
                                <h6 className="leftContentCardsBodyItem">{hospitalDistrict}</h6>
                                <h6 className="leftContentCardsBodyItem">{hospitalStreet}</h6>
                            </div>
                        </div>      
                    </div>

                    <div className="leftContactCard">
                        <Card.Header className="leftContactCardHeader">
                            <FaPhone className="leftContentCardsIcon" />
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
                
                <div className="body">
                    <div className="headerDiv">
                        <div className="headerChild headerBiggerChild">
                            <div className="bedDiv">
                                <Card.Header>
                                    <GiBed className="timeIcon" />
                                    AVAILABLE ROOMS
                                </Card.Header>
                                <h5 style={{marginBottom: "10%"}}> {bedsNumber} ROOMS</h5>
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
                        <div className="roomsDiv">
                            <div className="roomsRow">
                               { currentBeds.map(bed => {
                                   return (
                                    <Card className="roomCard" key={bed._id}>
                                        <GiBed style={{fontSize: "100px", marginLeft: "25%"}} />
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="cardRoomItem">ROOM NO: 
                                                <h5 style={{marginLeft: "5%"}}> { bed.roomNumber } </h5> 
                                            </ListGroup.Item>
                                            <ListGroup.Item className="cardRoomItem">TYPE:  
                                                <h5 style={{marginLeft: "5%"}}> { bed.category } </h5>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="cardRoomItem"> COST: 
                                                <h5 style={{marginLeft: "5%", paddingRight: "3px"}}> { bed.dayCost } </h5>
                                                Pounds/DAY
                                            </ListGroup.Item>
                                        </ListGroup>
                                        <button className="reservBtn" onClick={()=>{
                                            if(localStorage.getItem("user")){
                                                setModalShow(true); 
                                                setClickedBed(bed);
                                            } else {
                                                history.push('/');
                                            }
                                        }} >
                                            Reserve
                                        </button>
                                    </Card>
                                    )
                                })} 
                            </div>
                            <ReservationModal show={modalShow} onHide={() => { setModalShow(false); setClickedBed({}); }} hospital={hospital} clickedBed={clickedBed}/>
                            <div className="paginationDiv bedPagination">
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
