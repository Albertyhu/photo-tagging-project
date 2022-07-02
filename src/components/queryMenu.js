import styled from 'styled-components';
import React, { useEffect } from 'react'; 

const RenderQueryMenu = props => {
    const { setSelected, closeQueryDisplay, xCoor, yCoor, queryRef } = props;

    const handleClickEvent = (name) => {
        setSelected(name);
        closeQueryDisplay();
    }
    var imageWidth = document.getElementById('PhotoBody').offsetWidth;
    var imageHeight = document.getElementById('PhotoBody').offsetHeight; 



    return (
        <QueryContainer
            translateX={xCoor + 250 <= imageWidth ? `${((xCoor + 20) / imageWidth)*100}%` : `${((xCoor - 232) / imageWidth) * 100 }%`}
            translateY={parseInt(yCoor) + 150 <= imageHeight ? `${yCoor}px` : `${yCoor - 80}px`}
            ref={queryRef}
        >
            <Menu_UL>
                <Title>Which character did you find?</Title>
                <Item onMouseDown={() => {handleClickEvent("Catwoman")}}>Catwoman</Item>
                <Item onMouseDown={() => { handleClickEvent("Faith") }}>Faith</Item>
                <Item onMouseDown={() => { handleClickEvent("Waldo") }}>Waldo</Item>
                <Item onMouseDown={() => { handleClickEvent("Vault Boy") }}>Vault Boy</Item>
              </Menu_UL>
        </QueryContainer>
        )
}

export default RenderQueryMenu; 

const QueryContainer = styled.div`
position: absolute; 
border-radius: 15px;
border: 1px solid #000000; 
top: ${props => props.translateY}; 
left: ${props => props.translateX}; 
//top: 50%; 
//left: 50%;
display: block;
background-color: #000000; 

`

const Title = styled.div`
margin-top: 10px;
font-weight: bold;
margin-left: 10px;
margin-right: 10px; 
`

const Menu_UL = styled.ul`
list-style: none; 
color: #FFFFFF; 
margin: 0;
padding: 0;
text-align: center;
`

const Item = styled.li`
cursor: pointer;
margin-top: 5px;
margin-bottom: 5px;
&:hover{
    background-color: #BDBDBD; 
    color: #333333;
}
`