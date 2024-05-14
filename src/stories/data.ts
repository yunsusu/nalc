import styled from "styled-components";
import Sun from "../../../assets/img/sun.jpeg";
// import Rain from "../../../assets/img/rain.jpeg";
import Rain from "../../../assets/img/cloud.jpeg";

export const Wrap = styled.div`
  width: 100%;
  max-width: 60rem;
  max-height: 50rem;
  height: 100%;
  border: 2px solid gray;
  background-image: ${(props) => (props.sr ? `url(${Rain})` : `url(${Sun})`)};
  background-color: rgba(0, 0, 0, 0.2);
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  padding: 3rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  /* justify-content: center;
  flex-wrap: wrap; */
  gap: 0.5rem;
  margin-top: 3rem;
`;
export const Card = styled.div`
  /* width: 50%; */
  height: 100%;
  border-radius: 16px;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.8);
  /* background-color: gray; */
  font-size: 2rem;

  &:nth-child(1) {
    grid-column: 4/5;
    grid-row: 3/4;
  }
  &:nth-child(2) {
    grid-column: 4/5;
    grid-row: 1/2;
  }
  &:nth-child(3) {
    grid-column: 4/5;
    grid-row: 2/3;
    display: none;
  }
  &:nth-child(4) {
    grid-column: 1/4;
    grid-row: 1/4;
    min-width: 10rem;

    & div {
      @media all and (max-width: 768px) {
        font-size: 3.5rem;
      }
      font-size: 4rem;
    }
  }
  &:nth-child(5) {
    grid-column: 3/4;
    grid-row: 6/7;
    display: none;
  }
  &:nth-child(6) {
    grid-column: 2/3;
    grid-row: 4/5;
    display: none;
  }
  &:nth-child(7) {
    grid-column: 3/4;
    grid-row: 4/5;
    display: none;
  }
  &:nth-child(8) {
    grid-column: 4/5;
    grid-row: 2/3;
  }
`;
export const Category = styled.div`
  /* background-color: rgba(128, 128, 128, 0.5);
  border-radius: 12px; */
  /* padding: 5px; */
  font-size: 2.5rem;

  @media all and (max-width: 768px) {
    font-size: 2rem;
  }
`;
