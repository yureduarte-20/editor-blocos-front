import { useState } from "react";
import { LogWrap, TextField } from "./styles";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
export interface ILogProps {
    text: string;
}
export const Log = ({ text }: ILogProps) => {

    return (
        <LogWrap>
            <SyntaxHighlighter language="javascript" style={dark}>
                {text}
            </SyntaxHighlighter>
        </LogWrap>
    )
}