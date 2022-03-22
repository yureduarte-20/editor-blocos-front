import styled from "styled-components";
import brand from '../../../assets/brand-opacity.svg';

export const Container = styled.main`
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    align-items: center;
    grid-template-columns: 2fr 1fr;
    min-height: 90vh;
    background-image: url(${brand});
    background-repeat: no-repeat;
    background-position-x: left;
    background-position-y: center;
    background-size: 400px;
`

export const Wrapper = styled.div`
    grid-column: -1;
    display: flex;
    width: 100%;
    flex-direction: column;
    & > form {
        display: flex;
        flex-direction: column;
        gap:20px;
    }
    & > form input {
        border: 1px solid #c4c4c4;
        padding: 10px 20px;
        border-radius: 20px;
        background-color: #ffff;
    }
`