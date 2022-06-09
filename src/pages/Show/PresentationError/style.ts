import styled from "styled-components";
import icon from '../../../assets/ErrorX.svg' 
export const StatusSVG = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    &::before {
        content: '';
        width: 44px;
        height: 44px;
        background: url(${icon}) no-repeat;
    }
`