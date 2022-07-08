import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.main`
    max-width: 1200px;
    margin: 0 auto;
`
export const LevelWrap = styled.section`
    display:flex;
    padding: 10px 20px;
    flex-direction: row;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    gap: 20px;
    width: 100%;
`
export const Level = styled.div`
    padding: 60px 60px;
    height: 300px;
    display: flex;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    flex: 1 0 0;
    justify-content: center;
    align-items: center;
    background-color: ${colors.accent}F1;
`

export const Header = styled.div`
    display: flex;
    background-color: ${colors.primary};
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    width: 100%;
    padding: 10px 20px;
    flex-direction: column;
    margin-bottom: 30px;
`