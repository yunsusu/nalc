import React, { useEffect, useState } from "react";
import * as S from "./styled.ts";
import Data from "../../components/Nalc/Data/index.tsx";
import { fetchWeather } from "../../lib/Weather/index.ts";
import { getLocation } from "../../lib/utils/geo.ts";
import { getPlaceNameByOSM } from "../../lib/maps/index.ts";
import { useNavigate } from "react-router-dom";

function A() {
  const time = [
    "0000",
    "0100",
    "0200",
    "0300",
    "0400",
    "0500",
    "0600",
    "0700",
    "0800",
    "0900",
    "1000",
    "1100",
    "1200",
    "1300",
    "1400",
    "1500",
    "1600",
    "1700",
    "1800",
    "1900",
    "2000",
    "2100",
    "2200",
    "2300",
    "2400",
  ];

  const [date, setDate] = useState<String>();
  const [place, setPlace] = useState();
  const navi = useNavigate();

  const back = () => {
    navi("/");
  };

  return (
    <>
      <S.Wrap>
        <S.Inner>
          <S.Back onClick={back}>뒤로가기</S.Back>
          <S.Title>{place ? `${place}의 날씨` : "위치를 불러오는 중..."}</S.Title>
          <S.Time>기준 날짜 : {date}</S.Time>
        </S.Inner>
        <S.GMap>
          {time.map((item, index) => (
            <Nalc item={item} key={index} setPlace={setPlace} date={date} setDate={setDate} />
          ))}
        </S.GMap>
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
  }, [date, item, key, setDate, xy]);

  return (
    <div>
      <S.Time>기준 시간 : {item}</S.Time>
      {xy === undefined ? <S.Loading>...Loading</S.Loading> : <Data weather={weather} />}
    </div>
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
