import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,CardTitle } from 'reactstrap';
import Header from '../Header';
import '../../styles/userHome.scss';
import { Link } from 'react-router-dom';
import { FaArrowDown, FaSearch } from 'react-icons/fa';

export default () => {

    return (
        <div id="userHome">
            <Header />
            <div className="userHomeBody">
                <div className="col-12 col-md-4 m-1">
                    
                        <CardImg width="100%" src="../../../img/PinClipart-left.png"></CardImg>
                        <CardImgOverlay>
                            <CardTitle className="cardTitle">HOSPITALS</CardTitle>
                            <CardText className="cardText"> 
                                <span className="hiWord">HI</span>, You can search for hospital By name OR filter by location, Also you can see all
                                available rooms and reserve. <br /> Clike here <FaArrowDown className="arrowIcon" /> for search.
                            </CardText>
                            <Link to={{ pathname: `/hospitals`}} className="searchLink">
                                Hospitals 
                            </Link>
                        </CardImgOverlay>
                   
                    <CardImg src="../../../img/doctor.png" className="doctorImg"></CardImg>
                </div>

                <div className="col-12 col-md-4 m-1">
                        <CardImg width="100%" src="../../../img/PinClipart-right.png"></CardImg>
                        <CardImgOverlay>
                            <CardTitle className="cardTitle">PHARMACIES</CardTitle>
                                <CardText className="cardText"> 
                                    <span className="hiWord">HI</span>, You can search for Medicine By name OR filter Pharmacies by location, Also
                                    you can Order and Reserve Medicines. <br /> Clike here <FaArrowDown className="arrowIcon" /> for search.
                                </CardText>
                            <Link to={{ pathname: `/pharmacys`}} className="searchLink">
                                Pharmacies 
                            </Link>
                        </CardImgOverlay>
                    
                    <CardImg src="../../../img/pharmacist.png" className="pharmacistImg"></CardImg>
                </div>
            </div>
        </div>
    )
}