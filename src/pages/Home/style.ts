import styled from 'styled-components';

export const Container = styled.main`
    max-width: 1400px;
    margin: 0 auto;
    justify-content: center;
    height: 80vh;
    display: flex;
    padding-top: 20px;
`;

export const IDEContainer = styled.article`
    padding: 20px;
    display: flex;
    background-color: #c4c4c4;
    max-width: max-content;
    align-self: flex-start;
    border-radius: 8px;
    & > a {
        text-decoration: none;
        color: white;
        display: inline-block;
        padding: 10px 20px;
        cursor: pointer;
        background-color: #383838;
        align-items: end;
        max-width: max-content;
        border-radius: 8px;
    }
`
export const AccordionWrap = styled.section`
    grid-column: 2;
    align-self: center;
`

export const HomeContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    justify-content: center;
    width: 100%;
    height: 100%;
`