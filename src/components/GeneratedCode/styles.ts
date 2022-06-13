import styled from "styled-components";
import leftArrow from '../../assets/sideArrow.svg';
export type StyleProps  = {
    open:boolean
}
export const WrapCode = styled.div<StyleProps>`
    border-radius: 8px;
    padding: 20px;
    min-height: 45vh;
    max-height: 45vh;
    background-color: #DFDFDF;
    position: absolute;
    z-index: 9;
    right: 20px;
    min-width: ${props => props.open ? '400px' : '0px'};
    width: ${props => props.open ? 'initial' : '0px'};
    transition: min-width 0.3s, width 0.3s ;
    top: calc( 100vh / 4.5 );
    display: flex;
    flex-direction: column;
    &::before{
        position: absolute;
        content: '';
        top: ${props => props.open ? '17vh' : '17vh'} ;
        width: 20px;
        background: url(${leftArrow}) no-repeat center, #c4c4c4;
        height: 80px;
        left: -10px;
        transform: ${props => props.open ? 'none' : 'rotate(180deg)'};
        cursor: pointer;
    }
    @media (max-width: 1280px) {
        min-height: 35vh;
        top: calc( 100vh / 3 );
    }
`
export const Content = styled.div<StyleProps>`
    display: flex;
    position: relative;
    width: ${ props => props.open ? 'initial' : '0px'  };
    opacity: ${ props => props.open ? '1' : '0'  };
`;

export const SelectLanguage = styled.select<{ open: boolean }>`
    padding: 10px 20px;
    background-color: #C4C4C4;
    border-radius:8px;
    width: ${ props => props.open ? 'initial' : '0px'  };
    opacity: ${ props => props.open ? '1' : '0'  };
`