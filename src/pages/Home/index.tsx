import { useState } from 'react'
import { Container, LogWrap } from './style'
import { GeneratedCodeArea } from '../../components/GeneratedCode';
import { CustomBlocklyWorkpace } from '../../components/CustomBlocklyWorpace';
import { Log } from '../../components/Log';

export function Home() {
    const [xml, setXml] = useState("");
    const [javascriptCode, setJavascriptCode] = useState("");
    const [consoleLog, setConsoleLog] = useState<string>("");
    const handleExec = () => {
        try {
            eval(javascriptCode);
            setConsoleLog(consoleLog + '\nTeste Concluído');
        } catch (error: any) {
          

            //erro quando algo não for inicializado
                //esse regex analisa a expressão inteira, no lugar desse undefeined poderia ter outro regex (outro caso seria null) mas o blokly protege entao fds
                //o regex captura a função que deu ruim
                let regex = new RegExp("(?<=Cannot read properties of undefined \\(reading )'([\\(A-Za-z_0-9]+)'", "g");
                if (error.message.match(regex) != null) {
                                                                //diz "algo" porque nao tem como saber oque foi
                    setConsoleLog("Opa, parece que você não inicializou algo e esta tentando usar a função " + error.message.match(regex)[0]
                        + "\nRevise e veja se suas váriaveis foram iniciadas antes de serem usadas :D\n"+error.message);
                    return;
                }
               //erro quando  algum metodo não pode ser executado por causa do tipo da variavel (dado ao conteudo)
               //esse regex analisa 80% da expressão no caso apartir do metodo que nao pode ser utilizado mais "is not a function" (.charAt() is not a function)
               // o regex captura a a função que deu ruim tbm, mas no caso a gente tem acesso a variavel que deu ruim tbm
                regex = new RegExp("[a-zA-z0-9_]+\\s(?=is not a function)", "g");
                if (error.message.match(regex) != null) {
                
                    setConsoleLog(                                      //pegando função que deu ruim
                       "Opa, parece que você tentou usar a função '" + error.message.match(regex)[0].trim()
                                                                                //estraindo a variavel ou objeto que deu ruim fazendo um replace FODA
                        + "' que não é compativel com o tipo do objeto '" + ( error.message.replace(("."+ error.message.match(regex)[0].trim()+" is not a function"),"")  )
                      +   "'\nRevise e veja como suas variaveis estão sendo usadas :D\n"+error.message);
                    return;
                }
            }
          
        }
    
    return (
        <Container>
                    
        </Container>
    )

}