import { useEffect, useState } from "react";
import { Container, Table, Th, Thead, TBody, Tr, Td, } from "../../styles/global"
import { Draft } from "types";
import { TableWrap } from "../Home/style";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { ButtonSecondary } from "../../components/BoxQuestion/styled";
import { useAuthenticateApi } from "../../utils/useApi";
import { AxiosError } from "axios";
import { Store } from "react-notifications-component";


const Drafts = () => {
    const [drafts, setDrafts] = useState<Draft[]>([]);
    const [loading, setLoading] = useState(true);
    const api = useAuthenticateApi();
    const navigate = useNavigate();
    useEffect( () =>{
        (async () =>{
            try{
                setLoading(true)
                const {data} = await api.get('/users/drafts')
                setDrafts(data)
            } catch(e : any){
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
            } finally{ 
                setLoading(false)
            }

        })()
    } ,[])
    return (
        <>
            <Title title="Rascunhos" subtitle="Aqui estão seus rascunhos salvos." margin="10px 20px" />
            <Container full>
                <TableWrap>
                    <div style={{ alignSelf:'end', padding:'10px' }} className="d-flex">
                        <ButtonSecondary onClick={() => navigate('/novo-rascunho')}>Criar</ButtonSecondary>
                    </div>
                    <Table width="100%">
                        <Thead>
                            <Tr>
                                <Th className='font-2-m white' width='5%' textAlign='start'>Título</Th>
                                <Th className='font-2-m white' width='5%' textAlign='start'>Última atualização</Th>
                            </Tr>
                        </Thead>
                        <TBody>
                            {drafts.length <= 0 && <span>Não há rascunhos salvos</span>}
                            {drafts.map(draft => <Tr key={draft.id} onClick={() => navigate('/editor-rascunhos/' + draft.id)}>
                                <Td >{draft.title}</Td>
                                <Td>{ `${new Date(draft.updatedAt as string).toLocaleDateString()} às ${new Date(draft.updatedAt as string).toLocaleTimeString()} `  } </Td>
                            </Tr>)}
                        </TBody>
                    </Table>
                </TableWrap>
            </Container>
        </>
    )

}
export default Drafts;