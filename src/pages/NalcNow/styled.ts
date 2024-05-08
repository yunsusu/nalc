import styled from "styled-components";
import Sky from "../../assets/img/sky.webp";
// import Weather from "../../assets/img/weather2.avif";

export const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${Sky});
  background-color: rgba(122, 122, 122, 0.1);
  background-blend-mode: multiply;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem;
  flex-direction: column;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: rgba(222, 222, 222, 0.8);
  border-radius: 16px;
  padding: 5px;
`;
export const Title = styled.div`
  font-size: 3rem;
  @media all and (max-width: 768px) {
    font-size: 2rem;
  }
`;
export const Time = styled.div`
  font-size: 1.6rem;
  @media all and (max-width: 768px) {
    font-size: 1.4rem;
  }
`;
export const Loading = styled.div`
  font-size: 3rem;
  @media all and (max-width: 768px) {
    font-size: 2rem;
  }
`;
export const Back = styled.div`
  font-size: 2rem;
  @media all and (max-width: 768px) {
    font-size: 1.6rem;
  }
  cursor: pointer;
`;
