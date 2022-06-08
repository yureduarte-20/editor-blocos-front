import styled from "styled-components";
import colors from "../../styles/colors";

export const Header = styled.header`
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${colors.secundary};
`;


export const Brand = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    & > span {
        padding-left: 10px;
    }
`