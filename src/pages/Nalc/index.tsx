import React, { useEffect, useState } from "react";
import * as S from "./styled.ts";
import Data from "../../components/Nalc/Data/index.tsx";
import { fetchWeather } from "../../lib/Weather/index.ts";
import { getLocation } from "../../lib/utils/geo.ts";
import { getPlaceNameByOSM } from "../../lib/maps/index.ts";
import { useNavigate } from "react-router-dom";

function A() {
  const time = [`0600`, `0800`, `1000`, `1200`, `1400`, `1600`, `1800`, `2000`, `2200`];
  const [date, setDate] = useState<String>();
  const [place, setPlace] = useState();
  const navi = useNavigate();

  const back = () => {
    navi(-1);
  };

  return (
    <>
      <S.Wrap>
        <S.Inner>
          <S.Back onClick={back}>뒤로가기</S.Back>
          <S.Title>{place ? `${place}의 날씨` : "위치를 불러오는 중..."}</S.Title>
          <S.Time>기준 날짜 : {date}</S.Time>
        </S.Inner>
        {time.map((item, index) => (
          <Nalc item={item} key={index} setPlace={setPlace} date={date} setDate={setDate} />
        ))}
      </S.Wrap>
    </>
  );
}

function Nalc({ item, setPlace, date, setDate }) {
  const [weather, setWeather] = useState();
  const [xy, setXy] = useState();
  const key = process.env.REACT_APP_KEY;

  useEffect(() => {
    const fetchLocationAndProcess = async () => {
      try {
        const location = await getLocation();
        setXy(location[0]);
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
  }, [setPlace, xy]);

  useEffect(() => {
    setDate(setDayYMD());

    const fetchData = async () => {
      if (date && xy) {
        const data = await fetchWeather(key, date, item, xy);
        if (data?.data?.response?.body?.items?.item) {
          setWeather(data.data.response.body.items.item);
        } else {
          console.error("Invalid data structure:", data);
        }
      }
    };

    fetchData();
  }, [date, key, xy]);

  return (
    <>
      <S.Time>기준 시간 : {item}</S.Time>
      {xy === undefined ? <S.Loading>...Loading</S.Loading> : <Data weather={weather} />}
    </>
  );
}

export default A;

function setDayYMD() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}
