import styled, { keyframes } from 'styled-components';

export const GlassCard = styled.div`
  width: min-content;
  border-radius: 60px;
  box-shadow: inset -10px -10px 15px rgba(40, 44, 52, 0.7), inset 10px 10px 15px rgba(255, 255, 255, 0.17);
  margin: 10vh auto;
  background-color: rgba(81, 79, 76);
  @media (max-width: 1200px) {
    margin: 10vh auto;
  }
`;

const dash = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }`;

export const TransitionDiv = styled.div`
  animation: ${dash} 0.8s;
`;

const ease = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }`;

export const TransitionModal = styled.div`
  animation: ${ease} 0.5s;
`;

export const Table = styled.table`
  margin: 10vh auto;
  border-radius: 25px;
  width: 80%;
  box-shadow: inset -10px -10px 15px rgba(40, 44, 52, 0.7), inset 10px 10px 15px rgba(255, 255, 255, 0.17);
  background-color: rgba(81, 79, 76);
  @media (max-width: 1200px) {
    margin: 1vh auto;
  }
`;
export const TableRow = styled.tr`
  text-align: center;
  color: white;
`;

export const TableHeader = styled.th`
  font-size: large;
  font-weight: bold;
  padding: 0.8em;
  color: wheat;
`;
export const TableData = styled.td`
  font-size: larger;
  font-weight: bolder;
  width: 40%;
`;

export const Input = styled.input`
  background: transparent;
  color: white;
  font-size: larger;
  font-weight: bolder;
  border-bottom: 1px white thin;
  width: inherit;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: white;
    opacity: 0.6;
  }
`;

/* 
&:nth-child(even) {
  background-color: rgba(113, 113, 113);
} */

export const Picker = styled.div`
  border-radius: 0 0 60px 60px;
  box-shadow: inset -10px -10px 15px rgb(40 44 52 / 70%), inset 10px 10px 15px rgb(255 255 255 / 17%);
  background-color: rgba(81, 79, 76);
  position: fixed;
  display: flex;
  padding: 0 2% 0.5%;
  top: 0;
  animation: ${ease} 0.5s;
  & > * {
    margin: 10% 3% 3%;
  }
`;
