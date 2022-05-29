import { FormEvent, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../store/authContext'
import { Container, Wrapper } from './styled';
import Spinner from '../../../components/Spinner';
import { useApi } from '../../../utils/useApi';
import Button from '../../../components/Button';
export const getTokenFromFakeApi = ({ email, password } : { email:string, password:string })  =>{
    return new Promise<{ status:number,  data:any } >( (res, rej) =>{
        
            setTimeout(() => (email === "yure@gmail.com" && password ==="12345678") ?
                 res({
                     status:200,
                     data:{
                         token:"um_token_aleatorio"
                     }
                 }) :
                 rej({
                     status: 401,
                     response:{
                         message:"usuário e senha incorretos"
                     }
                 }), 
                 3000);
        
    })
}

const Login = () => {
    const { setToken } = useAuth();
    const [isLoading, setIsloading] = useState(false);
    const api = useApi()
    const location = useLocation();
    const navigate = useNavigate()
    const onSubmit = async (e : any) => {
        e.preventDefault()
        setIsloading(true);
        let email = e.target[0].value as string
        let password = e.target[1].value as string
        try{
          let response = await api.post("/login", { email, password })
          setToken(response.data.token);
          setIsloading(false);
          navigate('/',{  });
        } catch(e : any){
            console.log(e)
            console.log(e.response)
            /* if(e.response.status)
                openSnackbar(e.response.data.error.message) */
        } finally{
            setIsloading(false)
        }
        
    }
   // if(isAutenticate) return <Navigate to={'/'} state={location} />
    return (
        <Container>
            <Wrapper>
                <h2 className='font-1-xl font-light blue'>Login</h2>
                <form onSubmit={onSubmit}>
                    <input className='font-1-m' type={'email'} />
                    <input className='font-1-m' type={'password'} />
                    { isLoading ?
                        <Spinner />
                        :
                        <Button className='font-1-s' type='submit' margin='10px 0 0 0'>Enviar</Button>
                    }
                </form>
            </Wrapper>
        </Container>
    );
}

export default Login;