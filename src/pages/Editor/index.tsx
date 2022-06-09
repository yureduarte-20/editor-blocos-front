import { useEffect, useState } from "react"
import { ChangeEvent } from 'react'
import { CustomBlocklyWorkpace } from "../../components/CustomBlocklyWorpace"
import { GeneratedCodeArea } from "../../components/GeneratedCode"
import { BoxQuestion } from "../../components/BoxQuestion"
import { useAuthenticateApi } from "../../utils/useApi";
import { Navigate, useLocation, useMatch, useNavigate, useParams } from "react-router-dom"
import { Store } from "react-notifications-component"
const Editor = () => {
    const [code, setCode] = useState('');
    const [issue, setIssue] = useState<any>(null)
    const navigate = useNavigate()
    const authApi = useAuthenticateApi()
    const [xml, setXml] = useState('');
    const [language, setLanguage] = useState('javascript');
    const params = useParams();
    const location : any = useLocation();
    const [isLoading, setLoading] = useState(false);
    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setLanguage(e.target.value)
    }
    console.log(params)
    useEffect(() => {
        (async () => {
            try {
                let response = await authApi.get(`/issues/${params.id}`);
                setIssue(response.data);
            } catch (e: any) {

            }
        })()
    }, [])
    
    const submit = async () =>{
        try{
            setLoading(true)
            console.log(params.id)
            let response = await authApi.post(`/submission`, { blocksXml: xml, issueId: Number(params.id)})
            Store.addNotification({
                title:'Enviado',
                message:'Seu código foi submetido com sucesso',
                type:'success',
                container:'top-center',
                dismiss:{
                    duration:300
                }
            })
            navigate(`/submissoes/${response.data.id}`)
                //openSuccess("Enviado 😀")
             
        } catch(e : any){
            //openWarning(e.response.data.error.message)
            console.log(e.response)
             /* if(e.response.data.error.name =="presentation_error"){
            }
            if(e.response.data.error.name =="compilation_error"){
                openSnackBarFailed(e.response.data.error.message)
            }
            if(e.response.status === 422){
                openSnackBarFailed(e.response.data.error.message)
            } */
        } finally{
            setLoading(false)
        }
    }

    const handleExec = () => {
        try {
            eval(code);
        } catch (error: any) {
            console.log(error)
            //erro quando algo não for inicializado
            //esse regex analisa a expressão inteira, no lugar desse undefeined poderia ter outro regex (outro caso seria null) mas o blokly protege entao fds
            //o regex captura a função que deu ruim
            let regex = new RegExp("(?<=Cannot read properties of undefined \\(reading )'([\\(A-Za-z_0-9]+)'", "g");
            if (error.message.match(regex) != null) {
                //diz "algo" porque nao tem como saber oque foi
                alert("Opa, parece que você não inicializou algo e esta tentando usar a função " + error.message.match(regex)[0]
                    + "\nRevise e veja se suas váriaveis foram iniciadas antes de serem usadas :D\n" + error.message);
                return;
            }
            //erro quando  algum metodo não pode ser executado por causa do tipo da variavel (dado ao conteudo)
            //esse regex analisa 80% da expressão no caso apartir do metodo que nao pode ser utilizado mais "is not a function" (.charAt() is not a function)
            // o regex captura a a função que deu ruim tbm, mas no caso a gente tem acesso a variavel que deu ruim tbm
            regex = new RegExp("[a-zA-z0-9_]+\\s(?=is not a function)", "g");
            if (error.message.match(regex) != null) {

                alert(                                      //pegando função que deu ruim
                    "Opa, parece que você tentou usar a função '" + error.message.match(regex)[0].trim()
                    //estraindo a variavel ou objeto que deu ruim fazendo um replace FODA
                    + "' que não é compativel com o tipo do objeto '" + (error.message.replace(("." + error.message.match(regex)[0].trim() + " is not a function"), ""))
                    + "'\nRevise e veja como suas variaveis estão sendo usadas :D\n" + error.message);
                return;
            }
        }

    }
    return (
        <>
            <BoxQuestion
                question={{ title: issue?.title ?? 'Olá mundo !', description: issue?.description ?? 'Imprima na tela o famoso "olá mundo!"' }}
                onButtonRunPressed={submit}
                test={handleExec}
                isSubmitting={isLoading}
                />
            <CustomBlocklyWorkpace onXmlChange={(nxml) =>setXml(nxml)} code={code} language={language}
             initialXml={location.state?.params?.blocksXml ?? ''} onCodeChange={setCode}>
                <GeneratedCodeArea
                    language={language}
                    code={code}
                    style={{ background: 'transparent' }}
                    onLanguageChange={handleLanguageChange} />
            </CustomBlocklyWorkpace>
        </>
    )
}

export default Editor;