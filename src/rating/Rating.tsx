/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState, VFC } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { Button } from "@mui/material";
import { Paper } from "@material-ui/core";
import { getKey, l } from "../Utils/Utils";
import { siteUrl } from "../Utils/Defines";

type jsonComment = {
  name: string;
  email: string;

  item_id: string;
  item_name: string;
  item_rate: string;
  item_image_path: string;
  opposite_id: string;
};

type CalcResult = { item_rate: string };

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

  const isEN = language === "en";
  const isJA = language === "ja";

  // NOTE

  // const navigate = useNavigate();

  const [jsonComments, setJsonComments] = useState<jsonComment[]>([]);

  useEffect(() => {
    axios
      .get<jsonComment[]>(`${siteUrl}/api/ratingitem/?id=${pageId}&key=${getKey(8)}`)
      .then((res) => setJsonComments(res.data))
      .catch((e) => console.error("err"));
  }, [pageId]);

  /**
   * 第1引数が第2引数に勝利したと判断してAPIをキック（DB更新）
   * その後次の２件を取得して、ランダムに表示する。
   * ひとつ上のコンポーネントも逐次更新処理をかけてみたい
   * @param itemId 勝ちアイテムのID
   * @param oppositeId 負けアイテムのID
   */
  // eslint-disable-next-line camelcase
  const onClickButton = (itemId: string, oppositeId: string) => {
    // 第1引数を自身のid,第2引数を相手のidとしてAPIを叩くつもり

    if (itemId && oppositeId) {
      l(itemId, oppositeId, pageId); // NOTE 検証

      axios
        .get<CalcResult[]>(
          `${siteUrl}/api/calculating/?id=${itemId}&opposite=${oppositeId}&page_id=${pageId}&key=${getKey(8)}`
        )
        .then((res) => l(res.data)) // 検証用
        .catch((e) => console.error("err")); // エラー処理
    }

    IncrementupdateCount?.();
  };

  return (
    <Paper elevation={3} style={{ margin: "4%", padding: "2%", textAlign: "center" }}>
      <p>{isJA ? `どっちが${whichIs} ？` : isEN ? `Which is ${whichIs} ?` : "unknown Langage is Selected"}</p>
      {jsonComments
        .filter((_, index) => index <= 1)
        .map((row) => (
          <Button
            variant="outlined"
            key={`${row.item_id}-${row.opposite_id}`}
            type="button"
            // 第一引数に自身のID,第２引数に相手のID
            onClick={() => onClickButton(row.item_id, row.opposite_id)}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img src={`${row.item_image_path}`} alt={`${row.item_name}`} width={100} />
              <p>{row.item_name}</p>
            </div>
          </Button>
        ))}
      <div>
        <Button
          size="small"
          variant="outlined"
          type="button"
          onClick={() => onClickButton("", "")}
          style={{ width: "200px" }}
        >
          <p>{isJA ? `パス` : isEN ? `パス` : "unknown Langage is Selected"}</p>
        </Button>
      </div>
    </Paper>
  );
};

export default Rating;
