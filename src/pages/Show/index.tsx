import { Card, Container } from "../../styles/global";
import { Background } from "./style";
import success from '../../assets/success.svg'
import { Link } from "react-router-dom";
import Success from "./Success";

const Show = () => {
    return (
        <Background>
            <Container >
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }} className="font-1-xl white font-light">Fibonacci básico</h1>
                <Card padding="10px 20px 40px 20px" >
                    <Success />
                </Card>
            </Container>
        </Background>
    );
}

export default Show;