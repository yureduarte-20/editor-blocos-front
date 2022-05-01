import { useState } from 'react'
import { Container, LogWrap } from './style'
import { GeneratedCodeArea } from '../../components/GeneratedCode';
import { CustomBlocklyWorkpace } from '../../components/CustomBlocklyWorpace';
import { Log } from '../../components/Log';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export function Home(props: any) {
    const location = useLocation()
    console.log(location.state?.params?.userId ) 
    return (
        <Container>
                    <p>Bemvindo a página inicial</p>
        </Container>
    )

}