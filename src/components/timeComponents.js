import styled from 'styled-components'
import React, { useState, useEffect } from 'react'; 

//renders a Stop Watch 
export const RenderStopWatch = props => {
    const [hour, setHour] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00')
    const { rawTime } = props; 

    useEffect(() => {
        updateTimer(setSeconds, setMinutes, setHour, rawTime);

    }, [rawTime])

    return (
        <TimerCont><Hour>{hour}</Hour>:<Minute>{minutes}</Minute>:<Seconds>{seconds}</Seconds></TimerCont>
    )
}

//There is still an issue with this function. The time doesn't reset after resetting the game
//Converts the number of seconds into hours and minutes, indicates the remainder of seconds 
export const updateTimer = ( setSeconds, setMinutes, setHour, rawTime )=> {
    var secs = `${(rawTime % 60).toString()}`
    if (rawTime % 60 <= 9 && rawTime % 60 >= 0) {
        secs = '0' + secs;
    }
    setSeconds(secs);
    if (rawTime >= 60 && rawTime < 360) {
        var mins = `${(parseInt(rawTime / 60)).toString()}`;
        if (rawTime / 60 <= 9 && rawTime / 60 >= 0) {
            mins = "0" + mins;
        }
        setMinutes(mins);
    }
    else if (rawTime >= 360) {
        var mins = `${(parseInt((rawTime / 60) % 60)).toString()}`;
        if ((rawTime / 60) % 60 <= 9 && (rawTime / 60) % 60 >= 0) {
            mins = "0" + mins;
        }
        setMinutes(mins);
        var hour = `${(parseInt(rawTime / 3600)).toString()}`;
        if (rawTime / 3600 <= 9 && rawTime / 3600 >= 0) {
            hour = "0" + hour;
        }
        setHour(hour)
    }
}

const TimerCont = styled.div`
    color: #ffffff
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    margin-top: auto;
    margin-bottom: auto;
`
const Hour = styled.div``
const Minute = styled.div``
const Seconds = styled.div``






