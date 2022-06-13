import { Header, Brand } from "./style";
import brand from '../../assets/brand.svg';
import user from '../../assets/user.svg'
import { useAuth } from "../../store/authContext";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../store/userContext";
import { Container } from "../../styles/global";

const Navbar = (props: any) => {
    const { removeToken, token } = useAuth();
    const location = useLocation()
    const logout = (e: any) => {
        removeToken();
    }
    return (
        <>
            <Header>
                <Container full={ true }>

                    <div style={{ margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <Brand>
                            <img src={brand} width="50px" />
                            <span className="font-2-s white">
                                JOAO - JUDGE ONLINE AUTOMATIC ORIENTATION
                            </span>
                        </Brand>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 20, }}>
                            {token ?
                                <>
                                    <Link style={{ display: 'inline-block' }} to="/" className="font-2-s white">Submissões</Link>
                                    <Link style={{ display: 'inline-block' }} to="/exercicios" className="font-2-s white">Exercícios</Link>
                                    <Link style={{ display: 'inline-block' }} to="/perfil" className="font-2-s white">Perfil</Link>
                                    <Link to="/login" className="font-2-s white" onClick={logout}>Sair</Link>
                                </>
                                :
                                <>
                                    <Link to="/login" className="font-2-s white">Login</Link>
                                    <Link to="/signup" className="font-2-s white">Cadastrar-se</Link>
                                </>
                            }
                        </div>
                    </div>
                </Container>
            </Header>
        </>
    );
}

export default Navbar;