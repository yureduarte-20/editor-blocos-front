import styled from "styled-components";

export const Header = styled.header`
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #C4C4C4;
`;


export const Brand = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    & > span {
        padding-left: 10px;
    }
`