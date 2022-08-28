import { Typography } from "@material-ui/core";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./App.css";
// import BalanceTwoToneIcon from "@mui/icons-material/BalanceTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import { MenuBookTwoTone } from "@mui/icons-material";
// import image from "./testimg.png"; // ここでパス指定して変数として利用する
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";

const Header: FC = () => {
  const iconStyle: React.CSSProperties = { verticalAlign: "middle", display: "inline-flex" };

  return (
    <div style={{ backgroundColor: "#9F9" }}>
      <h1 style={{ margin: "0" }}>AnyRating.com</h1>
      <br />
      {/* TODO:styleごちゃごちゃ書くかリンクアイテムみたいなものを設定して並べたいかなあ？ */}
      <Link to="/" style={{ paddingLeft: "1%" }}>
        <Typography noWrap display="inline">
          <HomeTwoToneIcon style={iconStyle} />
          Home
        </Typography>
      </Link>
      <Link to="/list" style={{ paddingLeft: "1%" }}>
        <Typography noWrap display="inline">
          <MenuBookTwoTone style={iconStyle} />
          List
        </Typography>
      </Link>
      <Link to="/new" style={{ paddingLeft: "1%" }}>
        <Typography noWrap display="inline">
          {/* TODOアイコン画像を新規作成っぽいものに変える */}
          <CreateTwoToneIcon style={iconStyle} />
          Create New
        </Typography>
      </Link>
      <Link to="/about" style={{ float: "right", paddingRight: "1%" }}>
        <Typography noWrap display="inline">
          <InfoTwoToneIcon style={iconStyle} />
          About
        </Typography>
      </Link>
    </div>
  );
};
export default Header;
