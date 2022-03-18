import { CustomBlocklyWorkpace } from "../../components/CustomBlocklyWorpace"
import { GeneratedCodeArea } from "../../components/GeneratedCode"
import { QuestionWraper } from "./style"
import judge from '../../assets/judge.svg'

const Editor = () => {
    return (
        <>
            <QuestionWraper>
                <span>
                    <img src={judge} />
                </span>
                <div>
                    <p>asdasd
                    asdasd
                    asdasd
                    asdasd</p>
                </div>
                <div>
                    asdasd
                </div>
            </QuestionWraper>
            <CustomBlocklyWorkpace javascriptCode="aas" onCodeChange={() => { }}>
                <GeneratedCodeArea code={`if(to_fudido){\n\tconsole.log('Ow, na asdasdasdsadasdassadmorrsdasdasdasdasdasdasdsadasdsal, vou desistir do curso');    \n}`} />
            </CustomBlocklyWorkpace>
        </>
    )
}

export default Editor;