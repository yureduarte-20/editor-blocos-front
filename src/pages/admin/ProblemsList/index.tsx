import { useCallback, useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import Title from "../../../components/Title";
import { Card, Container, Table, TBody, Td, Th, Thead, Tr } from "../../../styles/global";
import { useAuthenticateApi } from "../../../utils/useApi";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";
import { AddButton } from "./style";
import { IProblem } from "types";

export default () => {

    const [loading, setLoading] = useState(false)
    const [problems, setProblems] = useState<Omit<IProblem, 'description' | 'testCases' | 'demonstrationInputs' | 'demonstrationOutputs'>[]>([])
    const api = useAuthenticateApi();
    const navigate = useNavigate()
    useEffect(() => {
        getProblems()
    }, [])
    const getProblems = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/admin/problems?filter=${JSON.stringify({ fields: { id: true, title: true, dificultyLevel: true } })}`);
            setProblems(response.data)
        } catch (e) {

        } finally {
            setLoading(false)
        }
    }
    const deleteProblem = useCallback(async (id: string) => {
        try {
            await api.del(`/admin/problems/${id}`)
            Store.addNotification({
                container: 'top-center',
                title: 'Deletado com sucesso!',
                type: 'success',
                //message: 'Logue-se novamente para acessar a aplicação.',
                insert: 'top',
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            })
            await getProblems()
        } catch (e) {
            Store.addNotification({
                container: 'top-center',
                title: 'Erro ao deletar',
                type: 'danger',
                message: 'Tente novamente ou recarregue a página.',
                insert: 'top',
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            })
        }
    }, [problems])
    return (
        <Container >
            <Card>

                <Title margin="0 10px 10px 0" title={`Problemas`} subtitle="Aqui está todos os problemas " />
                <div style={{ display:'flex', justifyContent:'end', marginBottom:20 }}>
                    <AddButton onClick={e => navigate("/admin/problem/create")}>
                        Adicionar
                    </AddButton>
                </div>

                {loading ?
                    <span className="d-flex j-center">
                        <Spinner />
                    </span>

                    :
                    <Table width='100%'>
                        <Thead>
                            <Tr>
                                <Th className='font-1-m white' width='15%' textAlign='start'>Código</Th>
                                <Th className='font-1-m white' width='15%' textAlign='start'>Dificuldade</Th>
                                <Th className='font-1-m white' width='70%' textAlign='start'>Nome</Th>
                                <Th className='font-1-m white' width='70%' textAlign='start'>Ações</Th>
                            </Tr>
                        </Thead>

                        <TBody>
                            {problems.map(problem =>

                                <Tr className='font-2-xs' key={problem.id}>
                                    <Td style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {problem.id}
                                    </Td>
                                    <Td>
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            {problem.dificultyLevel}
                                        </span>
                                    </Td>
                                    <Td>
                                        <span style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                            <p>{problem.title}</p>
                                        </span>
                                    </Td>
                                    <Td>
                                        <span style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                            <a className="orange" style={{ cursor: 'pointer', display: 'block', padding: 5 }} onClick={() => navigate(`/admin/problem/${problem.id}`)}>Editar</a>
                                            <a className='red' style={{ cursor: 'pointer', display: 'block', padding: 5 }} onClick={e => deleteProblem(problem.id)}>deletar</a>
                                        </span>
                                    </Td>
                                </Tr>


                            )}
                        </TBody>
                    </Table>

                }
            </Card>
        </Container>
    );
}