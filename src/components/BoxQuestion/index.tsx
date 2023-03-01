import { ImgWrapper, QuestionWraper, ButtonWrapper, ButtonPrimary, ButtonSecondary, Question } from "./styled"
import CSS from 'csstype'
import judge from '../../assets/judge.svg'
import Spinner from "../Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuthenticateApi } from "../../utils/useApi";
import { Store } from "react-notifications-component";
export interface IQuestionProps {
    question: {
        title: string;
        description?: string;
    }
    onButtonRunPressed?(): void;
    onGoForward?(): void;
    wrapperStyle?: CSS.Properties;
    test?(): void;
    isSubmitting: boolean
    onDetailsClick?(): void;
    handleCreateNewDoubt?(): void
}
export const BoxQuestion = ({ question, onButtonRunPressed, onGoForward, wrapperStyle, test, isSubmitting, onDetailsClick, handleCreateNewDoubt }: IQuestionProps) => {


    return (
        <QuestionWraper style={wrapperStyle || {}}>
            <ImgWrapper>
                <img src={judge} />
            </ImgWrapper>
            <Question>
                <h2><strong>{question.title}</strong></h2>
                <a style={{ display: 'block', cursor: 'pointer' }}
                    className="font-1-md orange"
                    onClick={e => onDetailsClick && onDetailsClick()}>Detalhes</a>
                <p>Você pode solicitar ajuda com um orientador<a className="blue" onClick={e => handleCreateNewDoubt && handleCreateNewDoubt()}
                    style={{ cursor: 'pointer' }}> clicando aqui</a></p>
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
                        justifyContent: 'center'
                    }}>
                        <Spinner />
                    </ButtonPrimary>
                }
                {onGoForward &&
                    <ButtonSecondary onClick={onGoForward}>
                        Vai pra frente
                    </ButtonSecondary>
                }

                {test && <ButtonSecondary onClick={test}>Testar</ButtonSecondary>}
            </ButtonWrapper>
        </QuestionWraper>
    )
}