import { useState } from "react"
import { ChangeEvent } from 'react'
import { CustomBlocklyWorkpace } from "../../components/CustomBlocklyWorpace"
import { GeneratedCodeArea } from "../../components/GeneratedCode"
import { BoxQuestion } from "../../components/BoxQuestion"
const Editor = () => {
    const [code, setCode] = useState('');
    const [language,setLanguage] = useState('javascript');
    const handleLanguageChange = (e : ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setLanguage(e.target.value)
        console.log(e.target.value)
    }
    return (
        <>
            <BoxQuestion
                question={{ title: 'Aquii', description: 'Por favor funcione.' }}
                onButtonRunPressed={() => { }}
                onGoForward={() => { }} />
            <CustomBlocklyWorkpace code={code} language={language} onCodeChange={setCode}>
                <GeneratedCodeArea 
                    code={code} 
                    style={{ background:'transparent' }}
                    onLanguageChange={handleLanguageChange}/>
            </CustomBlocklyWorkpace>
        </>
    )
}

export default Editor;