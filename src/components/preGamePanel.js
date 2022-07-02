
import { imgObj } from '../asset/character_image/charObject.js'; 
import { Title, Subtitle, Button } from '../style/styledComponents.js'; 
import styled from 'styled-components'; 

const PreGamePanel = props => {
    const { startGame } = props; 
    return (<Container>
        <Title id="preGameTitle">Find the following characters</Title> 
        <Button onClick={startGame}>Start the Timer</Button>
        <CharCont>
            <Image src={imgObj["Catwoman"]} alt = "Catwoman" /> 
            <Subtitle>Catwoman</Subtitle> 
        </CharCont>
        <CharCont>
            <Image src={imgObj["VaultBoy"]} alt = "Vault Boy"/>
            <Subtitle>Vault Boy</Subtitle>
        </CharCont>
        <CharCont>
            <Image src={imgObj["Faith"]} alt="Faith" />
            <Subtitle>Faith</Subtitle>
        </CharCont>
        <CharCont>
            <Image src={imgObj["Waldo"]} alt="Waldo" />
            <Subtitle>Waldo</Subtitle>
        </CharCont>
    </Container>)
}

export default PreGamePanel; 


const Container = styled.div`
height: fit-content; 
width: fit-content; 
border-radius: 25px; 
box-shadow: 0 0 15px 25px rgba(0,0,0, 0.3); 
margin: auto;
position: absolute;
background-color: #525252;
z-index: 1;
top: 10%; 
left: 0;
right: 0; 
`


const Image = styled.img`
width: 130px;
height: 100px; 
background-color: rgba(0,0,0,0);
filter: drop-shadow(5px 5px 5px #ffffff);
user-select: none; 
`

const CharCont = styled.div`
display: block; 
margin-top: 20px;
margin-bottom: 20px; 
margin-left: auto;
margin-right: auto; 
text-align: center; 
`