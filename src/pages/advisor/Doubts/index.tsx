import { useEffect, useState } from "react"
import { Store } from "react-notifications-component"
import { useNavigate } from "react-router-dom"
import { Doubt } from "types"
import Button from "../../../components/Button"
import { useUser } from "../../../store/userContext"
import { Card, Container, Th } from "../../../styles/global"
import { useAuthenticateApi } from "../../../utils/useApi"
import { Table, TableWrap, TBody, Td, Thead, Tr } from "../../Home/style"


export default () => {
    const [doubts, setDoubts] = useState<Doubt[]>([])
    const api = useAuthenticateApi()
    const user = useUser()
    const navigate = useNavigate()
    function statusHandler(status: string) {
        switch (status) {
            case 'ON_GOING':
                return <span className="red">Ocorrendo</span>
            case 'COMPLETE':
                return <span className="green">Completo</span>
            case 'OPEN':
                return <span className="blue">Aberto</span>
            default: return <span className="blue">{status}</span>
        }
    }
    const getUnsubscribeDoubts = async () => {
        try {
            const response = await api.get(`/advisor/doubts/?filter=${JSON.stringify({
                where: {
                    or: [
                        { status: "OPEN" },
                        { status: "ON_GOING", advisorURI: `/users/${user.id}` },
                        { advisorURI: `/users/${user.id}` }
                    ]
                }
            })}`)
            setDoubts(response.data)
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
        }
    }
    const handleSubscribe = async (doubt: Doubt) => {
        if ( doubt.status === 'OPEN'  && window.confirm('Você aceita orientar este aluno? ')) {
            try {
                await api.post(`/orientador/duvidas/subscribe/${doubt.id}`, {})
                return navigate('/orientador/chat')
            } catch (e : any) {
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
                    getUnsubscribeDoubts()
                }
            }
        }
        if(doubt.status === 'ON_GOING'){
            return navigate('/orientador/chat')
        }
        if(doubt.status === 'COMPLETE'){
            alert('Esta ocorrência já foi finalizada, você não pode enviar mensagens')
        }
    }
    useEffect(() => {
        getUnsubscribeDoubts()
    }, [])
    return (
        <Container>
            <Card>
            </Card>
            <TableWrap>
                <Table>
                    <Thead>
                        <Tr>
                            <Th className='font-2-m white' width='10%' textAlign='start'>Código</Th>
                            <Th className='font-2-m white' width='30%' textAlign='start'>Nome</Th>
                            <Th className='font-2-m white' width='20%' textAlign='start'>Problema</Th>
                            <Th className='font-2-m white' width='20%' textAlign='start'>Status</Th>
                            
                        </Tr>
                    </Thead>
                    <TBody>
                        {doubts.map(item => (

                            <Tr onClick={e => handleSubscribe(item)} className='font-2-xs' >
                                <Td>
                                    {item.id}
                                </Td>
                                <Td>
                                    {item.studentName}
                                </Td>
                                <Td>
                                    {item.problemTitle}
                                </Td>
                                <Td>
                                    {statusHandler(item.status)}
                                </Td>
                                
                            </Tr>

                        ))
                        }
                    </TBody>
                </Table>
            </TableWrap>
        </Container >)
}