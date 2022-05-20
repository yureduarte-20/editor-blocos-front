import styled from "styled-components";
import arrowDown from '../../../assets/arrowDown.svg'
export interface IAccordionItemContainerStyleProps {
    active: boolean;
}
export const AccordionItemContainer = styled.li<IAccordionItemContainerStyleProps>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    transition: all 0.3s;
    transition: height ease 0.2s;
    background-color: #c4c4c4;
    padding: 10px 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    
    & > div.body {
       height: ${props => props.active ? '300px' : '0px'};
       overflow: ${props => props.active ? 'auto' : 'hidden'};
       transition: height ease 0.2s;
       ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-track {
        background: #e7e7e7;
    }
    ::-webkit-scrollbar-thumb {
        background: #c5c5c5;
        border-radius: 4px;
    }
    }
    & > h2 {
        display: flex;
        justify-content: space-between;
        align-content:center ;
        cursor: pointer;
    }
    & > h2::after {
        content: '';
        display: inline-block;
        background-repeat: no-repeat;
        background-image: url(${arrowDown});
        background-size: 20px;
        width: 20px;
        transform: ${props => !props.active ? 'none' : 'rotate(180deg)'};
        height: 20px;
        transition: transform 0.2s;
    }
`