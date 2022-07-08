import { Card, Container } from "../../styles/global";
import { Background } from "./style";
import success from '../../assets/success.svg'
import { Link, useParams, useNavigate } from "react-router-dom";
import Success from "./Success";
import Waiting from "./Waiting";
import { useEffect, useState } from "react";
import { useAuthenticateApi } from "../../utils/useApi";
import { SubmissionStatus } from "../Home";
import PresentationError from "./PresentationError";
import { Store } from "react-notifications-component";
import RuntimeError from "./RuntimeError";
import Spinner from "../../components/Spinner";
export interface ISubmission {
    id: number | string;
    userId: number,
    issueId: number,
    code: string | null,
    status: string,
    languageId: number,
    blocksXml: string,
    error: string,
}
interface ISubmissionResponse extends ISubmission {
    issue: {
        id: number | string;
        title: string
    }
}
const Show = () => {
    const params = useParams();
    const api = useAuthenticateApi();
    const navigate = useNavigate()
    const [submission, setSubmission] = useState<ISubmissionResponse>();
    const [loading, setLoading] = useState(true);
    // ao desmontar o componente, limpe o interval
    useEffect(() => {
        (async () => {
            getData()
        })()
        return clearTimeout()
    }, [])
    const sleep = (ms: number) => {
        return new Promise((resolve, reject) => setTimeout(resolve, ms));
    };
    const getData = async () => {
        let tryAgain = true;
        while (tryAgain) {
            try {
                clearTimeout();
                const response = await api.get(`submissions?filter=${JSON.stringify({
                    where: { id: params?.id }, include: [
                        {
                            relation: 'issue',
                            scope: {
                                fields: { id: true, title: true }
                            }
                        }
                    ]
                })}`);

                console.log(response.data[0])
                if (response.data.length == 0) {
                    Store.addNotification({
                        container: 'top-center',
                        insert: 'bottom',
                        title: 'Hum, algo deu errado',
                        message: 'Não encontramos a submissão que você procurou',
                        type: 'info',
                        dismiss: {
                            duration: 3000,
                            onScreen: true
                        }
                    })
                    return navigate(`/`)
                }

                if (response.data[0].status != SubmissionStatus.PENDING) {
                    setSubmission(response.data[0]);
                    tryAgain = false;
                    break;
                }
                await sleep(5000);
            } catch (e: any) {
                console.log(e);
                tryAgain = false
                clearTimeout();
            } finally {
                if (loading)
                    setLoading(false)
            }
        }
    }
    if (loading)
        return (
            <Background>
                <Container >
                    <Card className="d-flex j-center " padding="10px 20px 40px 20px">
                        <Spinner width="40px" height="40px" />
                    </Card>
                </Container>
            </Background>
        )
    return (
        <Background>
            <Container >
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }} className="font-1-xl white font-light">{submission && submission.issue.title}</h1>
                <Card padding="10px 20px 40px 20px" >
                    {!submission ?
                        <Waiting />
                        : submission.status == SubmissionStatus.ACCEPTED ?
                            <Success />
                            : submission.status == SubmissionStatus.PRESENTATION_ERROR ?
                                <PresentationError />
                                : SubmissionStatus.RUNTIME_ERROR ?
                                    <RuntimeError errorLog={submission.error} />
                                    : <></>

                    }
                </Card>
            </Container>
        </Background>
    );
}

export default Show;