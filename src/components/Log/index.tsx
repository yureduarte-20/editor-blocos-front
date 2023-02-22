import { useState } from "react";
import { TextField } from "./styles";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
export interface ILogProps {
    text: string;
}
export const Log = ({ text }: ILogProps) => {

    return (
        <SyntaxHighlighter customStyle={{
            maxWidth:'50%'
        }} language="javascript"
          height="100%" 
          style={a11yDark}
          lineProps={{ onError: e => { console.log('error');  return `color:red;` } }}>
            {text}
        </SyntaxHighlighter>
    )
}