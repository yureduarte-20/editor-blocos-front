import { useEffect, useState } from 'react'
import { AccordionWrap, Container, HomeContainer, IDEContainer } from './style'
import { Link, useLocation } from 'react-router-dom';
import Accordion from '../../components/Accordion';
import { IAccordionItem, Iitem } from '../../components/Accordion/AccordionItem';
import { useAuthenticateApi } from '../../utils/useApi'
interface IResponse {
    id: string;
    title: string,
    expectedOutput: string;
    dificultyLevel: string
}
export function Home(props: any) {
    const location = useLocation()
    const api = useAuthenticateApi();
    const [question, setQuesions] = useState<IResponse[]>([])
    useEffect(() =>{
        (async() =>{
            try{
                const response = await api.get('/admin-issues');
                setQuesions(response.data);
            } catch(e){

            }
        })()
    }, [])
    return (
        <Container>
            <HomeContainer>
                <IDEContainer>
                    <p> Faça seus programas! programe oque quiser no nosso ambiente</p>
                    <a>IDE</a>
                </IDEContainer>
                { question.length &&
                <AccordionWrap>
                    <h1 style={{ textAlign: 'center' }}>Exercícios</h1>
                    <Accordion items={[ { title:'Fácil', questions:question.filter(item => item.dificultyLevel =='Fácil' ? item : undefined) },
                                        { title:'Intermediário', questions:question.filter(item => item.dificultyLevel =='Intermediário' ? item : undefined) },   
                                        { title:'Difícil', questions:question.filter(item => item.dificultyLevel =='Difícil' ? item : undefined) }   
                ]} />
                </AccordionWrap>
                }
            </HomeContainer>
        </Container>
    )

}