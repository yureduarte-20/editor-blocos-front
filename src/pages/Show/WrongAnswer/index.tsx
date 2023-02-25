import { Store } from "react-notifications-component"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Card } from "../../../styles/global"
import { useAuthenticateApi } from "../../../utils/useApi"
import { StatusSVG } from './style'

export default ({ successfulRate }: { successfulRate: number }) => {
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
    return (
        <>
            <h2 style={{ textAlign: 'center' }} className="font-2-l font-light">Que pena 😞</h2>
            <StatusSVG className="red font-2-m font-light" >
                <p>Seu código executou, mas ele não passou pelos testes do juiz</p>
            </StatusSVG>
            <p style={{ textAlign: 'center' }}>Mas vamos lá, não desista! Você acertou <strong><span className="red">{ successfulRate * 100 }%</span></strong> dos casos de teste!</p>
            <p style={{  textAlign:'center' }}>Você pode solicitar ajuda com um orientador<a className="blue" onClick={e => handleCreateNewDoubt()}
                    style={{ cursor: 'pointer', }}> clicando aqui</a></p>
            <p className="font-2-s font-light gray-3" style={{ textAlign: 'center' }}>*Dica: tente refaze-lo usando outras entradas além das demonstrações apresentadas pelo exercício</p>
            <p className="font-2-s font-light gray-3" style={{ textAlign: 'center' }}>*Dica: use e abuse da função “testar” antes de submeter seu código</p>
        </>
    )
}