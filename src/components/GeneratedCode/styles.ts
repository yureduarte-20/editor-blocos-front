import { initial } from "lodash";
import styled from "styled-components";
import leftArrow from '../../assets/sideArrow.svg';
export type StyleProps  = {
    open:boolean
}
export const WrapCode = styled.div<StyleProps>`
    border-radius: 8px;
    padding: 20px;
    min-height: 50vh;
    background-color: #DFDFDF;
    position: absolute;
    z-index: 999999;
    right: 10px;
    /* transform: ${props => props.open ? 'translateX(0)' : 'translateX(400px)'} ; */
    min-width: ${props => props.open ? '400px' : '0px'};
    transition: min-width 0.3s, width 0.3s ;
    top: 40px;
`
export const Content = styled.div`
    display: flex;
    position: relative;
    &::before{
        position: absolute;
        content: '';
        top: 150px;
        width: 20px;
        background: url(${leftArrow}) no-repeat center, #c4c4c4;
        height: 80px;
        left: -30px;
        cursor: pointer;
    }
`;