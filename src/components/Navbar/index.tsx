import { Header, Brand } from "./style";
import brand from '../../assets/brand.svg';
import user from '../../assets/user.svg'
const Navbar = (props: any) =>{

    return (
        <Header>
            <Brand>
                <img src={brand} width="50px"/>
                <span>
                JOAO - JUDGE ONLINE AUTOMATIC ORIENTATION
                </span>
            </Brand>
            <img src={user} alt="Botão Usuário"/>
        </Header>
    );
}

export default Navbar;