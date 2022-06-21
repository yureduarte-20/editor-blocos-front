import { Link } from "react-router-dom"
import { Card } from "../../../styles/global"
import { StatusSVG } from './style'

export default () => {
    return (
        <>
            <h2 style={{ textAlign: 'center' }} className="font-2-l font-light">Que pena 😞</h2>
            <StatusSVG className="red font-2-m font-light" >
                <p>Seu código executou, mas ele não passou pelos testes do juiz</p>
            </StatusSVG>
            <p className="font-2-s font-light gray-3" style={{ textAlign: 'center' }}>*Dica: tente refaze-lo usando outras entradas além das demonstrações apresentadas pelo exercício</p>
            <p className="font-2-s font-light gray-3" style={{ textAlign: 'center' }}>*Dica: use e abuse da função “testar” antes de submeter seu código</p>
        </>
    )
}