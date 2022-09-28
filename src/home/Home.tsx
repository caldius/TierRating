import { Divider } from "@material-ui/core";
import React, { FC } from "react";
// import { Link } from "react-router-dom";
// import About from "../about/About";
import "../App.css";
import PageList from "../page-list/PageList";

// import image from "../testimg.png"; // ここでパス指定して変数として利用する

const Home: FC = () => (
  // <>
  //   <Link to="/">
  //     <h1>[Home]</h1>
  //   </Link>
  //   <Link to="/list">
  //     <h1>[List]</h1>
  //   </Link>
  //   <Link to="/about">
  //     <h1>[About]</h1>
  //   </Link>{" "}
  //   <Link to="/new">
  //     <h1>[Create New]</h1>
  //   </Link>
  // </>
  <>
    <h1>AnyRating.com</h1>
    <p>
      世に溢れる終わりのない強さ議論や人気ランキングなどに結論を出すことを目指して作ったサイトです。
      <br />
      <br />
      とりあえずは、
      <br />
      ・ゲームのキャラクター、アイテムの性能比較
      <br />
      ・創作作品の登場人物の強さ議論
      <br />
      などの助けに使うことを想定して作りましたが、使い方は自由です。
    </p>
    <Divider />
    <PageList />
  </>
);

export default Home;
