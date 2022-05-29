import styled, { createGlobalStyle } from "styled-components";
import colors, { Cores } from "./colors";
import { Typograph } from "./Typographic.";

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