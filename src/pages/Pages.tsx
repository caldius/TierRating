/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, Fragment, useEffect, useState, VFC } from "react";
import { Link, useParams } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import "../App.css";
import Rating from "../rating/Rating";
import { getKey } from "../Utils/Utils";

import { TierTable } from "../tier-table/TierTable";
// import { color } from "@mui/system";

export type itemInfoType = { item_id: number; item_name: string; item_rate: number; item_image_path: string };

export type pageInfoType = {
  page_id: number;
  page_name: string;
  page_description: string;
  which_is: string;
  language: string;
};

type IErrorResponse = {
  message: string;
};

const Pages: FC = () => {
  const { pageId } = useParams();

  const [itemInfoList, setItemInfoList] = useState<itemInfoType[]>([]);
  const [pageInfo, setPageInfo] = useState<pageInfoType>();
  // NOTE
  const [updateCount, setUpdateCount] = useState(0);

  /** 子コンポーネントに渡す変更イベント */
  const IncrementupdateCount = () => {
    console.log(updateCount);
    setUpdateCount((prev) => prev + 1);
  };

  useEffect(() => {
    axios
      .get<itemInfoType[]>(`https://www.tierrating.com/api/itemlist/?id=${pageId}&key=${getKey(8)}`)
      .then((res) => {
        // NOTE 検証用
        console.log(res.data);

        setItemInfoList(res.data);
      })
      .catch((e) => console.error("err"));
  }, [pageId, updateCount]);

  useEffect(() => {
    axios
      .get<pageInfoType>(`https://www.tierrating.com/api/pageinfo/?page_id=${pageId}&key=${getKey(8)}`)
      .then((res) => {
        // NOTE 検証用
        console.log(res.data);

        setPageInfo(res.data);
      })
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
