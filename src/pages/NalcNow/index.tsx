import React, { useEffect, useState } from "react";
import * as S from "./styled.ts";
import Data from "../../components/Nalc/Data/index.tsx";
import { fetchWeather } from "../../lib/Weather/index.ts";
import { getLocation } from "../../lib/utils/geo.ts";
import { getPlaceNameByOSM } from "../../lib/maps/index.ts";
import { useNavigate } from "react-router-dom";

function NalcNow() {
  const [weather, setWeather] = useState<any>();
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();
  const [xy, setXy] = useState<{ x: number; y: number } | undefined>();
  const [place, setPlace] = useState<string>();
  const navi = useNavigate();
  const key = process.env.REACT_APP_KEY;

  useEffect(() => {
    const fetchLocationAndProcess = async () => {
      try {
        const box = await getLocation();
        setXy(box[0]);
      } catch (error) {
        console.error("Failed to get location:", error);
      }
    };

    fetchLocationAndProcess();
  }, []);

  useEffect(() => {
    if (xy) {
      getPlaceNameByOSM(xy.x, xy.y).then(setPlace);
    }
  }, [xy]);

  const back = () => {
    navi(-1);
  };
  useEffect(() => {
    setDate(setDayYMD());
    setTime(new Date().getHours() + "00");

    const fetchData = async () => {
      if (date && time && xy) {
        const data = await fetchWeather(key, date, time, xy);
        if (data?.data?.response?.body?.items?.item) {
          setWeather(data.data.response.body.items.item);
        } else {
          console.error("Invalid data structure:", data);
        }
      }
    };

    fetchData();
  }, [date, key, time, xy]);

  return (
    <S.Wrap>
      <S.Inner>
        <S.Back onClick={back}>뒤로가기</S.Back>
        <S.Title>{place}의 날씨</S.Title>
        <S.Time>
          기준 날짜 : {date} / 기준 시간 : {time}
        </S.Time>
      </S.Inner>
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
