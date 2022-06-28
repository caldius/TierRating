import { Typography } from "@material-ui/core";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./App.css";
// import BalanceTwoToneIcon from "@mui/icons-material/BalanceTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import { MenuBookTwoTone } from "@mui/icons-material";
// import image from "./testimg.png"; // ここでパス指定して変数として利用する
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";

const Header: FC = () => {
  const iconStyle: React.CSSProperties = { verticalAlign: "middle", display: "inline-flex" };

  return (
    <div style={{ border: "dotted 5Px lime" }}>
      <h1>TierRating.com</h1>
      {/* TODO:styleごちゃごちゃ書くかリンクアイテムみたいなものを設定して並べたいかなあ？ */}
      <Link to="/">
        <Typography noWrap display="inline">
          <HomeTwoToneIcon style={iconStyle} />
          Home
        </Typography>
      </Link>
      <Link to="/list">
        <Typography noWrap display="inline">
          <MenuBookTwoTone style={iconStyle} />
          List
        </Typography>
      </Link>
      <Link to="/about">
        <Typography noWrap display="inline">
          <InfoTwoToneIcon style={iconStyle} />
          About
        </Typography>
      </Link>
    </div>
  );
};
export default Header;
