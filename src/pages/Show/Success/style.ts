import styled from "styled-components";
import success from '../../../assets/success.svg' 
export const StatusSVG = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    &::before {
        content: '';
        width: 44px;
        height: 44px;
        background: url(${success}) no-repeat;
    }
`