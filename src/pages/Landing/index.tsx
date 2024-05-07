import React from "react";
import * as S from "./styled.ts";

function Landing() {
  return (
    <S.Wrap>
      <S.Inner>
        <h1>nalc</h1>

        <S.CardWrap>
          <S.Card href="/nalc">
            <p>오늘날씨 전체</p>
            <S.Sub>더 알아보기</S.Sub>
          </S.Card>
          <S.Card href="/nalcnow">
            <p>지금날씨</p>
            <S.Sub>더 알아보기</S.Sub>
          </S.Card>
        </S.CardWrap>
      </S.Inner>
    </S.Wrap>
  );
}

export default Landing;
