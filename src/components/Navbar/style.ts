import styled from "styled-components";
import colors from "../../styles/colors";

export const Header = styled.header`
    padding: 10px 20px;
    box-sizing: border-box;
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