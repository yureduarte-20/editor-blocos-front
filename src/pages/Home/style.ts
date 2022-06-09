import styled from 'styled-components';
import colors from '../../styles/colors';
export interface IThProps {
    width?: string;
    textAlign: string;
}
export interface ITable {
    width?: string;
}

export const AccordionWrap = styled.section`
    grid-column: 2;
    align-self: center;
`

export const HomeContainer = styled.main`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 10px 0px;
    gap: 10px;
`

export const Header = styled.div`
    display: flex;
    background-color: ${colors.primary};
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    width: 100%;
    padding: 10px 20px;
    flex-direction: column;

`
export const TableWrap = styled.div`
    background-color: ${colors.primary};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    width: 100%;
    padding: 10px 20px;
`

export const Table = styled.table<ITable>`
    width:100%;
    padding: 10px;
    border-collapse: collapse;
`
export const Thead = styled.thead `
    background-color: ${colors.secundary};
    padding: 10px 20px;
    `
export const Tr = styled.tr `
    cursor: pointer;
    border-bottom: 1px solid  ${colors.primary_input_background};
    &:nth-child(even){
        background-color: ${colors.primary_input_background};
    }
`
export const Th = styled.th<IThProps>`
    width: ${props => props.width };
    margin-left: 0;
    margin-right: 0;
    text-align: ${props => props.textAlign};
    padding: 10px 20px;
`

export const TBody = styled.tbody`
    
`
export const Td = styled.td`
    padding:10px 20px;
`