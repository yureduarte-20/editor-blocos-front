import { useEffect, useState } from 'react'
import { AccordionWrap, Container, Header, HomeContainer, TableWrap, TBody, Table, Th, Thead, Tr, Td } from './style'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Accordion from '../../components/Accordion';
import { useAuthenticateApi } from '../../utils/useApi'
import colors from '../../styles/colors';
interface IResponse {
    id: string;
    blocksXml:string;
    issue: { title: string, dificultyLevel:string,id:string | number }
}
export function Home(props: any) {
    const location = useLocation()
    const api = useAuthenticateApi();
    const [submissions, setSubmissions] = useState<IResponse[]>([]);
    const navigate = useNavigate()
    
    useEffect(() => {
        (async () => {
            try {
                const response = await api.get(`/submissions?filter=${JSON.stringify({ include: ["issue"] })}`);
                setSubmissions(response.data);
                console.log(response)
            } catch (e) {

            }
        })()
    }, [])
    return (
        <Container>
            <HomeContainer>
                <Header>
                    <h1 className='font-1-xl blue'>Submissões</h1>
                    <p className='font-2-m font-light'>Abaixo estão todas as submissões que realizou até agora.</p>
                </Header>

                <TableWrap>
                    {submissions.length != 0 &&
                        <Table width='100%'>
                            <Thead>
                                <Tr>
                                    <Th className='font-2-m white' width='20%' textAlign='start'>Código</Th>
                                    <Th className='font-2-m white' width='10%' textAlign='start'>Dificuldade</Th>
                                    <Th className='font-2-m white' width='70%' textAlign='start'>Nome</Th>
                                </Tr>
                            </Thead>
                            <TBody>
                                {submissions.map( submission =>
                                    
                                        <Tr key={submission.id}>
                                            <Td>
                                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                                    {submission.id}
                                                </span>
                                            </Td>
                                            <Td>
                                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                                    { submission.issue.dificultyLevel }
                                                </span>
                                            </Td>
                                            <Td>
                                                <span style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                                    <p>{submission.issue.title}</p>
                                                    <a onClick={e => navigate(`/editor/${submission.issue.id}`, { state:{ params:{ blocksXml: submission.blocksXml  } } })}>Refazer</a>
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