import styled from 'styled-components';

export const Container =  styled.main`
    display: grid;
    grid-template-columns: 2fr 1fr;
    margin: 0;
    padding: 0;
`;

export const WorkspaceWrap = styled.div`
    min-height: 80vh;
`
export const LogWrap = styled.div`
    grid-column: span 2;
    display: flex;
    background-color: #000000;
    min-height: 15vh;
    max-height: 20vh;
    overflow: auto;
`;

