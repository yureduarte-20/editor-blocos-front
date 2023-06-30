import { useEffect, useState } from "react"
import { CustomBlocklyWorkpace } from '../../components/CustomBlocklyWorpace'
import './style.css'
import { Card } from "../../styles/global";
import { Typograph } from "../../styles/Typographic.";
import Button from "../../components/Button";
import { useAuthenticateApi } from "../../utils/useApi";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "react-notifications-component";
import { Axios, AxiosError, AxiosResponse } from "axios";
import Spinner from "../../components/Spinner";
import { ButtonSecondary } from "../../components/BoxQuestion/styled";
import { Draft } from "types";
const DraftEditorEdit = () => {
    const [blocksXml, setBlockxXml] = useState<string>('');
    const [draft, setDraft] = useState<Draft>()
    const [code, setCode] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const api = useAuthenticateApi()
    const [isSending, setIsSending] = useState(false)
    const params = useParams()
    const { draftId } = useParams();

    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const { data } = await api.get(`/users/drafts?filter=${JSON.stringify({ where: { id: draftId } })}`)
                setDraft(data[0])
            } catch (e: any) {
                let error: AxiosError = e;
                if (error.response) {
                    return Store.addNotification({
                        title: 'Erro',
                        message: e.response.data.error.message,
                        type: 'danger',
                        container: 'top-center',
                        dismiss: {
                            duration: 3000
                        }
                    })
                }
                Store.addNotification({
                    title: 'Erro',
                    message: "Não foi possível salvar seu rascunho.",
                    type: 'danger',
                    container: 'top-center',
                    dismiss: {
                        duration: 3000
                    }
                })
            } finally {
                setLoading(false);
            }
        })()
    }, [])

    const handleSubmit = async () => {
        if (window.confirm('Tem certeza que deseja realizar esta operação?'))
            try {
                
                setIsSending(true);
                const response = await api.patch(`/users/drafts/${draftId}`, {  blocksXml });
                Store.addNotification({
                    title: 'Ok',
                    message: "Salvo com successo",
                    type: 'success',
                    container: 'top-center',
                    dismiss: {
                        duration: 3000
                    }
                })
                navigate('/rascunhos', { replace: true })
            } catch (e: any) {
                
                if (e.response) {
                    return Store.addNotification({
                        title: 'Erro',
                        message: e.response.data.error.message,
                        type: 'danger',
                        container: 'top-center',
                        dismiss: {
                            duration: 3000
                        }
                    })
                }
                Store.addNotification({
                    title: 'Erro',
                    message: "Não foi possível salvar seu rascunho.",
                    type: 'danger',
                    container: 'top-center',

                    dismiss: {
                        duration: 3000
                    }
                })
            } finally {
                setIsSending(false);
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
    if (loading)
        return (
            <Card style={{ margin: '10px 0px', justifyContent:'center', alignItems:'center' }} title="Rascunho">
                <Spinner />
            </Card>
        )
    return (
        <div>
            <Card style={{ margin: '10px 0px' }} title="Rascunho">
                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: "row" }}>
                    <div className="left">
                        <h1 className="font-1-l">Rascunho</h1>
                        <h2 className="font-2-m" >Aqui você pode escrever seus códigos e salvar para analizar depois.</h2>
                    </div>
                    <div style={{ alignItems: 'center', justifyContent: 'center', display: "flex", flexDirection: "column", gap: '10px' }}>
                        <Button onClick={handleSubmit}>{isSending ? <Spinner /> : "Salvar"}</Button>
                        <ButtonSecondary onClick={handleExec}>Executar</ButtonSecondary>
                    </div>
                </div>
            </Card>
            <CustomBlocklyWorkpace initialXml={draft?.blocksXml} className="full-h" onCodeChange={setCode} children={null} language="javascript" onXmlChange={setBlockxXml} />
        </div>);
}

export default DraftEditorEdit;