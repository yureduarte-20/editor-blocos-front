import { ImgWrapper, QuestionWraper, ButtonWrapper, ButtonPrimary, ButtonSecondary, Question } from "./styled"
import CSS from 'csstype'
import judge from '../../assets/judge.svg'
export interface IQuestionProps {
    question: {
        title: string;
        description: string;
    }
    onButtonRunPressed?(): void;
    onGoForward?(): void;
    wrapperStyle?: CSS.Properties;
    test?(): void;
}
export const BoxQuestion = ({ question, onButtonRunPressed, onGoForward, wrapperStyle, test }: IQuestionProps) => {
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
                {onButtonRunPressed &&
                    <ButtonPrimary onClick={onButtonRunPressed}>
                        Volte!
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