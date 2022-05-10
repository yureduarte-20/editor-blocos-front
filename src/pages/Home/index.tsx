import { useState } from 'react'
import { Container, LogWrap } from './style'
import {  Link, useLocation } from 'react-router-dom';

export function Home(props: any) {
    const location = useLocation()
    return (
        <Container>
                    <h4>Bem vindo a página inicial</h4>
                    <Link to="/editor"><p>Vamos ao editor?</p></Link>

        </Container>
    )

}