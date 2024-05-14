import styled from "styled-components";

const getTransform = (size: string) => {
  switch (size) {
    case "l":
      return "width : 200px;height:200px;line-height:200px;";
    case "m":
      return "width:150px;height:150px;line-height:150px;";
    case "s":
      return "width:100px;height:100px;line-height:100px;";
    default:
      return "none";
  }
};

export const Wrap = styled.div`
  background-color: pink;
  text-align: center;
  ${(props) => getTransform(props.size)};
`;
