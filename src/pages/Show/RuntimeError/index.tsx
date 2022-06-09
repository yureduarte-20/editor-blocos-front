import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Button from "../../../components/Button"
import colors from "../../../styles/colors"
import { Card } from "../../../styles/global"
import { StatusSVG } from './style'

export default ({ errorLog }: { errorLog: string }) => {
    const [visible, setVisible] = useState(false);
    const toggle = () => {
        setVisible(!visible);
    }
    const e = useMemo(() => {
        try {

            let json_parsed = JSON.parse(errorLog);
            let err = new Error(json_parsed.message);
            err.name = json_parsed.name;

            return err;
        } catch (e) {
            return new Error('Não conseguimos avaliar o erro');
        }
    }, [errorLog])
    return (
        <>
            <h2 style={{ textAlign: 'center' }} className="font-2-l font-light">Eita 😳</h2>
            <StatusSVG className="red font-2-m font-light" >
                <p>O código submetido não executou direito.</p>
            </StatusSVG>
            <p className="font-2-s font-light gray-3" style={{ textAlign: 'center' }}>*Dica: verifique se os tipos que você usou (texto, número, lista etc.) coicidem com as funçoes que você usou</p>
            <p className="font-2-s font-light gray-3" style={{ textAlign: 'center', marginBottom: 20 }}>*Dica: verifique se a quantidade de vezes que você usou o bloco "pedir um texto/numero" <br />
                coicidem com a quantidade de entradas</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Button
                    onClick={e => toggle()}
                    margin="10px 0"
                    color={colors.textGray}
                    backgroundColor={colors.primary_input_background}>
                    Mostrar detalhes (avançado)
                </Button>
                <div style={{
                    padding: '10px 20px',
                    backgroundColor: colors.primary_input_background,
                    borderRadius: 4,
                    opacity: visible ? "1" : "0",
                    transition: "opacity ease-in .5s",
                }}>
                    <pre>
                        <code style={{ fontSize:'12px' }}>
                            {`${e.message}\n${e.stack}` ?? ''}
                        </code>
                    </pre>
                </div>
            </div>
        </>
    )
}