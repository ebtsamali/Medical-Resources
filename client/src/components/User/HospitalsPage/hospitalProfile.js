import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom"; 
import Header from './header';
import '../../../styles/hospitalProfile.scss';
import { Card, Button } from 'react-bootstrap';
import { FaPhone, FaPoundSign } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import {GiBed} from 'react-icons/gi';
import { FcOvertime } from 'react-icons/fc';

export default (props) => {
    console.log(useLocation().state.hospital);
    const hospital = useLocation().state.hospital;
    return(
        <>
            <Header />
            <div className="containerDiv">
                <div className="sidebarDiv">
                    <div className="sidebarChild sidebarBiggerChild">
                        <img src="../../../../img/hospital.png" className="hospitalImg" />
                        
                            <Card.Title className="hospitalName">{hospital.name}</Card.Title>
                            <div className="locationDiv">
                                <div>
                                    <MdLocationOn style={{ color:"#4ABBA9", fontSize: "30px"}} />
                                </div>
                                <div className="locationInfo">
                                    <p>{hospital.location[0].governorate}</p>
                                    <p>{hospital.location[0].district}</p>
                                    <p>{hospital.location[0].street}</p>
                                </div>
                            </div>
                        
                    </div>

                    <div className="sidebarChild sidebarSmallerChild">
                        <Card.Header className="cardHeader">
                            <FaPhone className="phoneIcon" />
                            CONTACT INFO
                        </Card.Header>
                       { hospital.phoneNumbers.map((phone, index) => {
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
                                <h5 style={{marginBottom: "10%"}}> 4 BEDS</h5>
                            </div>
                            <div className="bedDiv">
                                <Card.Header>
                                    <FcOvertime className="timeIcon" />
                                    MAX RESERVATION TIME
                                </Card.Header>
                                <h5 style={{marginBottom: "10%"}}> {hospital.maxTimeLimit} HOURS</h5>
                            </div>
                        </div>

                        <div className="headerChild headerSmallerChild">
                                <h4> <FaPoundSign style={{color: "gray"}} /> 250<small style={{color: "gray"}}>/DAY</small> </h4>
                                <Button className="reservBtn">Reserve Bed</Button>
                            
                        </div>
                    </div>
                    
                    <div className="content">
                        <div className="regulationsDiv">
                        </div>
                    </div>
                </div>
            </div>
       </>
    )
}