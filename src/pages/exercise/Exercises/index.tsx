import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import Title from "../../../components/Title";
import { Card, Container, Table, TBody, Td, Th, Thead, Tr } from "../../../styles/global";
import { useAuthenticateApi } from "../../../utils/useApi";
import { SubmissionStatus } from "../../Home";
import { SolvedIssue } from "./style";

export interface IIssueResponse {
    id: string | number;
    title: string;
    description: string;
    dificultyLevel: string;
    submissions?: [{ status: SubmissionStatus }]
}
const Exercises = () => {
    const params = useParams();
    const navigate = useNavigate();
    const api = useAuthenticateApi();
    const [issues, setIssues] = useState<IIssueResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await api.get(`issues?filter=${JSON.stringify({ where: { dificultyLevel: params?.dificultyLevel } })}&withSubmissions=true`);
                setIssues(response.data)
            } catch (e) {

            } finally {
                setLoading(false);
            }
        })()
    }, []);
    return (
        <Container>
            <Title margin="0 10px 10px 0" title={`${params?.dificultyLevel}`} subtitle="Escolha um dos exercícios abaixo para resolver" />
            <Card>

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
                            </Tr>
                        </Thead>
                        <TBody>
                            {issues.map(issue =>

                                <Tr className='font-2-xs' key={issue.id}>
                                    <Td style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                        <SolvedIssue status={issue.submissions && issue.submissions.some((value, index, array) =>{
                                            console.log(value)
                                            if(value.status == SubmissionStatus.ACCEPTED)
                                                return true;
                                        }) ? SubmissionStatus.ACCEPTED : undefined
                                    }
                                            >
                                            {issue.id}
                                        </SolvedIssue>
                                    </Td>
                                    <Td>
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            {issue.dificultyLevel}
                                        </span>
                                    </Td>
                                    <Td>
                                        <span style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                            <p>{issue.title}</p>
                                            <a className='orange' style={{ cursor: 'pointer' }} onClick={e => navigate(`/editor/${issue.id}`)}>Fazer</a>
                                        </span>
                                    </Td>
                                </Tr>


                            )}
                        </TBody>
                    </Table>

                }
            </Card>
        </Container>
    )
}

export default Exercises;