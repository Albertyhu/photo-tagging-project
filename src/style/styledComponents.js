import styled from 'styled-components'; 


export const MainContainer = styled.div`
opacity: ${props => props.opacityLevel || 1.0} 
`
export const GameContainer = styled.div`

`

export const ButtonCont = styled.div`
    margin-top: auto;
    margin-bottom: auto;
    text-align: center; 
    width: 100%;
    height: fit-content;
    background-color: $white; 
`
export const GoogleButton = styled.div`
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
      width: 184px;
      padding-top: 5px;
    padding-bottom: 5px;
      background-color: #EDEDED;
  border-radius: 5px;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,.25);
  font-family: Roboto; 
  color: #333333;
    display: flex;
    cursor: pointer; 
    user-select: none; 
  &:hover {
    background-color: #dfdfdf;
  }
  &:active {
    transform: translate(4px, 4px);
    background-color: #EDEDED;

  }
`
export const InnerShell = styled.div`
width: inherit; 

`

export const LoadingContainer = styled.div`
width: fit-content; 
margin-left: auto;
margin-right: auto; 
margin-top: 100px;
display: flex;
justify-content: space-between;
color: #fff;
`


export const Button = styled.div`
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
      width: 184px;
      padding-top: 10px;
    padding-bottom: 10px;
      background-color: #EDEDED;
  border-radius: 5px;
  font-family: Roboto; 
  color: #333333;
    cursor: pointer; 
    text-align: center;
    user-select: none; 

  &:hover {
    background-color: #dfdfdf;
  }
  &:active {
    transform: translate(4px, 4px);
    background-color: #EDEDED;
  }
    &#NavResetButton{
        margin-left: 20px; 
        margin-right: 20px;
    }

@media screen and (max-width: 768px){
    &#NavResetButton{
        margin-left: auto; 
        margin-right: auto;
        margin-top: 10px;
        margin-bottom: 10px;
    }
}
`
export const Title = styled.div`
    font-weight: bold; 
    font-size: 30px; 
&#preGameTitle {
    padding-left: 10px; 
    padding-right: 10px;
color: #fff; 
    margin-top: 20px;
    margin-bottom: 20px;
}
`

export const Subtitle = styled.div`
    font-weight: bold; 
    font-size: 20px; 
color: #fff;
` 






