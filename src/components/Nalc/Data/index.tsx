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
  if (!weather) return <S.Category>error!</S.Category>;

  return (
    <S.Wrap sr={weather[0].category === "PTY" ? weather[0].obsrValue : null}>
      {weather.map((item, index) => (
        <>
          <S.Card key={index}>
            <S.Category>{renderCategory(item)}</S.Category>
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
      return `강수량 : ${item.obsrValue}%`;
    case "REH":
      return `습도 : ${item.obsrValue}%`;
    case "T1H":
      return `기온 : ${item.obsrValue}°C`;
    case "UUU":
      return `동서바람성분 : ${item.obsrValue}`;
    case "RN1":
      return `1시간 강수량 : ${item.obsrValue}%`;
    case "VVV":
      return `남북바람성분 : ${item.obsrValue}`;
    case "VEC":
      return `풍향 : ${item.obsrValue}`;
    case "WSD":
      return `풍속 : ${item.obsrValue}m/s`;
    default:
      return null;
  }
}
