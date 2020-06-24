import React, {useState} from "react";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import TimePicker from 'react-bootstrap-time-picker';
import '../../styles/working_hours.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

const WorkingHours = ({weekDetails, setWeekDetails}) => {
    const userRole = JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).role;
    const renderDays = (startIndex, endIndex) => {
        return weekDetails.map((day, index) => {
            if (index >= startIndex && index <= endIndex) {
                return (<div key={index} className="day-container">
                    <BootstrapSwitchButton
                        checked={day.isOpened}
                        onlabel={day.day}
                        offlabel={day.day}
                        onstyle="success"
                        offstyle="dark"
                        style="border"
                        size="sm"
                        disabled={userRole === "user" ? true : false}
                        onChange={handleDayStatusChange(index)}
                        width={65}/>
                    <TimePicker disabled={!day.isOpened || userRole === "user" ? true : false} className="time-picker" start="00:00" end="24:00" step={60}
                                onChange={handleStartTimeChange(index)} value={day.startTime}/>
                    <FontAwesomeIcon icon={faArrowRight}/>
                    <TimePicker disabled={!day.isOpened || userRole === "user" ? true : false} className="time-picker" start="00:00" end="24:00" step={60}
                                onChange={handleEndTimeChange(index)} value={day.endTime}/>
                </div>)
            }
        })
    }

    const handleStartTimeChange = (i) => {
        return (time) => {
            setWeekDetails(weekDetails.map((day, index) => {
                if (index === i) {
                    day.startTime = time
                }
                return day
            }))
        }
    }

    const handleEndTimeChange = (i) => {
        return (time) => {
            setWeekDetails(weekDetails.map((day, index) => {
                if (index === i) {
                    day.endTime = time
                }
                return day
            }))
        }
    }

    const handleDayStatusChange = (i) => {
        return (checked) => {
            setWeekDetails(weekDetails.map((day, index) => {
                if (index === i) {
                    day.isOpened = checked
                }
                return day
            }))
        }
    }


    return (<div className="working-hours-container">
            {renderDays(0, 6)}
    </div>)
}

export default WorkingHours
