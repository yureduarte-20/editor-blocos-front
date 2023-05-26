import styled from "styled-components";

export const Form = styled.form`
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr;
    gap:20px;
    padding-bottom:20px;
`
export const InputGroup = styled.div<{ gridColumn?:string }>`
    display:flex;
    flex-direction:column;
    gap: 10px;
    grid-column: ${props => props.gridColumn ? props.gridColumn : 'initial'} ;
    
`
export const Select = styled.select`
border: 1px solid #c4c4c4;
padding: 10px 20px;
border-radius: 4px;
background-color: #ffff;
`