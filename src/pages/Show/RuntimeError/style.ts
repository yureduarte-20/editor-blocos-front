import styled from "styled-components";
import icon from '../../../assets/deadEmoticon.svg' 
export const StatusSVG = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    &::before {
        content: '';
        width: 50px;
        background-repeat: no-repeat ;
        background-size: contain;
        height: 50px;
        background: url(${icon}) no-repeat;
    }
`