/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, Fragment, useEffect, useState, VFC } from "react";
import { Link, useParams } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import "../App.css";
import image from "../testimg.png"; // ここでパス指定して変数として利用する
import Rating from "../rating/Rating";
import { getKey } from "../Utils/Utils";

import { TierTable } from "../tier-table/TierTable";
// import { color } from "@mui/system";

export type jsonComment = {
  item_id: number;
  item_name: string;
  item_rate: number;
  item_image_path: string;
};

type IErrorResponse = {
  message: string;
};

const Pages: FC = () => {
  const { pageId } = useParams();

  const [jsonComments, setJsonComments] = useState<jsonComment[]>([]);
  // NOTE
  const [updateCount, setUpdateCount] = useState(0);

  /** 子コンポーネントに渡す変更イベント */
  const IncrementupdateCount = () => {
    console.log(updateCount);
    setUpdateCount((prev) => prev + 1);
  };

  // const handleUpdateCount = setUpdateCount((prev) => prev + 1);

  // const handleUpdateCount = React.useCallback(() => {
  //   // const handleUpdateCount = React.useEffect(() => {
  //   // console.log("登録コンテンツの変更イベント", value); // NOTE 検証用

  //   console.log(updateCount);
  //   setUpdateCount((prev) => prev + 1);
  // }, [setUpdateCount]);

  useEffect(() => {
    axios
      .get<jsonComment[]>(`https://www.tierrating.com/api/itemlist/?id=${pageId}&key=${getKey(8)}}`)
      .then((res) => {
        // NOTE 検証用
        console.log(res.data);

        setJsonComments(res.data);
      })
      .catch((e) => console.error("err"));
  }, [pageId, updateCount]);

  return (
    <div style={{ border: "dotted 5Px cyan" }} key={updateCount}>
      <h1>This is Pages</h1>
      {/* NOTE setUpdateCountを渡す */}
      <Rating
        pageId={pageId || ""}
        setUpdateCount={setUpdateCount}
        IncrementupdateCount={IncrementupdateCount} // NOTE 子にState更新関数を投げる？
        // key={updateCount} // NOTE 再レンダリングを走らせるためにkeyとしてupdateCountを投げる（使うわけではない）
      />
      <p>pageIdは{pageId} です。</p>
      <Link to="/" />
      <TierTable tierItemList={jsonComments} />

      <span>このページをベースに新しいページを作る</span>
    </div>
  );
};

export default Pages;
