import styled from "styled-components";
import Sky from "../../assets/img/sky.webp";
import Main from "../../assets/img/main_bg.jpeg";

export const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f4fff5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem;
  background-image: url(${Main});
  background-size: cover;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: 120rem;
  height: 100%;
  border-radius: 10px;
  padding: 2rem 3rem;
  background-color: rgba(255, 255, 255, 0.4);
  & h1 {
    font-size: 3rem;
    margin-bottom: 5rem;
  }
`;

export const CardWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export const Card = styled.a`
  width: 49%;
  height: 16rem;
  padding: 1rem;
  position: relative;
  display: block;
  border-radius: 12px;
  background-image: url(${Sky});
  /* background-position: center; */
  background-size: cover;
  & p {
    font-size: 5rem;
    color: darkblue;
  }
`;

export const Sub = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`;
