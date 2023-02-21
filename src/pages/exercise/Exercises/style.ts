import styled from "styled-components";
import { SubmissionStatus } from "../../Home";
import accepted from '../../../assets/accepted.svg'
import deny from '../../../assets/deny.svg'
export interface ISolvedProblemProps {
    status?: SubmissionStatus;
}
export const container = styled.main `
    max-width: 1200px;
    margin: 0 auto;
`
export const SolvedProblem = styled.span<ISolvedProblemProps> `
    display: flex; 
    align-items: center; 
    flex-direction:row;
    justify-content: space-between;
    &::after {
        content: '';
        width: 20px;
        height: 20px;
        background-image: url(${props => !props.status ? '' : props.status === SubmissionStatus.ACCEPTED ? accepted : props => props.status === SubmissionStatus.PENDING ? '' : deny });
        background-repeat: no-repeat;
        background-size: contain;
    }
`
