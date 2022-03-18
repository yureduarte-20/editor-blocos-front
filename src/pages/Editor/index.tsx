import { useState } from "react"

import { CustomBlocklyWorkpace } from "../../components/CustomBlocklyWorpace"
import { GeneratedCodeArea } from "../../components/GeneratedCode"
import { BoxQuestion } from "../../components/BoxQuestion"
const Editor = () => {
    const [code, setCode] = useState('');
    return (
        <>
            <BoxQuestion
                question={{ title: 'Aquii', description: 'Funciona Caralho' }}
                onButtonRunPressed={() => { }}
                onGoForward={() => { }} />
            <CustomBlocklyWorkpace code={code} onCodeChange={setCode}>
                <GeneratedCodeArea code={code} style={{ background:'transparent' }}/>
            </CustomBlocklyWorkpace>
        </>
    )
}

export default Editor;