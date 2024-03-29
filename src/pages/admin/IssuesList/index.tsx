import { useCallback, useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import Title from "../../../components/Title";
import { Card, Container, Table, TBody, Td, Th, Thead, Tr } from "../../../styles/global";
import { useAuthenticateApi } from "../../../utils/useApi";
import { Store } from "react-notifications-component";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { ButtonSecondary } from "../../../components/BoxQuestion/styled";
import { AddButton } from "./style";
export interface ITestCase {
    inputs?: string[],
    outputs: string,
    validationOutputRegex?: string
}
export interface IIssue {
    id: string;
    title: string
    description: string,
    testCases: ITestCase[],
    dificultyLevel: string,
    demonstrations: IDemonstrations[]
}
export interface IDemonstrations {
    demonstrationInputs?: string[];
    demonstrationOutput: string;
}
export default () => {

    const [loading, setLoading] = useState(false)
    const [issues, setIssues] = useState<Omit<IIssue, 'description' | 'testCases' | 'demonstrationInputs' | 'demonstrationOutputs'>[]>([])
    const api = useAuthenticateApi();
    const navigate = useNavigate()
    useEffect(() => {
        getIssues()
    }, [])
    const getIssues = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/admin/issues?filter=${JSON.stringify({ fields: { id: true, title: true, dificultyLevel: true } })}`);
            setIssues(response.data)
        } catch (e) {

        } finally {
            setLoading(false)
        }
    }
    const deleteIssue = useCallback(async (id: string) => {
        try {
            await api.del(`/admin/issues/${id}`)
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
            await getIssues()
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
    }, [issues])
    return (
        <Container >
            <Card>

                <Title margin="0 10px 10px 0" title={`Problemas`} subtitle="Aqui está todos os problemas " />
                <div style={{ display:'flex', justifyContent:'end', marginBottom:20 }}>
                    <AddButton onClick={e => navigate("/admin/issue/create")}>
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
                            {issues.map(issue =>

                                <Tr className='font-2-xs' key={issue.id}>
                                    <Td style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {issue.id}
                                    </Td>
                                    <Td>
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            {issue.dificultyLevel}
                                        </span>
                                    </Td>
                                    <Td>
                                        <span style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                            <p>{issue.title}</p>
                                        </span>
                                    </Td>
                                    <Td>
                                        <span style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                            <a className="orange" style={{ cursor: 'pointer', display: 'block', padding: 5 }} onClick={() => navigate(`/admin/issue/${issue.id}`)}>Editar</a>
                                            <a className='red' style={{ cursor: 'pointer', display: 'block', padding: 5 }} onClick={e => deleteIssue(issue.id)}>deletar</a>
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