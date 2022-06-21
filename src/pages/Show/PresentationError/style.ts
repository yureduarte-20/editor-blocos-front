import styled from "styled-components";
import icon from '../../../assets/ErrorX.svg' 
export const StatusSVG = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
    &::before {
        content: '';
        width: 51px;
        background-repeat: no-repeat ;
        background-size: contain;
        height: 51px;
        background: url(${icon}) no-repeat;
    }
`