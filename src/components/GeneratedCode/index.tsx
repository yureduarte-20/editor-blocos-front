import CSS from 'csstype';
import { useState } from 'react';
import { ChangeEvent } from 'react'
import SyntaxHighlighter from "react-syntax-highlighter";
import { Content, WrapCode, SelectLanguage } from './styles';
export interface IGeneratedCodeArea {
    code: string;
    style?: CSS.Properties;
    onLanguageChange(e: ChangeEvent<HTMLSelectElement>): void;
}
export const GeneratedCodeArea = ({ code, style, onLanguageChange }: IGeneratedCodeArea) => {
    const [open, setOpen] = useState(false)
    return (
        <WrapCode open={open}>
            { open &&
                <SelectLanguage onChange={onLanguageChange}>
                    <option value="javascript">Javascript</option>
                    <option value="python">Python</option>
                    <option value="dart">Dart</option>
                    <option value="php">PHP</option>
                    <option value="lua">Lua</option>
                </SelectLanguage>
            }
            <Content onClick={() => setOpen(!open)} open={open}>
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