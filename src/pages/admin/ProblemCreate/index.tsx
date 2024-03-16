import { Card, Container } from "../../../styles/global"
import { Input, TextArea } from "../../auth/Login/styled"
import { Form, InputGroup, Select } from './style'
import { IDemonstrations, IProblem } from "types"
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from "react"
import Spinner from "../../../components/Spinner"
import { useAuthenticateApi } from "../../../utils/useApi"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from "../../../components/Button"
import { Store } from "react-notifications-component"
import { ButtonSecondary } from "../../../components/BoxQuestion/styled"
export default (props: any) => {
    const { problemId } = useParams();
    
    const [loading, setLoading] = useState(false);
    const [subminting, setSubminting] = useState(false)
   // const [problem, setProblem] = useState<IProblem>()
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
    /*  
    useEffect(() => {
        getProblems()
    }, [])
   const getProblems = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/admin/problems/${problemId}`);
            setProblem(response.data)
            setValue(state => response.data.description ?? state)
            setTestCase(response.data.testCases ?? [])
            setDemonstration(response.data.demonstrations ?? [])
        } catch (e) {

        } finally {
            setLoading(false)
        }
    } */
    const create = async () => {
        try {
            setSubminting(true)
            const _problem: IProblem = {
                id: problemId as string,
                demonstrations: demonstration,
                description: value,
                testCases: testCase,
                title: title.current?.value, dificultyLevel: dificultyLevel.current?.value
            }
            await api.post(`/admin/problems`, { ..._problem })
            Store.addNotification({
                container: 'top-center',
                title: 'Criado com sucesso!',
                type: 'success',
                //message: 'Logue-se novamente para acessar a aplicação.',
                insert: 'top',
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }

            })
            return navigate('/admin/problems')
        } catch (e) {
            Store.addNotification({
                container: 'top-center',
                title: 'Não foi possível salvar sua alterações',
                type: 'danger',
                message: 'Tente novamente depois.',
                insert: 'top',
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
        } finally {
            setSubminting(false)
        }
    }
    const addTestCase = () => {
        let temp: { inputs?: string[], outputs: string, validationOutputRegex?: string } = { outputs: '' }
        if (tempInputTestCase.current) {
            const v = tempInputTestCase.current.value as any
            if (v != '') {
                if (!temp.inputs)
                    temp.inputs = [];
                temp.inputs.push(...v.split(';'))
            }
            tempInputTestCase.current.value = ''
        }
        if (tempOutputTestCase.current) {
            const v = tempOutputTestCase.current.value as any
            if (v == '') {
                return Store.addNotification({
                    container: 'top-center',
                    title: 'Caso teste não pode ficar sem saída!',
                    type: 'danger',
                    //  message: 'Logue-se novamente para acessar a aplicação.',
                    insert: 'top',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                })
            }
            temp.outputs = v;
            tempOutputTestCase.current.value = ''
        }
        if (tempOutputRegex.current) {
            const v = tempOutputRegex.current.value as any
            if (v != '') {
                temp.validationOutputRegex = v
            }
            tempOutputRegex.current.value = ''
        }
        setTestCase([...testCase, temp]);
    }
    function removeCaseTest(index: number) {
        setTestCase(state => state.filter((item, _index) => index !== _index))
    }
    const addDemonstration = () => {
        let temp: { demonstrationInputs?: string[], demonstrationOutput: string } = { demonstrationOutput: '' };
        if (demonstrationOutputRef.current) {
            const v = demonstrationOutputRef.current.value as any
            temp.demonstrationOutput = v;
        }
        if (demonstrationInputRef.current) {
            const v = demonstrationInputRef.current.value as any
            if (!temp.demonstrationInputs) {
                temp.demonstrationInputs = []
            }
            temp.demonstrationInputs.push(...v.split(';'))
        }
        setDemonstration([...demonstration, temp])
    }
    function removeDemonstrations(index: number) {
        setDemonstration(state => state.filter((item, _index) => index != _index))
    }
    return (
        <Container>
            <Card>
                <Form onSubmit={e => { e.preventDefault();create()}}>
                    <InputGroup gridColumn="span 3">
                        <label htmlFor="title">Título</label>
                        <Input ref={title} name="title" aria-label="Título do Problema" />
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="title" >Dificuldade</label>
                        <Select ref={dificultyLevel}
                            name="dificultyLevel"
                            >
                            <option value={"Fácil"}>Fácil</option>
                            <option value={"Intermediário"}>Intermediário</option>
                            <option value={"Difícil"}>Difícil</option>
                        </Select>
                    </InputGroup>
                    <InputGroup id="text-editor" gridColumn="span 4">
                        <label htmlFor="">Descrição</label>
                        <ReactQuill style={{ display: 'block' }} bounds="#text-editor" theme="snow" value={value} onChange={setValue} /><div style={{ visibility: "hidden" }}>.</div>
                    </InputGroup>

                    <InputGroup gridColumn="span 4" style={{ border: '1px solid #c4c4c4', borderRadius: 4, padding: 10 }}>
                        <h3>Casos de Teste</h3>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                            <Input ref={tempInputTestCase} style={{ flex: 1 }} placeholder={`Entradas (separadas por ponto vírgula ;)`} />
                            <TextArea ref={tempOutputTestCase} style={{ flex: 1 }} placeholder={`Saída`} />
                            <Input ref={tempOutputRegex} style={{ flex: 1 }} placeholder={`Expressão regular (Regex) de validação de saída`} />
                            <Button onClick={e => { e.preventDefault(); addTestCase() }}>Adicionar</Button>
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
                                            <TextArea style={{ flex: 1 }} value={item.outputs} disabled={true} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <p>Espressão regular</p>
                                            <Input style={{ flex: 1 }} value={item.validationOutputRegex ?? ''} disabled={true} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'end' }}>
                                            <Button style={{ display: 'block' }} onClick={e => {
                                                e.preventDefault();
                                                removeCaseTest(index)
                                            }}>Remover</Button>
                                        </div>
                                    </li>)
                            })}
                        </ul>
                    </InputGroup>
                    <InputGroup gridColumn="span 4" style={{ border: '1px solid #c4c4c4', borderRadius: 4, padding: 10 }}>
                        <h3>Casos de Demonstração</h3>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                            <Input ref={demonstrationInputRef} style={{ flex: 1 }} placeholder={`Entradas (separadas por vírgula)`} />
                            <TextArea ref={demonstrationOutputRef} style={{ flex: 1 }} placeholder={`Saída`} />
                            <Button onClick={e => { e.preventDefault(); addDemonstration() }}>Adicionar</Button>
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
                                            <TextArea style={{ flex: 1 }} value={item.demonstrationOutput} disabled={true} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'end' }}>
                                            <Button style={{ display: 'block' }} onClick={e => {
                                                e.preventDefault();
                                                removeDemonstrations(index)
                                            }}>Remover</Button>
                                        </div>
                                    </li>)
                            })}
                        </ul>
                    </InputGroup>
                    <InputGroup gridColumn="span 4">
                        <Button disabled={subminting} type="submit">Salvar</Button>
                        <ButtonSecondary onClick={e => { e.preventDefault(); navigate('/admin/problems', { replace:true }) }}>Cancelar</ButtonSecondary>
                    </InputGroup>
                </Form>
            </Card>
        </Container>
    )
}