import CSS from 'csstype';
import { useState } from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Content, WrapCode } from './styles';
export interface IGeneratedCodeArea {
    code: string;
    style?: CSS.Properties;
}
export const GeneratedCodeArea = ({ code, style }: IGeneratedCodeArea) => {
    const [open, setOpen] = useState(false)
    return (
        <WrapCode open={open}>
            <Content onClick={() => setOpen(!open)}>
                {open &&
                    <SyntaxHighlighter customStyle={style}
                        language='javascript'
                    >
                        {code}
                    </SyntaxHighlighter>
                }
            </Content>
        </WrapCode>
    )
}