import styled from "styled-components";
import Sky from "../../assets/img/sky.webp";

export const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${Sky});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem;
  flex-direction: column;
  gap: 5px;
`;
export const Title = styled.div`
  font-size: 3rem;
`;
export const Time = styled.div`
  font-size: 1.6rem;
`;
export const Loading = styled.div`
  font-size: 3rem;
`;
export const Back = styled.div`
  font-size: 2rem;
  cursor: pointer;
`;
