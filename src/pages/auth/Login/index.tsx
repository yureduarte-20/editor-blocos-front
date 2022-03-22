import { useState } from 'react'
import { Container, Wrapper } from './styled'
const Login = () => {

    return (
        <Container>
            <Wrapper>
                <h2>LOGIN</h2>
                <form>
                    <input type={'email'} />
                    <input type={'password'} />
                    <button type='submit'>Enviar</button>
                </form>
            </Wrapper>
        </Container>
    );
}

export default Login;