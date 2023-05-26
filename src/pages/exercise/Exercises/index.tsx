import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import Title from "../../../components/Title";
import { Card, Container, Table, TBody, Td, Th, Thead, Tr } from "../../../styles/global";
import { useAuthenticateApi } from "../../../utils/useApi";
import { SubmissionStatus } from "../../Home";
import { SolvedProblem } from "./style";
import { AxiosError } from "axios";
import { Store } from "react-notifications-component";

export interface IProblemResponse {
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
    const [problems, setProblems] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await api.get(`problems?filter=${JSON.stringify({ where: { dificultyLevel: params?.dificultyLevel } })}`);
                const ids = response.data.map((item: any) => item.id)
                const { data: submissions } = await api.get(`/submissions?filter=${JSON.stringify({ where: { problemId: { inq: ids } }, fields: { problemId: true, status: true, id: true } })}`)
                const problems = response.data
                for (const problem of problems) {
                    if (!problem.submissions) {
                        problem.submissions = []
                    }
                    const subs = submissions.filter((item: any) => item.problemId == problem.id)
                    if (subs.length !== 0) {
                        problem.submissions.push(subs)
                        problem.submissions = problem.submissions.flat()
                    }
                }
                console.log(problems)
                setProblems(problems)
            } catch (e: any) {
                if (e.response) {
                    Store.addNotification({
                        container: 'top-center',
                        message: e.response.data.error.message,
                        title: 'Erro',
                        type: 'danger',
                        dismiss: {
                            duration: 3000,
                            click: true,
                        },
                    })
                }
                console.error(e)
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
                            {problems.map(problem =>

                                <Tr className='font-2-xs' key={problem.id}>
                                    <Td style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <SolvedProblem status={problem.submissions && problem.submissions.find((item: any) => [SubmissionStatus.ACCEPTED].includes(item.status))?.status}
                                        >
                                            {problem.id}
                                        </SolvedProblem>
                                    </Td>
                                    <Td>
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            {problem.dificultyLevel}
                                        </span>
                                    </Td>
                                    <Td>
                                        <span style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                            <p>{problem.title}</p>
                                            <a className='orange' style={{ cursor: 'pointer' }} onClick={e => navigate(`/editor/${problem.id}`)}>Fazer</a>
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