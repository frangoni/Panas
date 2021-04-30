import styled from "styled-components";

const GlassCard = styled.div`
  width: min-content;
  border-radius: 60px;
  box-shadow: inset -10px -10px 15px rgba(40, 44, 52, 0.7), inset 10px 10px 15px rgba(255, 255, 255, 0.17);
  margin: 10vh auto;
  backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.2);
  @media (max-width: 1200px) {
    margin: 1vh auto;
  }
`;

export default GlassCard;
