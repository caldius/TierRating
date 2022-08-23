import "../App.css";
import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";

import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Radio from "@mui/material/Radio";
import { Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { split } from "../Utils/Utils";

export type Props = {
  //
};

/** NEWコマンドの返り値 新しくできたpge_idを返す 帰ってこなきゃ失敗のはず */
export type NewResponceType = {
  page_id: number;
};

const New: React.FC<Props> = (_props) => {
  const [isSending, setIsSending] = useState(false);
  const [pageTitleText, setPageTitleText] = useState<string>("");
  const [pageDescriptionText, setPageDescriptionText] = useState<string>("");
  const [tagNames, setTagNames] = useState<string[]>(["", "", "", "", "", "", "", "", "", ""]);
  const [whichIsText, setWhichIsText] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [imageTitles, setImageTitles] = useState<string[]>([]);
  const inputId = Math.random().toString(32).substring(2);
  const [language, setLanguage] = React.useState("ja");

  const isJA = language === "ja";
  const isEN = language === "en";

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
      whichIs: { value: string };
      language: { value: string };
    };

    const data = new FormData();

    // DATAに対して各情報を付け足す
    data.append("pageTitle", target.pageTitle?.value || "");
    data.append("pageDescription", target.pageDescription?.value || "");
    data.append("whichIs", target.whichIs?.value || "");
    data.append("language", target.language?.value || "");

    // 画像、画像タイトルの配列
    images.forEach((image) => data.append("images[]", image));
    imageTitles.forEach((imageTitle) => data.append("imageTitle[]", imageTitle));

    // 登録タグも配列化して渡す
    tagNames.forEach((tagName) => data.append("tagName[]", tagName));
    // 中身の確認
    console.log(...data.entries());

    const postedComment = await axios.post<NewResponceType>("https://www.tierrating.com/api/new/", data);
    console.log(postedComment);

    if ((postedComment?.data?.page_id ?? 0) > 0) {
      // 画像の個数制限にかからないように20件ずつに画像保存処理を分割する

      const pageId = `${postedComment?.data?.page_id}`;

      const splittedImages = split(images, 20);
      const splittedImageTitles = split(imageTitles, 20);

      for (let i = 0; i < splittedImages.length; i += 1) {
        const uploadData = new FormData();

        uploadData.append("id", pageId);
        uploadData.append("create_count", `${i}`);

        splittedImages[i].forEach((image) => uploadData.append("images[]", image));
        splittedImageTitles[i].forEach((imageTitle) => uploadData.append("imageTitle[]", imageTitle));

        // 中身の確認
        console.log(...uploadData.entries());

        // eslint-disable-next-line no-await-in-loop
        const uploadResult = await axios.post<NewResponceType>(
          "https://www.tierrating.com/api/uploadfiles/",
          uploadData
        );

        console.log(uploadResult);
      }

      // 登録処理に成功してるっぽかったら画面遷移、直接でええやろ(適当)
      window.location.href = `https://www.tierrating.com/pages/${postedComment?.data?.page_id}`;
    }
    setIsSending(false);
  };

  /**
   * ### 画像追加押下時の処理
   * - // TODO色々ちゃんと書く
   */
  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages([...images, ...e.target.files]);

    // TODOテキストリスト追加 拡張子を除外したファイル名をデフォルト設定
    setImageTitles(imageTitles.concat(Array.from(e.target.files).map((x) => x.name.split(".")[0])));
  };

  /**
   * ### 削除ボタン押下処理
   * - 画像と画像に紐付くタイトルテキストを削除する。
   * @param index 押下した削除ボタンの位置
   */
  const handleOnRemoveImage = (index: number) => {
    // 選択した画像を削除
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    // テキストも削除
    const newImageTitles = [...imageTitles];
    newImageTitles.splice(index, 1);
    setImageTitles(newImageTitles);
  };

  return (
    <Paper style={{ backgroundColor: "#efffef", margin: "4%", padding: "2%", textAlign: "center" }}>
      <form action="" onSubmit={(e) => handleOnSubmit(e)}>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <div style={{ display: "flex" }}>
            <FormControlLabel value="ja" control={<Radio />} label="日本語" />
            <FormControlLabel value="en" control={<Radio />} label="English" />
          </div>
        </RadioGroup>
        <Typography variant="h5" gutterBottom component="div" m={0} mt={1} fontStyle="">
          {isEN ? "1. Input page info" : isJA ? "1. ページ情報入力" : "謎言語"}
        </Typography>
        {/* -------- */}
        {/* タイトル */}
        {/* -------- */}
        <Paper style={{ padding: "1%", marginBottom: "1%" }}>
          <div>
            <TextField
              name="pageTitle"
              value={pageTitleText}
              label={isEN ? "Page Title" : isJA ? "タイトル" : "謎言語"}
              helperText={
                isEN ? "ex. 'Favorite Pokémon Starter Tier List'" : isJA ? "例:「好きな御三家ポケモン」" : "謎言語"
              }
              style={{ width: "20em" }}
              size="small"
              // variant="filled"
              // variant="standard"
              required
              disabled={isSending}
              onChange={(e) => setPageTitleText(e.target.value)}
            />
          </div>
          {/* </Paper> */}
          {/* -------- */}
          {/* 詳細     */}
          {/* -------- */}
          {/* <Paper style={{ paddingBottom: "1%", marginBottom: "1%" }}> */}
          <div>
            <TextField
              name="pageDescription"
              value={pageDescriptionText}
              label={isEN ? "Description" : isJA ? "詳細" : "謎言語"}
              helperText={
                isEN
                  ? "ex. 'Favorite ranking of the first three Pokémon in all series'"
                  : isJA
                  ? "例:「ポケモン御三家人気ランキング」"
                  : "謎言語"
              }
              style={{ width: "25em" }}
              size="small"
              required
              disabled={isSending}
              onChange={(e) => setPageDescriptionText(e.target.value)}
            />
          </div>
          {/* </Paper> */}
          {/* -------- */}
          {/* 判断基準 */}
          {/* -------- */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            <p style={{ fontSize: "1.3em" }}>{isEN ? "Which Is..." : isJA ? "どっちが..." : "謎言語"}</p>
            <TextField
              name="whichIs"
              value={whichIsText}
              style={{ width: "15em" }}
              label={isEN ? "Judging Criteria" : isJA ? "判断基準" : "謎言語"}
              helperText={isEN ? "ex.'stronger', 'your favorite'" : isJA ? "例:「強い」「好き」" : "謎言語"}
              size="small"
              // variant="standard"
              required
              disabled={isSending}
              onChange={(e) => setWhichIsText(e.target.value)}
            />
            <p style={{ fontSize: "1.4em" }}>?</p>
          </div>
          {/* </Paper> */}
          {/* -------- */}
          {/* タグ×10 */}
          {/* -------- */}
          {/* ↓↓ 「display:"flex",flexWrap:"wrap"」で折り返し有りの左並べになるっぽい ↓↓ */}
          {/* <Paper

        > */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              [...Array(10)].map((_, i) => (
                <div key={`${i * 1}`} style={{ position: "relative" }}>
                  <TextField
                    name="tagName"
                    value={tagNames[i]}
                    label={isEN ? `Tag${i + 1}` : isJA ? `タグ${i + 1}` : "謎言語"}
                    helperText={i === 0 && isEN ? "free word, max 10" : i === 0 && isJA ? "自由入力、10件まで" : ""}
                    size="small"
                    // variant="standard"
                    style={{ paddingRight: "10px", width: "7em" }}
                    disabled={isSending}
                    // 配列を書き換えたものをset関数に投げる
                    onChange={(e) => {
                      setTagNames(tagNames.map((x, idx) => (i === idx ? e.target.value : x)));
                    }}
                  />
                </div>
              ))
            }
          </div>
        </Paper>
        <br />
        {/* -------------- */}
        {/* 画像選択ボタン */}
        {/* -------------- */}
        <Typography variant="h5" gutterBottom component="div" m={0} mt={1} fontStyle="">
          {isEN ? "2. Select images and Input name" : isJA ? "2. 画像選択" : "謎言語"}
        </Typography>

        <Paper style={{ padding: "1%", marginBottom: "1%" }}>
          <label htmlFor={inputId}>
            <Button variant="contained" component="span">
              {isEN ? "ADD ITEM IMAGE" : isJA ? "画像追加" : "謎言語"}
            </Button>
            <input
              id={inputId}
              type="file"
              multiple
              required
              accept="image/*,.png,.jpg,.jpeg,.gif"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnAddImage(e)}
              style={{ display: "none" }}
            />
          </label>
          {/* ------------ */}
          {/* 画像一覧↓↓ */}
          {/* ------------ */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", padding: "4%" }}>
            {/* 画像を選択したら選択中のすべての画像のプレビューを表示 */}
            {images.map((image, i) => (
              <div key={`${image.name}${i * 1}`} style={{ position: "relative" }}>
                <IconButton
                  size="small"
                  aria-label="delete image"
                  style={{ position: "absolute", top: 5, left: 5, color: "#b11" }}
                  onClick={() => handleOnRemoveImage(i)}
                  tabIndex={-1}
                >
                  <CancelTwoToneIcon />
                </IconButton>
                <img alt={image.name} src={URL.createObjectURL(image)} style={{ height: "70px" }} />
                <TextField
                  name="imageTitle"
                  value={imageTitles[i]}
                  label="Image Title"
                  // variant="standard"
                  size="small"
                  style={{ width: "7em" }}
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
          {images.length === 0 && <Typography>画像未選択</Typography>}
        </Paper>
        <br />

        {isSending ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" type="submit">
            {isEN ? "SUBMIT" : isJA ? "登録" : "謎言語"}{" "}
          </Button>
        )}
      </form>
    </Paper>
  );
};

export default New;
