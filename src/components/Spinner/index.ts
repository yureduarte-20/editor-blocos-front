import styled, { keyframes } from "styled-components";
import colors from "../../styles/colors";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div<{ width?: string, height?:string }>`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  align-self: center;
  border: 6px solid #f3f3f3; /* Light grey */
  border-bottom: 4px solid #f3f3f3; /* Light grey */
  border-left: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid ${colors.accent}; /* Blue */
  width:${props => props.width ? props.width :'20px' };
  height: ${props => props.height ? props.height :'20px' };
  background: transparent;
  border-radius: 50%;
`;

export default Spinner;