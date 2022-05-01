import { FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../store/authContext'
import { Container, Wrapper } from './styled';
import { useSnackbar  } from 'react-simple-snackbar';
const Login = () => {
    const { setToken  } = useAuth();
    const [openSnackbar, closeSnackbar] = useSnackbar({ 
        position: "top-center", 
        style:{
            backgroundColor: '#d32f2f',
            color:'white'
        } })
    const navigate = useNavigate()
    const onSubmit = (e : any) => {
        e.preventDefault()
        let email = e.target[0].value as string
        let password = e.target[1].value as string
        if(email == "yure@gmail.com" && password == "12345678"){
            setToken("um_token_aleatorio")
            return navigate('/', { state:{ params:{ userId: 1 } } })
        }
        openSnackbar("Usuário ou senha incorretos.");
        let t = setTimeout(() =>{
            clearTimeout(t);
            closeSnackbar()
        }, 3000)
        
    }
    return (
        <Container>
            <Wrapper>
                <h2>LOGIN</h2>
                <form onSubmit={onSubmit}>
                    <input type={'email'} />
                    <input type={'password'} />
                    <button type='submit'>Enviar</button>
                </form>
            </Wrapper>
        </Container>
    );
}

export default Login;