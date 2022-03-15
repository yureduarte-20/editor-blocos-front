import { useState } from 'react'
import { Col2, Container, LogWrap } from './style'
import { GeneratedCodeArea } from '../../components/GeneratedCode';
import { CustomBlocklyWorkpace } from '../../components/CustomBlocklyWorpace';
import { Log } from '../../components/Log';


export function Home() {
    const [xml, setXml] = useState("");
    const [javascriptCode, setJavascriptCode] = useState("");
    const [consoleLog, setConsoleLog] = useState<string>("");
    const handleExec = () => {
        try{
            eval(javascriptCode);
            setConsoleLog( consoleLog + '\nTeste Concluído');
        } catch(e){
            setConsoleLog(e.message + '\n' + e.stack);
        }
    }
    return (
        <Container>
            <CustomBlocklyWorkpace 
                javascriptCode={javascriptCode}
                onCodeChange={setJavascriptCode}
            />  
            <GeneratedCodeArea
                code={javascriptCode}
            />
            <LogWrap>
                <button onClick={handleExec}>Testar</button>
                <Log text={consoleLog} />
            </LogWrap>
        </Container>
    )

}