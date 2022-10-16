import styled from "styled-components";
import leftArrow from '../../assets/sideArrow.svg';
import colors from "../../styles/colors";
export type StyleProps  = {
    open:boolean
}
export const Arrow = styled.span<{ open: boolean }>`
position: absolute;
        content: '';
        top: ${props => props.open ? '17vh' : '17vh'} ;
        width: 20px;
        background: url(${leftArrow}) no-repeat center, ${colors.primary};
        border: solid 1px ${colors.secundary};
        border-radius:4px;
        height: 80px;
        left: -10px;
        transform: ${props => props.open ? 'none' : 'rotate(180deg)'};
        cursor: pointer;

`
export const WrapCode = styled.div<StyleProps>`
    border-radius: 4px;
    padding: 0 20px;
    min-height: 45vh;
    max-height: 45vh;
    border: solid 1px ${colors.secundary};
    background-color: ${colors.primary};
    position: absolute;
    z-index: 9;
    right: 20px;
    min-width: ${props => props.open ? '400px' : '0px'};
    width: ${props => props.open ? 'initial' : '0px'};
    transition: min-width 0.3s, width 0.3s ;
    top: calc( 100vh / 4.5 );
    display: flex;
    flex-direction: column;
    @media (max-width: 1280px) {
        min-height: 35vh;
        top: calc( 100vh / 3 );
    }
`
export const Content = styled.div<StyleProps>`
    display: flex;
    position: relative;
    margin-top: 20px;
    max-height:35vh;
    width: ${ props => props.open ? 'initial' : '0px'  };
    opacity: ${ props => props.open ? '1' : '0'  };
`;

export const SelectLanguage = styled.select<{ open: boolean }>`
    padding: 10px 20px;
    background-color: ${colors.secundary};
    border-radius:4px;
    text-align: center;
    align-self: center;
    color: ${colors.primary};
    width: ${ props => props.open ? '60%' : '0px'  };
    opacity: ${ props => props.open ? '1' : '0'  };
`