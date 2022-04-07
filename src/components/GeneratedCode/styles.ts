import styled from "styled-components";
import leftArrow from '../../assets/sideArrow.svg';
export type StyleProps  = {
    open:boolean
}
export const WrapCode = styled.div<StyleProps>`
    border-radius: 8px;
    padding: 20px;
    min-height: 45vh;
    background-color: #DFDFDF;
    position: absolute;
    z-index: 999999;
    right: 20px;
    /* transform: ${props => props.open ? 'translateX(0)' : 'translateX(400px)'} ; */
    min-width: ${props => props.open ? '400px' : '0.1px'};
    transition: min-width 0.3s, width 0.3s ;
    top: 30px;
    
    display: flex;
    flex-direction: column;
`
export const Content = styled.div<StyleProps>`
    display: flex;
    position: relative;
    &::before{
        position: absolute;
        content: '';
        top: ${props => props.open ? '10vh' : '17vh'} ;
        width: 20px;
        background: url(${leftArrow}) no-repeat center, #c4c4c4;
        height: 80px;
        left: -30px;
        transform: ${props => props.open ? 'none' : 'rotate(180deg)'};
        cursor: pointer;
    }
    
`;

export const SelectLanguage = styled.select`
    padding: 10px 20px;
    background-color: #C4C4C4;
    border-radius:8px;
`