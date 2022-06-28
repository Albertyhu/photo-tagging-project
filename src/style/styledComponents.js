import styled from 'styled-components'; 


export const ButtonCont = styled.div`

    margin-top: auto;
    margin-bottom: auto;
    text-align: center; 
    width: 100%;
    height: 40px;
    border-radius: 2px;
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
  &:hover {
    box-shadow: 0 0 6px $google-blue;
  }
  &:active {
    background: $button-active-blue;
    transform: translate(4px, 4px)
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
`
