import React, { useEffect, useState } from "react";
import * as S from "./styled.ts";
import Data from "../../components/Nalc/Data/index.tsx";
import { fetchWeather } from "../../lib/Weather/index.ts";
import { getLocation } from "../../lib/utils/geo.ts";
import { getPlaceNameByOSM } from "../../lib/maps/index.ts";
import { useNavigate } from "react-router-dom";

function NalcNow() {
  const [weather, setWeather] = useState<any>(); // 오타 수정 (setWearher -> setWeather)
  const [date] = useState<string>(setDayYMD()); // 날짜 상태 직접 관리
  const [time] = useState<string>(new Date().getHours() + "00");
  const [xy, setXy] = useState<{ x: number; y: number } | undefined>(); // 초기값 명확화
  const [place, setPlace] = useState<string>();
  const navi = useNavigate();
  const key = process.env.REACT_APP_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeather(key, date, time, xy);
      setWeather(data.data.response.body.items.item);
    };
    if (xy) {
      // xy가 정의되었을 때만 fetchData 호출
      fetchData();
    }
  }, [date, time, xy]);

  useEffect(() => {
    const fetchLocationAndProcess = async () => {
      try {
        const box = await getLocation();
        setXy(box[0]); // 객체 구조 확인 필요
      } catch (error) {
        console.error("Failed to get location:", error);
      }
    };

    fetchLocationAndProcess();
  }, []);

  useEffect(() => {
    if (xy) {
      // xy 확인
      getPlaceNameByOSM(xy.x, xy.y).then(setPlace); // 비동기 결과를 setPlace에 직접 연결
    }
  }, [xy]); // xy 객체 자체를 의존성으로 사용

  const back = () => {
    navi(-1);
  };

  return (
    <S.Wrap>
      <S.Back onClick={back}>뒤로가기</S.Back>
      <S.Title>{place}의 날씨</S.Title>
      <S.Time>
        기준 날짜 : {date} / 기준 시간 : {time}
      </S.Time>
      {xy === undefined ? <S.Loading>...Loading</S.Loading> : <Data weather={weather} />}
    </S.Wrap>
  );
}

export default NalcNow;

function setDayYMD() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}
