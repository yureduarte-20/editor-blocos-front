import styled from "styled-components";
import colors from "../../styles/colors";
export interface IButtonStyleProps {
    padding? : string;
    margin? : string;
    width?: string;
    alignSelf?: 'center' | 'start' | 'end' | 'flex-end' | 'flex-start' | 'stretch' | 'baseline';
    justifySelf?: 'center' | 'start' | 'end' | 'flex-end' | 'flex-start' ; 
    color? : string;
    backgroundColor?: string;
}

export default  styled.button<IButtonStyleProps>`
    border: none;
    border-radius: 4px;
    padding: ${ props => props.padding ? (props.padding ) :'10px 20px' };
    margin: ${props => props.margin ? props.margin : 'initial'};
    background-color: ${ props => props.backgroundColor ? props.backgroundColor : colors.accent};
    color: ${ props => props.color ? props.color : colors.primary} ;
    cursor: pointer;
    width: ${props => props.width ? props.width : 'initial'};
    align-self: ${props => props.alignSelf ? props.alignSelf : 'initial'};
    justify-self: ${props => props.justifySelf ? props.justifySelf : 'initial'};
`