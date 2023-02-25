import { useMemo, useState } from "react"
import { Store } from "react-notifications-component"
import { Link, useNavigate, useParams } from "react-router-dom"
import Button from "../../../components/Button"
import colors from "../../../styles/colors"
import { Card } from "../../../styles/global"
import { useAuthenticateApi } from "../../../utils/useApi"
import { StatusSVG } from './style'

export default ({ errorLog }: { errorLog: string }) => {
    const [visible, setVisible] = useState(false);
    const api = useAuthenticateApi()
    const params = useParams()
    const navigate = useNavigate()
    const handleCreateNewDoubt = async () => {
        try {

            const data = await api.post(`/problems/${params.id}/doubt`, {})
            Store.addNotification({
                title: 'Enviado',
                message: 'Solicitação para falar com orientador foi criada com sucesso 😀',
                type: 'success',
                container: 'top-center',
                dismiss: {
                    duration: 3000
                }
            })
            navigate(`/chat`, { state: { doubtId: data.data.id } })
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
    const toggle = () => {
        setVisible(!visible);
    }
    const e = useMemo(() => {
        try {

            let json_parsed = JSON.parse(errorLog);
            let err = new Error(json_parsed.message);
            err.name = json_parsed.name;

            return err;
        } catch (e) {
            return new Error('Não conseguimos avaliar o erro');
        }
    }, [errorLog])
    return (
        <>
            <h2 style={{ textAlign: 'center' }} className="font-2-l font-light">Eita 😳</h2>
            <StatusSVG className="red font-2-m font-light" >
                <p>O código submetido não executou direito.</p>
            </StatusSVG>
            <p style={{  textAlign:'center' }}>Você pode solicitar ajuda com um orientador<a className="blue" onClick={e => handleCreateNewDoubt()}
                    style={{ cursor: 'pointer', }}> clicando aqui</a></p>
            <p className="font-2-s font-light gray-3" style={{ textAlign: 'center' }}>*Dica: verifique se os tipos que você usou (texto, número, lista etc.) coicidem com as funçoes que você usou</p>
            <p className="font-2-s font-light gray-3" style={{ textAlign: 'center', marginBottom: 20 }}>*Dica: verifique se a quantidade de vezes que você usou o bloco "pedir um texto/numero" <br />
                coicidem com a quantidade de entradas</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Button
                    onClick={e => toggle()}
                    margin="10px 0"
                    color={colors.textGray}
                    backgroundColor={colors.primary_input_background}>
                    Mostrar detalhes (avançado)
                </Button>
                <div style={{
                    padding: '10px 20px',
                    backgroundColor: colors.primary_input_background,
                    borderRadius: 4,
                    opacity: visible ? "1" : "0",
                    transition: "opacity ease-in .5s",
                }}>
                    <pre>
                        <code style={{ fontSize:'12px' }}>
                            {`${e.message}\n` ?? ''}
                        </code>
                    </pre>
                </div>
            </div>
        </>
    )
}