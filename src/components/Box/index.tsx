import React from "react";
import * as S from "./styled.ts";
import PropTypes from "prop-types";

export const Box = ({ size, text }) => {
  return <S.Wrap size={size}>{text}</S.Wrap>;
};

Box.prototype = {
  size: PropTypes.oneOf(["s", "m", "l"]),
  text: PropTypes.string,
};

Box.defaultProps = {
  size: "s",
};
