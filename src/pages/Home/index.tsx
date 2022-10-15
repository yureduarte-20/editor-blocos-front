import { useEffect, useState } from 'react'
import { AccordionWrap, Header, HomeContainer, TableWrap, TBody, Table, Th, Thead, Tr, Td } from './style'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Accordion from '../../components/Accordion';
import { useAuthenticateApi } from '../../utils/useApi'
import colors from '../../styles/colors';
import Spinner from '../../components/Spinner';
import { Card, Container } from '../../styles/global';
import Title from '../../components/Title';
import { useUser } from '../../store/userContext';
interface IResponse {
    id: string;
    blocksXml: string;
    status: SubmissionStatus;
    
    issue: { title: string, dificultyLevel: string, id: string | number }
}
export const enum SubmissionStatus {
    ACCEPTED = 'ACCEPTED',
    TIME_LIMIT_EXCEEDED = 'TIME_LIMIT_EXCEEDED',
    PRESENTATION_ERROR = 'PRESENTATION_ERROR',
    PENDING = 'PENDING',
    RUNTIME_ERROR = 'RUNTIME_ERROR',
    COMPILATION_ERROR = 'COMPILATION_ERROR',
    WRONG_ANSWER = 'WRONG_ANSWER'
}
export function Home(props: any) {
    const location = useLocation()
    const api = useAuthenticateApi();
    const [submissions, setSubmissions] = useState<IResponse[]>([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false);
    const { name } = useUser()
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await api.get(`/submissions?filter=${JSON.stringify({ include: ["issue"], order: 'createdAt DESC' })}`);
                setSubmissions(response.data);
                console.log(response)
            } catch (e) {

            } finally {
                setLoading(false)
            }
        })()
    }, [])
    return (
        <Container>
            <HomeContainer>
                <Card>
                    <span>Olá, seja bem vindo {name}</span>
                </Card>
                <Title title='Submissões' subtitle='Abaixo estão todas as submissões que realizou até agora.' />
                <TableWrap>
                    {
                        submissions.length == 0 &&
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center'
                        }}>
                            {(!loading) &&
                                <h2 className='font-1-l'>Não há submissões</h2>
                            }
                            {loading &&
                                <Spinner />
                            }
                        </div>
                    }
                    {(!loading) && submissions.length != 0 &&
                        <Table width='100%'>
                            <Thead>
                                <Tr>
                                    <Th className='font-2-m white' width='5%' textAlign='start'>Código</Th>
                                    <Th className='font-2-m white' width='5%' textAlign='start'>Dificuldade</Th>
                                    <Th className='font-2-m white' width='20%' textAlign='start'>Status</Th>
                                    <Th className='font-2-m white' width='70%' textAlign='start'>Nome</Th>
                                </Tr>
                            </Thead>
                            <TBody>
                                {submissions.map(submission =>

                                    <Tr className='font-2-xs' key={submission.id}>

                                        <Td>
                                            <Link style={{ display: 'inline-block' }} to={`/submissoes/${submission.id}`}>
                                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                                    {submission.id}
                                                </span>
                                            </Link>
                                        </Td>
                                        <Td >
                                            <Link style={{ display: 'inline-block' }} to={`/submissoes/${submission.id}`}>
                                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                                    {submission.issue.dificultyLevel}
                                                </span>
                                            </Link>
                                        </Td>
                                        <Td  >
                                            <Link style={{ display: 'inline-block' }} to={`/submissoes/${submission.id}`}>
                                                <span className={`${submission.status == SubmissionStatus.ACCEPTED ? 'green' : 'red'}`}
                                                    style={{ display: 'flex', alignItems: 'center', }}>
                                                    {((status: SubmissionStatus) => {
                                                        switch (status) {
                                                            case SubmissionStatus.ACCEPTED: return 'Aceito';
                                                            case SubmissionStatus.PRESENTATION_ERROR: return 'Erro de Apresentação';
                                                            case SubmissionStatus.PENDING: return 'Pendente';
                                                            case SubmissionStatus.RUNTIME_ERROR: return 'Erro de Execução';
                                                            case SubmissionStatus.TIME_LIMIT_EXCEEDED: return 'Tempo limite excedido';
                                                            case SubmissionStatus.COMPILATION_ERROR: return 'Erro de Compilação';
                                                            case SubmissionStatus.WRONG_ANSWER: return 'Resposta Incorreta'
                                                            default: return status;
                                                        }

                                                    })(submission.status)}
                                                </span>
                                            </Link>
                                        </Td>
                                        <Td>
                                            <span style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems:'center' }}>
                                                 <Link style={{ display:'inline-block', padding:5 }} className='test-gray' to={`/submissoes/${submission.id}`}>
                                                    {submission.issue.title}
                                                 </Link>
                                            
                                                <a className='orange' style={{ display: 'inline-block', padding: '5px' }} onClick={e => navigate(`/editor/${submission.issue.id}`, { state: { params: { blocksXml: submission.blocksXml } } })}>Refazer</a>
                                            </span>
                                        </Td>
                                    </Tr>


                                )}
                            </TBody>
                        </Table>}
                        
                </TableWrap>
            </HomeContainer>
        </Container>
    )

}