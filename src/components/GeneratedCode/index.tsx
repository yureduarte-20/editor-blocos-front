import CSS from 'csstype';
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Code } from './styles';
export interface IGeneratedCodeArea {
    code: string;
    style?: CSS.Properties;
}
export const GeneratedCodeArea = ({ code: javascriptCode, style }: IGeneratedCodeArea) => {
    return (
        <SyntaxHighlighter language='javascript' style={docco}>
            {javascriptCode}
        </SyntaxHighlighter>
    )
}