/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState, VFC } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import axios, { AxiosError, AxiosResponse } from "axios";
import image from "../testimg.png"; // ここでパス指定して変数として利用する
import { getKey } from "../Utils/Utils";

type jsonComment = {
  name: string;
  email: string;

  item_id: string;
  item_name: string;
  item_rate: string;
  item_image_path: string;
  opposite_id: string;
};

type CalcResult = {
  item_rate: string;
};

type IErrorResponse = {
  message: string | undefined;
};

type Props = {
  pageId: string;

  // NOTE
  setUpdateCount: React.Dispatch<React.SetStateAction<number>>;

  /** 値変更時のイベント */
  // eslint-disable-next-line react/require-default-props
  IncrementupdateCount?: () => void;

  language: string | undefined;
  whichIs: string | undefined;
};

const Rating: React.FC<Props> = (props) => {
  const { pageId, setUpdateCount, IncrementupdateCount, language, whichIs } = props;

  // NOTE

  const navigate = useNavigate();

  const [jsonComments, setJsonComments] = useState<jsonComment[]>([]);

  useEffect(() => {
    axios
      .get<jsonComment[]>(`https://www.tierrating.com/api/ratingitem/?id=${pageId}&key=${getKey(8)}`)
      .then((res) => {
        setJsonComments(res.data);
      })
      .catch((e) => console.error("err"));
  }, [pageId]);

  /**
   * 第1引数が第2引数に勝利したと判断してAPIをキック（DB更新）
   * その後次の２件を取得して、ランダムに表示する。
   * ひとつ上のコンポーネントも逐次更新処理をかけてみたい
   * @param email 第1引数のコメント
   * @param name 第2引数のコメント
   */
  // eslint-disable-next-line camelcase
  const onClickButton = (itemId: string, oppositeId: string) => {
    // 第1引数を自身のid,第2引数を相手のidとしてAPIを叩くつもり

    console.log(itemId, oppositeId); // NOTE 検証

    axios
      .get<CalcResult[]>(
        `https://www.tierrating.com/api/calculating/?id=${itemId}&opposite=${oppositeId}&key=${getKey(8)}`
      )
      .then((res) => {
        // NOTE 検証用
        console.log(res.data);
      })
      .catch((e) =>
        // エラー処理
        console.error("err")
      );

    IncrementupdateCount?.();

    // navigate(`/pages/${pageId}/`);
  };

  return (
    <div style={{ border: "dotted 5Px pink" }}>
      <h1>This is Rating</h1>
      <p>
        {language === "ja"
          ? `どっちが${whichIs} ？`
          : language === "en"
          ? `Which is ${whichIs} ?`
          : "unknown Langage is Selected"}
      </p>
      {jsonComments
        .filter((_, index) => index <= 1)
        .map((row) => (
          <button
            key={`${row.item_id}-${row.opposite_id}`}
            type="button"
            // 第一引数に自身のID,第２引数に相手のID
            onClick={() => onClickButton(row.item_id, row.opposite_id)}
          >
            <img
              src={`https://www.tierrating.com/create${row.item_image_path.slice(1)}`}
              alt={`${row.item_name}`}
              width={60}
            />
          </button>
        ))}
    </div>
  );
};

export default Rating;
