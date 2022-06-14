/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios, { AxiosError, AxiosResponse } from "axios";
// import image from "../testimg.png"; // ここでパス指定して変数として利用する

type jsonPost = {
  page_id: number;
  page_name: string;
  create_date: string;
  tag_name: string[];
  isDisp?: boolean;
};

type IErrorResponse = {
  message: string;
};

const List: FC = () => {
  const [jsonLists, setJsonLists] = useState<jsonPost[]>([]);

  useEffect(() => {
    axios
      // .get<jsonPost[]>("https://jsonplaceholder.typicode.com/posts")
      .get<jsonPost[]>(`https://www.tierrating.com/api/pagelist/?key=${Math.random().toString(36).slice(-8)}`)
      .then((res) => {
        // NOTE 検証用
        console.log(res.data);

        setJsonLists(res.data);
      })
      // .catch((e: AxiosError<IErrorResponse>) => console.error("err"));
      .catch(() => console.error("err"));
  }, []);

  type jsonTagName = {
    tag_name: string;
  };

  const [jsonTagName, setJsonTagName] = useState<jsonTagName[]>([]);

  useEffect(() => {
    axios
      .get<jsonTagName[]>(`https://www.tierrating.com/api/taglist/?key=${Math.random().toString(36).slice(-8)}`)
      .then((res) => {
        setJsonTagName(res.data);
      })
      .catch((e) => console.error("err"));
  }, []);

  /** コンボボックス変更時のイベント
   *  選択したタグを含んでいる行はisDisp=True それ以外はFalse
   */
  const onChangeTagCombo = (selectValue: string) => {
    setJsonLists(
      jsonLists.map((x) =>
        x.tag_name?.includes(selectValue) || selectValue === "" ? { ...x, isDisp: true } : { ...x, isDisp: false }
      )
    );
  };

  // 描画前にタグ一覧を取得結果から生成する
  // 1.tag_nameを全部取得して,2.flatにして、3.重複を除外してソート
  // TODO SQLから取ったほうが多分楽なのでそのうち直す
  //      ※そうしないとソート後に消滅するかも
  // const tagNameList: string[] = Array.from(
  //   new Set(
  //     jsonLists
  //       .filter((x) => x.tag_name !== undefined)
  //       .map((x) => x.tag_name)
  //       .flat()
  //       .sort()
  //   )
  // );

  // const tagNameList: string[] = jsonTagName;

  return (
    <>
      <h1>This is ListPage</h1>

      <select name="tags" onChange={(e) => onChangeTagCombo(e.target.value)}>
        <option> </option>
        {/* {tagNameList.map((x) => (
          <option>{x}</option>
        ))} */}
        {jsonTagName.map((x) => (
          <option key={x.tag_name}>{x.tag_name}</option>
        ))}
      </select>

      <ol>
        {/* isDispがFalseのものは表示しない ※初期値はundefinedは許可 */}
        {jsonLists
          .filter((x) => x.isDisp !== false)
          .map((row) => (
            <li key={row.page_id}>
              <Link to={`/pages/${row.page_id}`}>{row.page_name} </Link>
              {row.tag_name?.map((x) => (
                <span style={{ padding: 1, border: "dotted 3Px brown" }} key={x}>
                  {x}
                </span>
              ))}
            </li>
          ))}
      </ol>
    </>
  );
};

export default List;
