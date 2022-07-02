import React, { useState, useEffect } from 'react'; 
import styled from 'styled-components'

const RenderMessagePanel = props => {
    const { message, messageRef, messagePanel, setMessagePanel } = props; 
    const [ velocity, setVelocity] = useState(0)

    const [position, setPosition] = useState(-100); 
    var timeObj = null; 
    useEffect(() => {
        if (messagePanel) {
            setPosition("30")
            timeObj = setTimeout(() => {
                setPosition(-100)
                setMessagePanel(false)
            }, 3000)

 


        }
    }, [messagePanel])

    const hideMessagePanel = e => {
        if (messagePanel && messageRef.current && !messageRef.current.contains(e.target)) {
            clearTimeout(timeObj);
            setPosition(-100);
            setTimeout(() => setMessagePanel(false), 1000); 
        }
    }
    document.addEventListener("mousedown", hideMessagePanel); 

    useEffect(() => {
        return () => { document.removeEventListener("mousedown", hideMessagePanel);  }
    }, [])

    return (<Container id = "MessageContainer" topPosition={position} ref={messageRef}>
        <Text>{message}</Text>
    </Container>)

}

export default RenderMessagePanel; 

const  Container = styled.div`
min-height: 30px; 
min-width: 500px;
width: fit-content; 
border-radius: 25px; 
box-shadow: 0 0 15px 25px rgba(0,0,0, 0.3); 
margin-left: auto;
margin-right: auto;
position: fixed;
background-color: #525252;
z-index: 1;
top: ${props => props.topPosition || "0"}%; 
left: 0;
right: 0; 
padding: 20px;
transition: top 1s; 

`

const Text = styled.div`
color: #fff; 
margin-left: auto;
margin-right: auto; 
text-align: center;
`