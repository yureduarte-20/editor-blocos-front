import { Link } from "react-router-dom"
import Spinner from "../../../components/Spinner"

export default () => {
    return (
        <>
            <h1 style={{ textAlign: 'center' }} className="font-2-l font-light">Seu código está sendo avaliado pelo nosso juiz</h1>
            <span className="d-flex j-center">
                <Spinner />
            </span>
            <p style={{ textAlign:'center' }} className="font-2-s font-light">Você pode voltar depois para saber o resultado, enquanto isso você pode resolver outros exercícios da nossa lista</p>
            <p className="font-2-s font-light" style={{ textAlign:'center' }}><Link className="orange" to="/exercicios">clique aqui</Link> para ser redirecionado para a lista de exercício</p>
        </>
    )
}