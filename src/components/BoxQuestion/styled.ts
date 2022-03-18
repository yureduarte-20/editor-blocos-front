import styled from "styled-components";

export const QuestionWraper = styled.section`
    display: grid;
    gap: 10px;
    grid-template-columns: auto 1fr auto;
    min-height: 80px;
    align-content:center;
    justify-content: center;
    background: #dfdfdf;
    margin:10px 20px;
    padding: 20px;
    border-radius: 8px;
`
export const Question = styled.div`
    padding-left: 20px;
    padding-right: 20px;
`
export const ImgWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &  > button + button {
        margin-top: 10px;
    }
`
export const ButtonPrimary = styled.button`
    background-color: #555353;
    color: white;
    padding: 10px 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #4A4949;
    }
`

export const ButtonSecondary = styled.button`
    background-color: #1E1B1B;
    padding: 10px 14px;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    &:hover{
        background-color: #353030;
    }
`
