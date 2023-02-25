import { Header, Brand, DropdownWrapper, DropdownContent } from "./style";
import brand from '../../assets/brand.svg';
import user from '../../assets/user.svg'
import { useAuth } from "../../store/authContext";
import { Link, useLocation } from "react-router-dom";
import { Roles, Services, useUser } from "../../store/userContext";
import { Container } from "../../styles/global";

const Navbar = (props: any) => {
    const { removeToken, token } = useAuth();
    const location = useLocation()
    const user = useUser()
    const logout = (e: any) => {
        removeToken();
    }
    return (
        <>
            <Header>
                <Container full={true}>

                    <div style={{ margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <Brand>
                            <img src={brand} width="50px" />
                            <span className="font-2-s white">
                                JOAO - JUIZ ONLINE DE AVALIAÇÃO COM ORIENTAÇÃO
                            </span>
                        </Brand>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 20, }}>
                            {token ?
                                <>
                                    {
                                        user.responsibilities?.some(res => res.role === Roles.ADMIN) &&
                                        <DropdownWrapper>
                                            <span className="font-2-s white">Administrador</span>
                                            <DropdownContent className="dropdown-content">
                                                <ul>
                                                    <li>
                                                        <Link style={{ display: 'inline-block',  }} to="/admin/problems" className="font-2-s">Gerenciar problemas</Link>
                                                    </li>
                                                </ul>
                                            </DropdownContent>
                                        </DropdownWrapper>
                                    }

                                    {
                                        user.responsibilities?.some(res => res.role === Roles.ADVISOR && res.service == Services.CHAT_SERVICE) &&
                                        <DropdownWrapper>
                                            <span className="font-2-s white">Orientador</span>
                                            <DropdownContent className="dropdown-content">
                                                <ul>
                                                    <li>
                                                        <Link style={{ display: 'block',  }} to="/orientador/duvidas" className="font-2-s">Listar dúvidas</Link>
                                                    </li>
                                                    <li>
                                                        <Link style={{ display: 'block',  }} to="/orientador/chat" className="font-2-s">Chat</Link>
                                                    </li>
                                                </ul>
                                            </DropdownContent>
                                        </DropdownWrapper>
                                    }
                                    <DropdownWrapper>
                                        <span className="font-2-s white">Problemas</span>
                                        <DropdownContent className="dropdown-content">
                                            <ul>
                                                <li>
                                                    <Link style={{ display: 'block' }}to="/" className="font-2-s ">Submissões</Link>
                                                </li>
                                                <li>
                                                    <Link style={{ display: 'block' }}to="/exercicios" className="font-2-s">Lista de Exercícios</Link>
                                                </li>
                                                <li>
                                                    <Link style={{ display: 'block' }}to="/chat" className="font-2-s">Chat de Dúvidas</Link>
                                                </li>
                                            </ul>
                                        </DropdownContent>
                                    </DropdownWrapper>
                                    <DropdownWrapper>
                                        <span className="font-2-s white">Usuário</span>
                                        <DropdownContent className="dropdown-content">
                                            <ul>
                                                <li >
                                                    <Link style={{ display: 'block' }} to="/perfil" className="font-2-s">Perfil</Link>
                                                </li>
                                                <li>
                                                    <Link style={{ display: 'block' }} to="/login" className="font-2-s" onClick={logout}>Sair</Link>
                                                </li>
                                            </ul>
                                        </DropdownContent>
                                    </DropdownWrapper>
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