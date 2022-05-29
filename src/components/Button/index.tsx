import styled from "styled-components";
import colors from "../../styles/colors";
export interface IButtonStyleProps {
    padding? : string;
    margin? : string;
    width?: string;
    alignSelf?: 'center' | 'start' | 'end' | 'flex-end' | 'flex-start' | 'stretch' | 'baseline';
    justifySelf?: 'center' | 'start' | 'end' | 'flex-end' | 'flex-start' ; 

}

export default  styled.button<IButtonStyleProps>`
    border: none;
    padding: ${ props => props.padding ? (props.padding ) :'10px 20px' };
    margin: ${props => props.margin ? props.margin : 'initial'};
    background-color: ${colors.accent};
    color: ${colors.primary} ;
    cursor: pointer;
    width: ${props => props.width ? props.width : 'initial'};
    align-self: ${props => props.alignSelf ? props.alignSelf : 'initial'};
    justify-self: ${props => props.justifySelf ? props.justifySelf : 'initial'};
`