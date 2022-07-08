import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Level, LevelWrap } from "./style";
import  { Header }from './style'
const LevelSelect = () => {
    const navigate = useNavigate()
    return (
        <Container>
              <Header >
                    <h1 className='font-1-xl blue'>Exercícios</h1>
                    <p className='font-2-m font-light'>Abaixo, selecione um dos níveis de dificuldade para continuar</p>
                </Header>
            <LevelWrap >
                <Level onClick={e => navigate('/exercicios/Fácil')}>
                    <h2 className="font-1-l white" >Fácil</h2>
                </Level>
                <Level>
                    <h2 onClick={e => navigate('/exercicios/Intermediário')} className="font-1-l white">Intermediário</h2>
                </Level>
                <Level>
                    <h2 onClick={e => navigate('/exercicios/Difícil')} className="font-1-l white">Difícil</h2>
                </Level>
            </LevelWrap>
        </Container>
    )
}

export default LevelSelect;