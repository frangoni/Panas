import styled, { keyframes } from "styled-components";

export const GlassCard = styled.div`
  width: min-content;
  border-radius: 60px;
  box-shadow: inset -10px -10px 15px rgba(40, 44, 52, 0.7), inset 10px 10px 15px rgba(255, 255, 255, 0.17);
  margin: 10vh auto;
  backdrop-filter: blur(15px);
  background-color: rgba(81, 79, 76);
  @media (max-width: 1200px) {
    margin: 1vh auto;
  }
`;

const dash = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }`;

export const TransitionDiv = styled.div`
  animation: ${dash} 0.5s;
`;

export const Table = styled.table`
  background-color: rgba(81, 79, 76);
  border-radius: 25px;
  width: 80%;
  box-shadow: inset -10px -10px 15px rgba(40, 44, 52, 0.7), inset 10px 10px 15px rgba(255, 255, 255, 0.17);
  margin: 10vh auto;
  @media (max-width: 1200px) {
    margin: 1vh auto;
  }
`;
export const TableRow = styled.tr`
  text-align: center;
  color: white;
  &:nth-child(even) {
    background-color: rgba(113, 113, 113);
  }
  &:nth-last-child(1) {
    color: wheat;
    width: 185%;
    display: flex;
    justify-content: flex-end;
  }
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
`;
