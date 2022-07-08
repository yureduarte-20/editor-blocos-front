import CSS from 'csstype';
import { useState } from 'react';
import { ChangeEvent } from 'react'
import SyntaxHighlighter from "react-syntax-highlighter";
import { Content, WrapCode, SelectLanguage } from './styles';
export interface IGeneratedCodeArea {
    code: string;
    style?: CSS.Properties;
    language: string;
    onLanguageChange(e: ChangeEvent<HTMLSelectElement>): void;
}
export const GeneratedCodeArea = ({ code, style, onLanguageChange, language }: IGeneratedCodeArea) => {
    const [open, setOpen] = useState(false);
    return (
        <WrapCode open={open} onClick={() => setOpen(!open)}>

            <SelectLanguage  open={open} value={language} onChange={onLanguageChange}>
                <option value="javascript">Javascript</option>
                <option value="python">Python</option>
                <option value="dart">Dart</option>
                <option value="php">PHP</option>
                <option value="lua">Lua</option>
            </SelectLanguage>

            <Content open={open} >

                <SyntaxHighlighter customStyle={style}
                    language='javascript'
                >
                    {code}
                </SyntaxHighlighter>

            </Content>
        </WrapCode>
    )
}