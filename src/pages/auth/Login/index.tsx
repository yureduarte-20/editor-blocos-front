import { FormEvent, useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../store/authContext'
import { Container, Form, Input, Wrapper } from './styled';
import Spinner from '../../../components/Spinner';
import { useApi, useAuthenticateApi } from '../../../utils/useApi';
import Button from '../../../components/Button';
import { Store } from 'react-notifications-component'
import { Typograph } from '../../../styles/Typographic.';
import { User, useUser } from '../../../store/userContext';
import axios from 'axios';
const Login = () => {
    const { setToken } = useAuth();
    const { setUser } = useUser();
    const [isLoading, setIsloading] = useState(false);
    const api = useApi()
    const authApi = useAuthenticateApi();
    const location = useLocation();
    const navigate = useNavigate()
    const onSubmit = async (e: any) => {
        e.preventDefault()
        setIsloading(true);
        let email = e.target[0].value as string
        let password = e.target[1].value as string
        try {
            const response = await api.post("/login", { email, password })
            const profile: User = (await axios.get( 'http://localhost:3000/profile', {
                headers: {
                    Authorization: `Bearer ${response.data.token}`
                }
            })).data;
            setToken(response.data.token);
            setUser(profile);
            setIsloading(false);
            navigate('/', { });
        } catch (e: any) {
            console.log(e)
            console.log(e.response)
            if (e.response)
                Store.addNotification({
                    container: 'top-center',
                    insert: 'top',
                    title: 'Erro',
                    type: 'warning',
                    message: e.response.data.error.message,
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    },
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],

                })
        } finally {
            setIsloading(false)
        }

    }
    // if(isAutenticate) return <Navigate to={'/'} state={location} />
    return (
        <Container>
            <Wrapper>
                <h2 className='font-1-xl font-light blue'>Login</h2>
                <Form onSubmit={onSubmit}>
                    <label htmlFor='font-2-l' >Email</label>
                    <Input name='email' className='font-2-m font-light' type={'email'} />
                    <label htmlFor='font-2-l' >Senha</label>
                    <Input name="password" className='font-2-m font-light' type={'password'} />
                    {isLoading ?
                        <Spinner />
                        :
                        <Button className='font-1-s' type='submit' margin='10px 0 0 0'>Enviar</Button>
                    }
                </Form>
                <p className='font-1-s black font-light'> Ainda não possui uma conta?
                    <Link style={{ display: 'inline-block' }} className="orange" to={'/signup'} >Clique Aqui</Link>
                </p>
            </Wrapper>
        </Container>
    );
}

export default Login;