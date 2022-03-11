import { useState } from 'react'
import { Col2, Container } from './style'
import { GeneratedCodeArea } from '../../components/GeneratedCode';
import { CustomBlocklyWorkpace } from '../../components/CustomBlocklyWorpace';
import { Log } from '../../components/Log';


export function Home() {
    const [xml, setXml] = useState("");
    const [javascriptCode, setJavascriptCode] = useState("");
    const [consoleLog, setConsoleLog] = useState<string>("ERROR: asdsad");

    return (
        <Container>
            <CustomBlocklyWorkpace 
                javascriptCode={javascriptCode}
                onCodeChange={setJavascriptCode}
            />  

            <GeneratedCodeArea
                code={javascriptCode}
            />
            <Col2>
                <Log text={"Error type \n Nothing"} />
            </Col2>
        </Container>
    )

}