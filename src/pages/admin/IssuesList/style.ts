import styled from "styled-components";
import AddIcon from '../../../assets/add_circle.svg'
import colors from "../../../styles/colors";
export const AddButton = styled.a`
display: flex; 
align-items: center; 
flex-direction:row;
padding:10px;
gap:5px;
color:white;
border-radius:4px;
cursor: pointer;
background-color:${colors.secundary};
&::before {
    content: '';
    width: 20px;
    height: 20px;
    background-image: url(${AddIcon});
    background-repeat: no-repeat;
    background-size: contain;
}
`