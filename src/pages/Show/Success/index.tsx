import { Link } from "react-router-dom"
import { Card } from "../../../styles/global"
import { StatusSVG } from './style'

export default () => {
    return (
        <>
            <h2 style={{ textAlign: 'center' }} className="font-2-l font-light">Parabéns!</h2>
            <StatusSVG className="green font-2-m font-light" >
                <p>Seu código foi aceito</p>
                <p><Link className="orange" to="/exercicios">clique aqui</Link> para ser redirecionado para a lista de exercício</p>
            </StatusSVG>
        </>
    )
}