import { Card, Container } from "../../../styles/global"
import { Input } from "../../auth/Login/styled"
import { Form, InputGroup, Select } from './style'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from "react"
import Spinner from "../../../components/Spinner"
import { useAuthenticateApi } from "../../../utils/useApi"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from "../../../components/Button"
import { IDemonstrations, IProblem } from "types"
export default (props: any) => {
    const { id: problemId } = useParams();

    const [loading, setLoading] = useState(true);
    const [problem, setProblem] = useState<IProblem>()
    const api = useAuthenticateApi();
    const [testCase, setTestCase] = useState<{ inputs?: string[], outputs: string, validationOutputRegex?: string }[]>([]);
    const [demonstration, setDemonstration] = useState<IDemonstrations[]>([])
    const tempInputTestCase = useRef<any>();
    const tempOutputTestCase = useRef<any>();
    const tempOutputRegex = useRef<any>();
    const demonstrationInputRef = useRef<any>()
    const demonstrationOutputRef = useRef<any>()
    const title = useRef<any>();
    const dificultyLevel = useRef<any>()
    const [value, setValue] = useState('');
    const navigate = useNavigate()
    const t = useRef<any>()
    useEffect(() => {
        getProblems()
    }, [])
    const getProblems = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/advisor/problems/${problemId}`);
            setProblem(response.data)
            setValue(state => response.data.description ?? state)
            setTestCase(response.data.testCases ?? [])
            setDemonstration(response.data.demonstrations ?? [])
        } catch (e) {

        } finally {
            setLoading(false)
        }
    }
    if (loading) {
        return (
            <Container>
                <Spinner />
            </Container>
        )
    }
    if (!problem)
        return (
            <Container >
                <h6>Não foi possíve carregar o problema</h6>
            </Container>
        )
    return (
        <Container>
            <Card>
                <Form onSubmit={e => { e.preventDefault() }}>
                    <InputGroup gridColumn="span 3">
                        <label htmlFor="title">Título</label>
                        <Input disabled={true} ref={title} name="title" aria-label="Título do Problema" defaultValue={problem.title} />
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="title" >Dificuldade</label>
                        <Select disabled={true} ref={dificultyLevel} onChange={e => { console.log(e.currentTarget.value) }}
                            name="dificultyLevel"
                            defaultChecked={true}
                            defaultValue={problem.dificultyLevel}>
                            <option value={"Fácil"}>Fácil</option>
                            <option value={"Intermediário"}>Intermediário</option>
                            <option value={"Difícil"}>Difícil</option>
                        </Select>
                    </InputGroup>
                    <InputGroup id="text-editor" gridColumn="span 4">
                        <label htmlFor="">Descrição</label>
                        <ReactQuill readOnly={true} style={{ display: 'block' }} bounds="#text-editor" theme="snow" value={value} onChange={setValue} /><div style={{ visibility: "hidden" }}>.</div>
                    </InputGroup>

                    <InputGroup gridColumn="span 4" style={{ border: '1px solid #c4c4c4', borderRadius: 4, padding: 10 }}>
                        <h3>Casos de Teste</h3>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                            <Input disabled={true} ref={tempInputTestCase} style={{ flex: 1 }} placeholder={`Entradas (separadas por ponto vírgula ;)`} />
                            <Input disabled={true} ref={tempOutputTestCase} style={{ flex: 1 }} placeholder={`Saída`} />
                            <Input disabled={true} ref={tempOutputRegex} style={{ flex: 1 }} placeholder={`Expressão regular (Regex) de validação de saída`} />
                            <Button disabled={true} onClick={e => { e.preventDefault(); }}>Adicionar</Button>
                        </div>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <h3></h3>
                            {testCase.map((item, index) => {
                                return (
                                    <li key={index}
                                        style={{
                                            display: 'flex', flexDirection: 'row', gap: '5px', width: '100%',
                                            border: '1px solid #c4c4c4', borderRadius: 4,
                                            padding: 10
                                        }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <p>Entradas</p>
                                            <Input style={{ flex: 1 }} value={item.inputs?.join(';') ?? ''} disabled={true} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <p>Saída</p>
                                            <Input style={{ flex: 1 }} value={item.outputs} disabled={true} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <p>Espressão regular</p>
                                            <Input style={{ flex: 1 }} value={item.validationOutputRegex ?? ''} disabled={true} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'end' }}>
                                            <Button disabled={true} style={{ display: 'block' }} onClick={e => {
                                                e.preventDefault();

                                            }}>Remover</Button>
                                        </div>
                                    </li>)
                            })}
                        </ul>
                    </InputGroup>
                    <InputGroup gridColumn="span 4" style={{ border: '1px solid #c4c4c4', borderRadius: 4, padding: 10 }}>
                        <h3>Casos de Demonstração</h3>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                            <Input disabled={true} ref={demonstrationInputRef} style={{ flex: 1 }} placeholder={`Entradas (separadas por vírgula)`} />
                            <Input disabled={true} ref={demonstrationOutputRef} style={{ flex: 1 }} placeholder={`Saída`} />
                            <Button disabled={true} onClick={e => { e.preventDefault(); }}>Adicionar</Button>
                        </div>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <h3></h3>
                            {demonstration.map((item, index) => {
                                return (
                                    <li key={index}
                                        style={{
                                            display: 'flex', flexDirection: 'row', gap: '5px', width: '100%',
                                            border: '1px solid #c4c4c4', borderRadius: 4,
                                            padding: 10
                                        }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <p>Entradas</p>
                                            <Input style={{ flex: 1 }} value={item.demonstrationInputs?.join(';') ?? ''} disabled={true} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <p>Saída</p>
                                            <Input style={{ flex: 1 }} value={item.demonstrationOutput} disabled={true} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'end' }}>
                                            <Button disabled={true} style={{ display: 'block' }} onClick={e => {
                                                e.preventDefault();

                                            }}>Remover</Button>
                                        </div>
                                    </li>)
                            })}
                        </ul>
                    </InputGroup>
                    <InputGroup gridColumn="span 4">

                    </InputGroup>
                </Form>
            </Card>
        </Container>
    )
}