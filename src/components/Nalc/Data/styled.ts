import styled from "styled-components";
import Weather from "../../../assets/img/weather.png";

export const Wrap = styled.div`
  width: 100%;
  max-width: 60rem;
  border: 2px solid black;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 3rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 5rem;
`;
export const Card = styled.div`
  /* width: 50%; */
  border-radius: 16px;
  padding: 2rem;
  background-image: url(${Weather});
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.2);
  background-blend-mode: multiply;
  font-size: 2rem;
`;
export const Category = styled.div`
  font-size: 2rem;
`;
