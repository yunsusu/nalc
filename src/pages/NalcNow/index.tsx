import React, { useEffect, useState } from "react";
import * as S from "./styled.ts";
import Data from "../../components/Nalc/Data/index.tsx";
import { fetchWeather } from "../../lib/Weather/index.ts";
import { getLocation } from "../../lib/utils/geo.ts";
import { getPlaceNameByOSM, getPlace } from "../../lib/maps/index.ts";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  place: string;
};

function NalcNow() {
  const [weather, setWeather] = useState<any>();
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();
  const [xy, setXy] = useState<{ x: number; y: number } | undefined>();
  const [place, setPlace] = useState<string>();
  const navi = useNavigate();
  const key = process.env.REACT_APP_KEY;
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    searchAdress(data);
  };
  const searchAdress = async (data) => {
    try {
      const box = await getPlace(data.place);
      setXy(box);
    } catch (error) {
      console.error("Failed to get location:", error);
    }
  };

  const fetchLocationAndProcess = async () => {
    try {
      const box = await getLocation();
      setXy(box[0]);
    } catch (error) {
      console.error("Failed to get location:", error);
    }
  };

  const fetchPlaceName = async () => {
    if (xy) {
      const name = await getPlaceNameByOSM(xy.x, xy.y);
      setPlace(name);
    }
  };

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

  useEffect(() => {
    fetchLocationAndProcess();
  }, []);

  useEffect(() => {
    fetchPlaceName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xy]);

  const back = () => {
    navi("/");
  };

  useEffect(() => {
    setDate(setDayYMD());
    setTime(new Date().getHours() + "00");

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, key, time, xy]);

  return (
    <S.Wrap>
      <S.Inner>
        <S.Back onClick={back}>뒤로가기</S.Back>
        <S.Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.Input defaultValue={place} {...register("place")} />
            <S.Btn type="submit">🔍</S.Btn>
          </form>
          의 날씨
        </S.Title>
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
