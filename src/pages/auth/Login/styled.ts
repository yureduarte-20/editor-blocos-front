import styled from "styled-components";
import brand from '../../../assets/brand-opacity.svg';
import colors from "../../../styles/colors";

export const Container = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    min-height: 90vh;
`

export const Wrapper = styled.div`
    display: flex;
    background-color: ${colors.primary};
    flex-direction: column;
    padding: 60px 40px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    & > h2 {
        margin-bottom: 30px;
        text-align: center;
    }
    & > p {
        text-align: center;
    }
`
export const Form = styled.form `
    display: flex;
    flex-direction: column;
    gap:20px;
    min-width: 600px;
    margin-bottom: 20px;
`

export const Input = styled.input`
    border: 1px solid #c4c4c4;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: #ffff;
`