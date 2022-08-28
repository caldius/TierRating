/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, Fragment, useEffect, useState, VFC } from "react";
import { Link, useParams } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import "../App.css";
import Rating from "../rating/Rating";
import { average, getKey, l, standardScore, stdDev } from "../Utils/Utils";

import { TierTable } from "../tier-table/TierTable";
import { siteUrl } from "../Utils/Defines";
// import { color } from "@mui/system";

export type itemInfoType = {
  item_id: number;
  item_name: string;
  item_rate: number;
  item_hensachi: number;
  item_image_path: string;
};

export type pageInfoType = {
  page_id: number;
  page_name: string;
  page_description: string;
  which_is: string;
  language: string;
};

type IErrorResponse = { message: string };

const Pages: FC = () => {
  const { pageId } = useParams();

  const [itemInfoList, setItemInfoList] = useState<itemInfoType[]>([]);
  const [pageInfo, setPageInfo] = useState<pageInfoType>();
  // NOTE
  const [updateCount, setUpdateCount] = useState(0);

  /** 子コンポーネントに渡す変更イベント */
  const IncrementupdateCount = () => setUpdateCount((prev) => prev + 1);
  useEffect(() => {
    axios
      .get<itemInfoType[]>(`${siteUrl}/api/itemlist/?id=${pageId}&key=${getKey(8)}`)
      .then((res) => {
        // NOTE 検証用
        l(res.data);

        const rateArray: number[] = res.data.map((x) => x.item_rate);
        const avg = average(rateArray);
        const sd = stdDev(rateArray, avg);

        const hensachiArray: number[] = rateArray.map((x) => standardScore(x, avg, sd));

        const itemInfoWithHensachi: itemInfoType[] = res.data.map((x, i) => ({
          ...x,
          item_hensachi: hensachiArray[i],
        }));

        setItemInfoList(itemInfoWithHensachi);
      })
      .catch((e) => console.error("err"));
  }, [pageId, updateCount]);

  useEffect(() => {
    axios
      .get<pageInfoType>(`${siteUrl}/api/pageinfo/?page_id=${pageId}&key=${getKey(8)}`)
      .then((res) => setPageInfo(res.data))
      .catch((e) => console.error("err"));
  }, [pageId]);

  return (
    <div key={updateCount}>
      <h4>{pageInfo?.page_name}</h4>
      <p>{pageInfo?.page_description}</p>

      {/* NOTE setUpdateCountを渡す */}
      <Rating
        pageId={pageId || ""}
        setUpdateCount={setUpdateCount}
        IncrementupdateCount={IncrementupdateCount} // NOTE 子にState更新関数を投げる？
        language={pageInfo?.language}
        whichIs={pageInfo?.which_is}
      />
      <Link to="/" />
      <TierTable tierItemList={itemInfoList} />

      <span>このページをベースに新しいページを作る</span>
    </div>
  );
};

export default Pages;
