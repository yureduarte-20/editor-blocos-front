import { Header, Brand } from "./style";
import brand from '../../assets/brand.svg';
import user from '../../assets/user.svg'
import { useAuth } from "../../store/authContext";

const Navbar = (props: any) => {
    const { removeToken } = useAuth();
    const logout = (e: any) => {
        removeToken();
    }
    return (
        <>
            <Header>
                <Brand>
                    <img src={brand} width="50px" />
                    <span>
                        JOAO - JUDGE ONLINE AUTOMATIC ORIENTATION
                    </span>
                </Brand>
                <button
                    onClick={logout}
                    style={{
                        textDecoration: 'none',
                        display: 'inline-block',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer'
                    }}>
                    <img src={user} alt="Botão Usuário" />
                </button>
            </Header>
        </>
    );
}

export default Navbar;