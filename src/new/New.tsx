// import { Link } from "react-router-dom";
import "../App.css";
import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";

// import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Radio from "@mui/material/Radio";

export type Props = {
  // ...
};

const New: React.FC<Props> = (_props) => {
  const [isSending, setIsSending] = useState(false);
  const [pageTitleText, setPageTitleText] = useState<string>(""); /// ////////////1
  const [pageDescriptionText, setPageDescriptionText] = useState<string>(""); /// ////////////1
  const [tagListText, setTagListText] = useState<string>(""); /// ////////////1
  const [wchichIsText, setWhichIsText] = useState<string>(""); /// ////////////1
  const [images, setImages] = useState<File[]>([]);
  const [imageTitles, setImageTitles] = useState<string[]>([]);
  const inputId = Math.random().toString(32).substring(2);
  const [language, setLanguage] = React.useState("ja");

  // const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setLanguage((event.target as HTMLInputElement).value);
  // };

  /**
   * 投稿ボタン押下時の処理
   * // TODO色々ちゃんと書く
   * -
   */
  const handleOnSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    setIsSending(true);

    const target = e.target as typeof e.target & {
      pageTitle: { value: string };
      pageDescription: { value: string };
      tagList: { value: string };
      whichIs: { value: string };
      language: { value: string };
    };

    const data = new FormData();
    // 画像、画像タイトルの配列
    images.forEach((image) => {
      data.append("images[]", image);
    });
    imageTitles.forEach((imageTitle) => {
      data.append("imageTitle[]", imageTitle);
    });

    // DATAに対して各情報を付け足す
    data.append("pageTitle", target.pageTitle?.value || "");
    data.append("pageDescription", target.pageDescription?.value || "");
    data.append("tagList", target.tagList?.value || "");
    data.append("whichIs", target.whichIs?.value || "");
    data.append("language", target.language?.value || "");

    // 中身の確認vvvvvvvvvvvvvvv
    console.log(...data.entries());
    // 中身の確認^^^^^^^^^^^^^^^^^

    // TODO こうかな？
    const postedComment = await axios.post("https://www.tierrating.com/api/new/", data);
    console.log(postedComment);

    setIsSending(false);
  };

  /**
   * ### 画像追加押下時の処理
   * - // TODO色々ちゃんと書く
   */
  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages([...images, ...e.target.files]);

    // TODOテキストリスト追加 要動作確認・・・
    setImageTitles(imageTitles.concat(Array(e.target.files.length).fill("")));
  };

  /**
   * ### 削除ボタン押下処理
   * - 画像と画像に紐付くタイトルテキストを削除する。
   * @param index 押下した削除ボタンの位置
   */
  const handleOnRemoveImage = (index: number) => {
    // 選択した画像は削除可能
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    // TODO↑を参考にテキストリスト削除処理追加
    //      したものがこれ、要動作確認
    const newImageTitles = [...imageTitles];
    newImageTitles.splice(index, 1);
    setImageTitles(newImageTitles);
  };

  return (
    <form action="" onSubmit={(e) => handleOnSubmit(e)}>
      {/* <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel> */}
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="language"
        value={language}
        // onChange={handleLanguageChange}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <div style={{ display: "flex" }}>
          <FormControlLabel value="ja" control={<Radio />} label="日本語" />
          <FormControlLabel value="en" control={<Radio />} label="English" />
        </div>
      </RadioGroup>

      <TextField
        name="pageTitle"
        value={pageTitleText}
        label={language === "en" ? "Title" : language === "ja" ? "タイトル" : "謎言語"}
        variant="standard"
        required
        disabled={isSending}
        onChange={(e) => setPageTitleText(e.target.value)}
      />
      <br />

      <TextField
        name="pageDescription"
        value={pageDescriptionText}
        label={language === "en" ? "Description" : language === "ja" ? "詳細" : "謎言語"}
        variant="standard"
        required
        disabled={isSending}
        onChange={(e) => setPageDescriptionText(e.target.value)}
      />

      <br />

      <TextField
        name="tagList"
        value={tagListText}
        label={language === "en" ? "Tag List" : language === "ja" ? "タグ" : "謎言語"}
        variant="standard"
        required
        disabled={isSending}
        onChange={(e) => setTagListText(e.target.value)}
      />
      <br />

      <TextField
        name="whichIs"
        value={wchichIsText}
        label={language === "en" ? "Judging Criteria" : language === "ja" ? "判断基準" : "謎言語"}
        variant="standard"
        required
        disabled={isSending}
        onChange={(e) => setWhichIsText(e.target.value)}
      />

      {/* 1つのボタンで画像を選択する */}
      <br />
      <label htmlFor={inputId}>
        <Button variant="contained" component="span">
          {language === "en" ? "ADD ITEM IMAGE" : language === "ja" ? "画像追加" : "謎言語"}
        </Button>
        <input
          id={inputId}
          type="file"
          multiple
          accept="image/*,.png,.jpg,.jpeg,.gif"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnAddImage(e)}
          style={{ display: "none" }}
        />
      </label>
      <div style={{ display: "flow", flexWrap: "wrap" }}>
        {/* 画像を選択したら選択中のすべての画像のプレビューを表示 */}
        {images.map((image, i) => (
          // <div key={`${image.name}+${getKey(4)}`} style={{ position: "relative", width: "40%" }}>
          // <div key={`${image.name}${arr.length}${i * 1}`} style={{ position: "relative", width: "40%" }}>
          <div key={`${image.name}${i * 1}`} style={{ position: "relative" }}>
            <IconButton
              size="small"
              aria-label="delete image"
              style={{ position: "absolute", top: 10, left: 10, color: "#b11" }}
              onClick={() => handleOnRemoveImage(i)}
              tabIndex={-1}
            >
              <CancelTwoToneIcon />
            </IconButton>
            <img alt={image.name} src={URL.createObjectURL(image)} style={{ height: "100px" }} />
            <TextField
              name="imageTitle"
              value={imageTitles[i]}
              label="Image Title"
              variant="standard"
              required
              disabled={isSending}
              // 配列を書き換えたものをset関数に投げる
              onChange={(e) => {
                setImageTitles(imageTitles.map((x, idx) => (i === idx ? e.target.value : x)));
              }}
            />
          </div>
        ))}
      </div>
      <br />
      {isSending ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" type="submit">
          {language === "en" ? "SUBMIT" : language === "ja" ? "登録" : "謎言語"}
        </Button>
      )}
    </form>
  );
};

export default New;
