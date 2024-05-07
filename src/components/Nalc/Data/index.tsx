import React from "react";
import * as S from "./styled.ts";

interface DataProps {
  weather?: any[];
}

interface WeatherItem {
  baseDate: string;
  category: string;
}

function Data({ weather }: DataProps) {
  if (!weather) return null; // 데이터가 없을 경우 아무것도 렌더링하지 않음

  return (
    <S.Wrap>
      {weather.map((item, index) => (
        <>
          <S.Card key={index}>
            <S.Category>
              {renderCategory(item)} {item.obsrValue}
            </S.Category>
          </S.Card>
        </>
      ))}
    </S.Wrap>
  );
}

export default Data;

function renderCategory(item: WeatherItem) {
  switch (item.category) {
    case "PTY":
      return `강수량 (${item.category}): `;
    case "REH":
      return `습도 (${item.category}): `;
    case "T1H":
      return `기온 (${item.category}): `;
    case "UUU":
      return `동서바람성분 (${item.category}): `;
    case "RN1":
      return `1시간 강수량 (${item.category}): `;
    case "VVV":
      return `남북바람성분 (${item.category}): `;
    case "VEC":
      return `풍향 (${item.category}): `;
    case "WSD":
      return `풍속 (${item.category}): `;
    default:
      return null;
  }
}
