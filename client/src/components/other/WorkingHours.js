import React, {useState} from "react";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import TimePicker from 'react-bootstrap-time-picker';
import '../../styles/working_hours.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

const WorkingHours = ({weekDetails, setWeekDetails}) => {
    const renderDays = (startIndex, endIndex) => {
        return weekDetails.map((day, index) => {
            if (index>=startIndex && index<=endIndex) {
                return (<div key={index} className="day-container">
                    <BootstrapSwitchButton
                        checked={day.isOpened}
                        onlabel={day.day}
                        offlabel={day.day}
                        onstyle="success"
                        offstyle="dark"
                        style="border"
                        size="sm"
                        onChange={handleDayStatusChange(index)}
                        width={65}/>
                    <TimePicker disabled={!day.isOpened} className="time-picker" start="00:00" end="24:00" step={60}
                                onChange={handleStartTimeChange(index)} value={day.startTime}/>
                    <FontAwesomeIcon icon={faArrowRight}/>
                    <TimePicker disabled={!day.isOpened} className="time-picker" start="00:00" end="24:00" step={60}
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
                if (index === i ) {
                    day.isOpened = checked
                }
                return day
            }))
        }
    }



    return (<div className="working-hours-container">
        <div className="row-container mt-2">
            {renderDays(0,2)}
        </div>

        <div className="row-container">
            {renderDays(3,5)}
        </div>

        <div className="row-container">
            {renderDays(6,6)}
        </div>

    </div>)
}

export default WorkingHours
