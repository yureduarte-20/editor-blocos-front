import { ImgWrapper, QuestionWraper, ButtonWrapper, ButtonPrimary, ButtonSecondary, Question } from "./styled"
import CSS from 'csstype'
import judge from '../../assets/judge.svg'
import Spinner from "../Spinner";
export interface IQuestionProps {
    question: {
        title: string;
        description: string;
    }
    onButtonRunPressed?(): void;
    onGoForward?(): void;
    wrapperStyle?: CSS.Properties;
    test?(): void;
    isSubmitting: boolean
}
export const BoxQuestion = ({ question, onButtonRunPressed, onGoForward, wrapperStyle, test, isSubmitting }: IQuestionProps) => {
    return (
        <QuestionWraper style={wrapperStyle || {}}>
            <ImgWrapper>
                <img src={judge} />
            </ImgWrapper>
            <Question>
                <h2><strong>{question.title}</strong></h2>
                <p>{question.description}</p>
            </Question>
            <ButtonWrapper>
                {onButtonRunPressed && !isSubmitting &&
                    <ButtonPrimary onClick={onButtonRunPressed}>
                        Enviar!
                    </ButtonPrimary>
                }
                {isSubmitting &&
                    <ButtonPrimary style={{
                        display: 'flex',
                        justifyContent:'center'
                    }}>
                        <Spinner />
                    </ButtonPrimary>
                }
                {onGoForward &&
                    <ButtonSecondary onClick={onGoForward}>
                        Vai pra frente
                    </ButtonSecondary>
                }
                {test &&
                    <ButtonSecondary onClick={test}>Testar</ButtonSecondary>
                }
            </ButtonWrapper>
        </QuestionWraper>
    )
}