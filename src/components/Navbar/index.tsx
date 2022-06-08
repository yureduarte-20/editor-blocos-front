import { Header, Brand } from "./style";
import brand from '../../assets/brand.svg';
import user from '../../assets/user.svg'
import { useAuth } from "../../store/authContext";
import { Link } from "react-router-dom";

const Navbar = (props: any) => {
    const { removeToken, token } = useAuth();
    console.log(token)
    const logout = (e: any) => {
        removeToken();
    }
    return (
        <>
            <Header style ={{marginBottom: '0px'}}>
                <Brand>
                    <img src={brand} width="50px" />
                    <span className="font-2-s white">
                        JOAO - JUDGE ONLINE AUTOMATIC ORIENTATION
                    </span>
                </Brand>
                <div style={{ display:'flex', flexDirection:'row', gap:20, padding: '10px 20px' }}>
                    { token ?
                    <>
                        <Link to="/submissoes" onClick={logout} className="font-2-s white">Submissões</Link>
                        <Link to="/exercicios"  className="font-2-s white">Exercícios</Link>
                        <Link to="/perfil" onClick={logout} className="font-2-s white">Perfil</Link>
                    </>
                    : 
                    <>
                        <Link to="/login" className="font-2-s white">Login</Link>
                        <Link to="/signup" className="font-2-s white">Cadastrar-se</Link>
                    </>
                    }
                </div>
            </Header>
        </>
    );
}

export default Navbar;