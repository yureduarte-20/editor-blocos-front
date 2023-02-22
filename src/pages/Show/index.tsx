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
import WrongAnswer from "./WrongAnswer";
export interface ISubmission {
    id: number | string;
    userId: number,
    problemId: number,
    status: string,
    blocksXml: string,
    error: string,
    successfulRate: number
}
interface ISubmissionResponse extends ISubmission {
    problem: {
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
    function selectPage(submission?: ISubmission) {
        switch (submission?.status) {
            case SubmissionStatus.ACCEPTED: return <Success />
            case SubmissionStatus.PRESENTATION_ERROR: return <PresentationError />
            case SubmissionStatus.RUNTIME_ERROR: return <RuntimeError errorLog={submission.error} />
            case SubmissionStatus.PENDING: return <Waiting />
            case SubmissionStatus.WRONG_ANSWER: return <WrongAnswer successfulRate={submission.successfulRate} />
            default: return <Waiting />
        }
    }
    const getData = async () => {
        let tryAgain = true;
        while (tryAgain) {
            try {
                clearTimeout();
                const response = await api.get(`submissions/${params.id}?filter=${JSON.stringify({
                    include: [
                        {
                            relation: 'problem',
                            scope: {
                                fields: { id: true, title: true }
                            }
                        }
                    ]
                })}`);

                console.log(response.data)
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

                if (response.data.status != SubmissionStatus.PENDING) {
                    setSubmission(response.data);
                    tryAgain = false;
                    break;
                }
                await sleep(2000);
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
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }} className="font-1-xl white font-light">{submission && submission.problem.title}</h1>
                <Card padding="10px 20px 40px 20px" >
                    {
                        selectPage(submission)
                    }
                </Card>
            </Container>
        </Background>
    );
}

export default Show;