import axios from "axios";

const instanse = axios.create({
  baseURL: "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0",
});

export default instanse;
