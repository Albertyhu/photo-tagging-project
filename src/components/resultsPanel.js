import React, { useState, useEffect } from 'react'; 
import { updateTimer } from "./timeComponents.js"; 
import styled from 'styled-components'; 
import { ButtonCont, Button } from '../style/styledComponents.js'; 
import uuid from 'react-uuid'

const ResultsPanel = (props) => {
    const { resetGame, record, finalTime } = props; 
    return (<Container>
        <Title>Your Time of Completion</Title>
        <RenderPlayerTime time={finalTime} />
        <Subtitle>Fatest Times of Completion</Subtitle>
        <ScoreCont id= "scoreTitle">
            <h3>Rank</h3>
            <h3>Player</h3>
            <h3>Time Completed</h3>
        </ScoreCont>
        <InnerShell>
        {record.map((ele, ind) => <RenderEachUserScore
            {...ele}
            rank={ind + 1}
            key={uuid()}
        />)}
        </InnerShell>
        <ButtonCont>
            <Button onClick={resetGame}>Retry?</Button>
        </ButtonCont>
    </Container>)
}

export default ResultsPanel; 

const RenderEachUserScore = props => {
    const { rank, username, time, date } = props; 
    const [hour, setHour] = useState('00');
    const [min, setMinutes] = useState('00');
    const [secs, setSeconds] = useState('00'); 

    useEffect(() => {
        //The following code has be wrapped around with useEffect hook 
        //...because the app was throwing errors about too many rerenders. 
        updateTimer(setSeconds, setMinutes, setHour, time); 
    }, [])

    return (
        <ScoreCont>
            <div>{rank}.</div> 
            <Name>{username}</Name> 
            <Time>
                {hour !== '00' && <Unit>{hour} hour</Unit>}
                {min !== '00' && <Unit>{min} min.</Unit>}
                <Unit>{secs} sec.</Unit>
            </Time>
        </ScoreCont>)
}

const RenderPlayerTime = props => {
    const { time } = props; 
    const [hour, setHour] = useState('00');
    const [min, setMinutes] = useState('00');
    const [secs, setSeconds] = useState('00');

    useEffect(() => {
        //The following code has be wrapped around with useEffect hook 
        //...because the app was throwing errors about too many rerenders. 
        if(time !== 0)
            updateTimer(setSeconds, setMinutes, setHour, time);
    }, [time])
    return (
        <PlayerTime id = "PlayerTime">
            {hour !== '00' && <Unit>{hour} hour</Unit>}
            {min !== '00' && <Unit>{min} min.</Unit>}
            <Unit>{secs} sec.</Unit>
        </PlayerTime>)
}

const Container = styled.div`
    height: fit-content; 
    min-width: 400px;
    max-height: 600px;
    width: fit-content; 
    border-radius: 25px; 
    box-shadow: 0 0 15px 25px rgba(0,0,0, 0.3); 
    margin: auto;
    position: fixed;
    background-color: #525252;
    z-index: 1;
    top: 10%; 
    left: 0;
    right: 0; 
    padding-bottom: 20px;
    
`

const Title = styled.div`
    font-size: 25px; 
    font-weight: bold; 
    color: #ffffff;
    margin-left:auto;
    margin-right: auto; 
    margin-top: 10px;
    margin-bottom: 10px; 
text-align: center; 
    width: fit-content;
`


const Subtitle = styled.div`
    font-size: 20px; 
    font-weight: bold; 
    color: #ffffff;
    margin-left:auto;
    margin-right: auto; 
    margin-top: 10px;
    margin-bottom: 10px; 
text-align: center; 
    width: fit-content;
`

const ScoreCont = styled.div`
    display: grid;
    grid-template-columns: 20% 30% 50%;
    width: 100%; 
    justify-content: space-around; 
    color: #fff;
    margin-bottom: 10px;
    &#scoreTitle{
        width: 90%; 
           margin-left:auto;
          margin-right: auto; 
}
`

const Unit = styled.div`
    color: #fff;
    display: inline-block;
    margin-left:10px;
    margin-right: 10px; 
`

const Name = styled.div`
color: #fff;
`
const Time = styled.div`
color: #fff;
`

const InnerShell = styled.div`
    overflow-y: scroll;
    width: 90%; 
    max-height: 200px;
    margin-left:auto;
    margin-right: auto; 
    margin-top: 20px;
    margin-bottom: 20px; 
    &::-webkit-scrollbar {
        width: 10px;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 5px;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: #fff;
      border-radius: 10px;
      height: 10px;
    }

`

const PlayerTime = styled.div`
     margin-left:auto;
        margin-right: auto; 
        margin-top: 20px;
        margin-bottom: 20px; 
        text-align: center;
`