import React, {useEffect} from 'react'
import styled from 'styled-components'
import PixelCon from '../asset/Comic_Con.jpg'; 
const RenderMainPhoto = props => {

    const { func, photoRef } = props; 

    return (<PhotoBody id="PhotoBody" ref={photoRef}>
        <MainImage alt="Pixel Con" src={PixelCon} />
    </PhotoBody>)
}

export default RenderMainPhoto; 

const PhotoBody = styled.div`
width: 100%; 
height: inherit; 
`

const MainImage = styled.img`
width: inherit;
height: inherit; 
`