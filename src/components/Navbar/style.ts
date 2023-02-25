import styled from "styled-components";
import colors from "../../styles/colors";

export const Header = styled.header`
    box-sizing: border-box;
    background-color: ${colors.secundary};
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px ;
    padding-right: 20px;
    paddong-left: 20px;
`;


export const Brand = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    width: max-content;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
`

export const DropdownWrapper = styled.div`
    position: relative;
    display: inline-block;

    &:hover .dropdown-content {
        display: block;
    }
`
