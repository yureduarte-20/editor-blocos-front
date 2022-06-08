import { FormEvent, useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../store/authContext'
import { Container, Form, Input, Wrapper } from './styled';
import Spinner from '../../../components/Spinner';
import { useApi } from '../../../utils/useApi';
import Button from '../../../components/Button';
import { Store } from 'react-notifications-component'

const Signup = () => {
    const { setToken } = useAuth();
    const [isLoading, setIsloading] = useState(false);
    const api = useApi()
    const location = useLocation();
    const navigate = useNavigate()
    const onSubmit = async (e: any) => {
        e.preventDefault()
        let name = e.target[0].value as string;
        let email = e.target[1].value as string;
        let password = e.target[2].value as string;
        let password_confirm = e.target[3].value as string;
        if (password != password_confirm) return Store.addNotification({
            container: 'top-center',
            insert: 'top',
            title: 'Atenção',
            type: 'warning',
            message: 'A senhas não coincidem.',
            dismiss: {
                duration: 3000,
                onScreen: true
            },
            /* animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"], */
        })
        setIsloading(true);
        try {
            let response = await api.post("/signup", { email, password, name })
            setToken(response.data.token);
            setIsloading(false);
            Store.addNotification({
                container: 'top-center',
                insert: 'top',
                title: 'Ok',
                type: 'success',
                message: 'Sua conta foi criada com sucesso!',
                dismiss: {
                    duration: 3000,
                    onScreen: true
                },
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],

            })
            navigate('/', {});
        } catch (e: any) {
            console.log(e)
            console.log(e.response)
            if (e.response.status)
                Store.addNotification({
                    container: 'top-center',
                    insert: 'top',
                    title: 'Erro',
                    type: 'danger',
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
                <h2 className='font-1-xl font-light blue'>Cadastrar-se</h2>
                <Form onSubmit={onSubmit}>
                    <label htmlFor='font-2-l' >Nome Completo</label>
                    <Input name='name' className='font-2-m font-light' type={'text'} />
                    <label htmlFor='font-2-l' >E-mail</label>
                    <Input name='email' className='font-2-m font-light' type={'email'} />
                    <label htmlFor='font-2-l' >Senha</label>
                    <Input name="password" className='font-2-m font-light' type={'password'} />
                    <label htmlFor='font-2-l' >Confirme sua senha</label>
                    <Input name="password_confirm" className='font-2-m font-light' type={'password'} />
                    {isLoading ?
                        <Spinner />
                        :
                        <Button className='font-1-s' type='submit' margin='10px 0 0 0'>Enviar</Button>
                    }
                </Form>
                <Link to={'/signup'} />
            </Wrapper>
        </Container>
    );
}

export default Signup;