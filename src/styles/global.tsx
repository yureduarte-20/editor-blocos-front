import styled, { createGlobalStyle } from "styled-components";
import colors, { Cores } from "./colors";
import { Typograph } from "./Typographic.";
export interface IThProps {
    width?: string;
    textAlign: string;
}
export interface ITable {
    width?: string;
}
export interface ICardStyleProps {
    padding?: string;
}
export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        //font-family: 'Roboto', sans-serif;
    }
    body {
        background-color: ${ colors.primary_background };
    }
    
`
export default () =>{
    return(
        <>
            <GlobalStyle />
            <Typograph />
            <Cores />
        </>
    )
}

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;


    .d-flex {
        display: flex;
    }
    .j-center {
        justify-content: center;
    }
    .a-center{
        align-items: center;
    }
`
export const Card = styled.div<ICardStyleProps>`
    background-color: ${colors.primary};
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    width: 100%;
    padding: ${ props => props.padding ? props.padding : '10px 20px'} ;
`

export const Table = styled.table<ITable>`
    width:100%;
    padding: 10px;
    border-collapse: collapse;
`
export const Thead = styled.thead `
    background-color: ${colors.secundary};
    padding: 10px 20px;
    `
export const Tr = styled.tr `
    border-bottom: 1px solid  ${colors.primary_input_background};
    &:nth-child(even){
        background-color: ${colors.primary_input_background};
    }
`
export const Th = styled.th<IThProps>`
    width: ${props => props.width };
    margin-left: 0;
    margin-right: 0;
    text-align: ${props => props.textAlign};
    padding: 10px 20px;
`

export const TBody = styled.tbody`
    
`
export const Td = styled.td`
    padding:10px 20px;
`