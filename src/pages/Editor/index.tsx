import { useEffect, useState } from "react"
import { ChangeEvent } from 'react'
import { CustomBlocklyWorkpace } from "../../components/CustomBlocklyWorpace"
import { GeneratedCodeArea } from "../../components/GeneratedCode"
import { BoxQuestion } from "../../components/BoxQuestion"
import { useAuthenticateApi } from "../../utils/useApi";
import { Navigate, useLocation, useMatch, useNavigate, useParams,  } from "react-router-dom";
import Modal from 'react-modal'
import { Store } from "react-notifications-component"
import colors from "../../styles/colors"
import Button from "../../components/Button"
export enum DoubtsTags {
    LOOPS = 'loops',
    CONDITIONAL = 'condicionais',
    VARIABLES = 'variaveis',
    INPUT_OUTPUTS = 'entrada_saida',
    OTHERS = 'outros'
}
import { IDemonstrations } from 'types'
import { Container } from "../../styles/global"
import { ButtonPrimary, ButtonSecondary } from "../../components/BoxQuestion/styled"
import { SelectLanguage } from "../../components/GeneratedCode/styles"
import SyntaxHighlighter from "react-syntax-highlighter"
import { TextArea } from "../auth/Login/styled"
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '1200px',
    },
};
const Editor = () => {
    const [code, setCode] = useState('');
    const [problem, setProblem] = useState<any>(null)
    const navigate = useNavigate()
    const authApi = useAuthenticateApi()
    const [xml, setXml] = useState('');
    const [language, setLanguage] = useState('javascript');
    const params = useParams();
    const location: any = useLocation();
    const [isLoading, setLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalDoubtOpen, setModalDoubtOpen] = useState<boolean>(false)
    const [tagDoubt, setTagDoubt] = useState("outros")
    const [codeModel, setCodeModal] = useState<boolean>(false);
    Modal.setAppElement('#root')
    let subtitle
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    function openModalDoubt() {
        setModalDoubtOpen(true);
    }
    function closeModalDoubt() {
        setModalDoubtOpen(false);
    }
    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setLanguage(e.target.value)
    }
    const handleCreateNewDoubt = async () => {
        try {

            const data = await authApi.post(`/doubt/problem/${params.id}`, { tagDoubt })
            Store.addNotification({
                title: 'Enviado',
                message: 'Solicitação para falar com orientador foi criada com sucesso 😀',
                type: 'success',
                container: 'top-center',
                dismiss: {
                    duration: 3000
                }
            })
            window.open( '/#/chat',  '_blank');
        } catch (e: any) {
            if (e.response) {
                Store.addNotification({
                    title: 'Erro',
                    message: e.response.data.error.message,
                    type: 'danger',
                    container: 'top-center',

                    dismiss: {
                        duration: 3000
                    }
                })
            }
            console.error(e)
        }
    }
    useEffect(() => {
        (async () => {
            try {
                let response = await authApi.get(`/problems/${params.id}`);
                setProblem(response.data);
                console.log(response.data.demonstrations)
                openModal()
            } catch (e: any) {

            }
        })()
    }, [])

    const submit = async () => {
        if (window.confirm('Tem certeza que deseja enviar sua resolução?'))
            try {
                setLoading(true)
                let response = await authApi.post(`/problems/${params.id}/submissions`, { blocksXml: xml, problemId: params.id })
                Store.addNotification({
                    title: 'Enviado',
                    message: 'Seu código foi submetido com sucesso 😀',
                    type: 'success',
                    container: 'top-center',
                    dismiss: {
                        duration: 3000
                    }
                })
                navigate(`/submissoes/${response.data.id}`, { state: { problemId: params.id } })
                //openSuccess("Enviado 😀")

            } catch (e: any) {
                if (e.response)
                    Store.addNotification({
                        title: 'Erro',
                        message: e.response.data.error.message,
                        type: 'danger',
                        container: 'top-center',

                        dismiss: {
                            duration: 3000
                        }
                    })
                console.log(e.response.data.error.message)

            } finally {
                setLoading(false)
            }
    }

    const handleExec = () => {
        try {
            eval(code);
        } catch (error: any) {
            console.log(error)
            //erro quando algo não for inicializado
            //esse regex analisa a expressão inteira, no lugar desse undefeined poderia ter outro regex (outro caso seria null) mas o blokly protege entao fds
            //o regex captura a função que deu ruim
            let regex = new RegExp("(?<=Cannot read properties of undefined \\(reading )'([\\(A-Za-z_0-9]+)'", "g");
            if (error.message.match(regex) != null) {
                //diz "algo" porque nao tem como saber oque foi
                alert("Opa, parece que você não inicializou algo e esta tentando usar a função " + error.message.match(regex)[0]
                    + "\nRevise e veja se suas váriaveis foram iniciadas antes de serem usadas :D\n" + error.message);
                return;
            }
            //erro quando  algum metodo não pode ser executado por causa do tipo da variavel (dado ao conteudo)
            //esse regex analisa 80% da expressão no caso apartir do metodo que nao pode ser utilizado mais "is not a function" (.charAt() is not a function)
            // o regex captura a a função que deu ruim tbm, mas no caso a gente tem acesso a variavel que deu ruim tbm
            regex = new RegExp("[a-zA-z0-9_]+\\s(?=is not a function)", "g");
            if (error.message.match(regex) != null) {

                alert(                                      //pegando função que deu ruim
                    "Opa, parece que você tentou usar a função '" + error.message.match(regex)[0].trim()
                    //estraindo a variavel ou objeto que deu ruim fazendo um replace FODA
                    + "' que não é compativel com o tipo do objeto '" + (error.message.replace(("." + error.message.match(regex)[0].trim() + " is not a function"), ""))
                    + "'\nRevise e veja como suas variaveis estão sendo usadas :D\n" + error.message);
                return;
            }
        }

    }

    return (
        <>

            <BoxQuestion
                question={{ title: problem?.title ?? 'Olá mundo !' }}
                onButtonRunPressed={submit}
                test={handleExec}
                isSubmitting={isLoading}
                onDetailsClick={() => setIsOpen(true)}
                handleCreateNewDoubt={openModalDoubt}
                showCode={() => setCodeModal(true)}
            />
            <CustomBlocklyWorkpace onXmlChange={(nxml) => setXml(nxml)} code={code} language={language}
                initialXml={location.state?.params?.blocksXml ?? ''} onCodeChange={setCode}>
            </CustomBlocklyWorkpace>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    ...customStyles, overlay: {
                        background: colors.primary_background + 'AC',
                        zIndex: 5555
                    }
                }}

                contentLabel="Questão"
            >

                <h2 className="font-1-xl font-light blue" style={{ textAlign: 'center' }} ref={(_subtitle) => (subtitle = _subtitle)}>{problem?.title ?? ''}</h2>
                <div className="font-2-m" style={{ fontFamily: "'Neuton', serif", fontWeight: 300, marginBottom: 30 }} dangerouslySetInnerHTML={{ __html: problem?.description }}></div>
                <h3 className="font-1-m gray-3" style={{ textAlign: 'center', marginBottom: 10 }}>Demonstrações</h3>
                <div style={{
                    display: 'grid',
                    justifyContent: 'center',
                    width: '100%',
                    gridTemplateColumns: '1fr 1fr',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <span className="gray-3" style={{ justifySelf: 'end', }}>Entradas</span>
                    <span className="gray-3">Saídas</span>
                    {
                        problem?.demonstrations.map((demonstration: IDemonstrations) => (
                            <>
                                <div style={{ gridColumn: '1', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                                   {demonstration.demonstrationInputs && <TextArea disabled style={{
                                        minWidth: '250px',
                                        textAlign: 'start',
                                        maxWidth: '300px',
                                       
                                        backgroundColor: colors.primary_input_background,
                                        padding: '10px',
                                    }} defaultValue={demonstration.demonstrationInputs.join('\n')} />
                                    }
                                </div>

                                <div style={{ gridColumn: '2', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
                                    {<TextArea className="gray-3" style={{
                                        minWidth: '250px',
                                        maxWidth: '300px',
                                        textAlign: 'start',
                                        backgroundColor: colors.primary_input_background,
                                        padding: '10px',
                                    }} defaultValue={demonstration.demonstrationOutput} disabled />
                                    }
                                </div>
                            </>))
                    }
                </div>
                <Button onClick={closeModal}>Fechar</Button>
            </Modal>
            <Modal
                isOpen={modalDoubtOpen}
                style={{
                    ...customStyles, overlay: {
                        background: colors.primary_background + 'AC',
                        zIndex: 5555
                    }
                }}
                onRequestClose={closeModalDoubt}
            >
                <Container>
                    <h2 className="font-1-xl font-light blue" >Solicitação de ajuda para orientador</h2>
                    <p className="font-1-m">Aqui você pode solicitar ajudar a um orientador caso esteja com dúvidas em relação a este problema, basta dizer nos dizer em qual parte está em dúvida.</p>
                    <div style={{ flexDirection: "row", gap: 10 }} className="d-flex j-center a-center">
                        <select onChange={e => setTagDoubt(e.target.value)} className="font-1-m" value={tagDoubt}>
                            <option value={DoubtsTags.LOOPS}>Loops</option>
                            <option value={DoubtsTags.CONDITIONAL}>Condicionais</option>
                            <option value={DoubtsTags.VARIABLES}>Variáveis</option>
                            <option value={DoubtsTags.INPUT_OUTPUTS}>Entradas e Saídas</option>
                            <option value={DoubtsTags.OTHERS}>outros</option>
                        </select>
                        <div style={{ gap: '10px', display: 'flex' }}>
                            <Button onClick={closeModalDoubt}>Fechar</Button>
                            <ButtonSecondary onClick={handleCreateNewDoubt}>Solicitar</ButtonSecondary>
                        </div>
                    </div>
                </Container>
            </Modal>
            <Modal isOpen={codeModel}
                shouldCloseOnOverlayClick={true}
                onAfterClose={() => { setCodeModal(false) }}
                shouldCloseOnEsc={true}
                style={{
                    content: {
                        ...customStyles.content,
                        minWidth: '50vw',
                        minHeight: '60vh'
                    },
                    overlay: {
                        background: colors.primary_background + 'AC',
                        zIndex: 5555
                    },
                }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '60vh' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', flex: 0.5 }}>
                        <SelectLanguage open={codeModel} value={language} onChange={handleLanguageChange}>
                            <option value="javascript">Javascript</option>
                            <option value="python">Python</option>
                            <option value="dart">Dart</option>
                            <option value="php">PHP</option>
                            <option value="lua">Lua</option>
                        </SelectLanguage>
                    </div>
                    <div style={{ display: 'flex', width: '100%', padding: '15px 10px', flex: 4, overflow: "auto" }}>
                        <SyntaxHighlighter 

                            customStyle={{ width: '100%', fontSize: '12px' }}
                            language={language}
                        >
                            {code}
                        </SyntaxHighlighter>
                    </div>
                    <div style={{ gap: '10px', display: 'flex', justifyContent: 'center', flex: 0.5 }}>
                        <Button onClick={() => setCodeModal(false)}>Fechar</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Editor;