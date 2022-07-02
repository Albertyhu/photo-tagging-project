import React, { useEffect, useState } from 'react'; 
import styled from 'styled-components'; 
import pin from '../asset/pin.png';
import pin2 from '../asset/pin2.png';
const RenderMarker = props => {
    const { markerX, markerY } = props; 
    const PhotoBody = document.getElementById('PhotoBody')
    const [xCoor, setXCoor] = useState(markerX * PhotoBody.offsetWidth);
    const [yCoor, setYCoor] = useState(markerY * PhotoBody.offsetHeight + 100)

    const resizeEvent = () => {
        setYCoor(markerY * PhotoBody.offsetHeight + 100)
        setXCoor(markerX * PhotoBody.offsetWidth)
    }
    /*
    PhotoBody.addEventListener("resize", resizeEvent); 

    useEffect(() => {
        return () => {
            PhotoBody.removeEventListener("resize", resizeEvent); 
        }
    }, [])*/

    window.onresize = () => resizeEvent();

    return (<Marker src={pin2}
        id = "Pin"
        topPos={yCoor}
        leftPos={xCoor} />)
}

export default RenderMarker; 
const Marker = styled.img`
width: 30px;
height: 40px;
position: absolute; 
top: ${props => props.topPos}px; 
left: ${props => props.leftPos}px;
z-index:1;

`

