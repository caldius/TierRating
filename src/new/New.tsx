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
import { Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
// import Tooltip from "@mui/material/Tooltip";
// import { height } from "@mui/system";
// import history from "history/createBrowserHistory";
// import { useNavigate } from "react-router-dom";

export type Props = {
  // ...
};

/** NEWコマンドの返り値 新しくできたpge_idを返す 帰ってこなきゃ失敗のはず */
export type NewResponceType = {
  page_id: number;
};

const New: React.FC<Props> = (_props) => {
  const [isSending, setIsSending] = useState(false);
  const [pageTitleText, setPageTitleText] = useState<string>(""); /// ////////////1
  const [pageDescriptionText, setPageDescriptionText] = useState<string>(""); /// ////////////1
  // const [tagListText, setTagListText] = useState<string>(""); /// ////////////1
  const [tagNames, setTagNames] = useState<string[]>(["", "", "", "", "", "", "", "", "", ""]);
  const [whichIsText, setWhichIsText] = useState<string>(""); /// ////////////1
  const [images, setImages] = useState<File[]>([]);
  const [imageTitles, setImageTitles] = useState<string[]>([]);
  const inputId = Math.random().toString(32).substring(2);
  const [language, setLanguage] = React.useState("ja");

  const isJA = language === "ja";
  const isEN = language === "en";

  // const [createdPageId, setCreatedPageId] = useState(0);

  // const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setLanguage((event.target as HTMLInputElement).value);
  // };

  // if (createdPageId > 0) {
  //   const navigate = useNavigate();
  //   navigate(`/pages/${createdPageId}`);
  // }
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
      // tagList: { value: string };
      whichIs: { value: string };
      language: { value: string };
    };

    const data = new FormData();

    // DATAに対して各情報を付け足す
    data.append("pageTitle", target.pageTitle?.value || "");
    data.append("pageDescription", target.pageDescription?.value || "");
    // data.append("tagList", target.tagList?.value || "");
    data.append("whichIs", target.whichIs?.value || "");
    data.append("language", target.language?.value || "");

    // 画像、画像タイトルの配列
    images.forEach((image) => {
      data.append("images[]", image);
    });
    imageTitles.forEach((imageTitle) => {
      data.append("imageTitle[]", imageTitle);
    });

    // 登録タグも配列化して渡す
    tagNames.forEach((tagName) => {
      data.append("tagName[]", tagName);
    });

    // 中身の確認
    console.log(...data.entries());

    const postedComment = await axios.post<NewResponceType>("https://www.tierrating.com/api/new/", data);

    console.log(postedComment);
    // if postedComment.data.

    if ((postedComment?.data?.page_id ?? 0) > 0) {
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
    // <Paper style={{ width: "90%", marginTop: "20px", marginBottom: "20px" }}>
    <Paper elevation={3} style={{ margin: "4%", padding: "2%" }}>
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
        {/* -------- */}
        {/* タイトル */}
        {/* -------- */}
        <div>
          <Typography variant="h5" gutterBottom component="div" m={0} mt={1} fontStyle="">
            {isEN ? "1. title of tier list" : isJA ? "1. 作成するリストの名前" : "謎言語"}
          </Typography>
          <TextField
            name="pageTitle"
            value={pageTitleText}
            label={isEN ? "Title" : isJA ? "タイトル" : "謎言語"}
            helperText={
              isEN ? "ex. 'Favorite Pokémon Starter Tier List'" : isJA ? "例:「好きな御三家ポケモン」" : "謎言語"
            }
            size="small"
            variant="standard"
            required
            disabled={isSending}
            onChange={(e) => setPageTitleText(e.target.value)}
          />
        </div>
        {/* -------- */}
        {/* 詳細     */}
        {/* -------- */}
        <div>
          <Typography variant="h5" gutterBottom component="div" m={0} mt={1} fontStyle="">
            {isEN ? "2. description of tier list " : isJA ? "2. リストの説明文" : "謎言語"}
          </Typography>
          <TextField
            name="pageDescription"
            value={pageDescriptionText}
            label={isEN ? "Description" : isJA ? "詳細" : "謎言語"}
            helperText={
              isEN
                ? "ex. 'Favorite ranking of the first three Pokémon in all series'"
                : isJA
                ? "例:「ポケモン全シリーズの最初の3匹の人気ランキング」"
                : "謎言語"
            }
            size="small"
            variant="standard"
            required
            disabled={isSending}
            onChange={(e) => setPageDescriptionText(e.target.value)}
          />
        </div>
        {/* -------- */}
        {/* 判断基準 */}
        {/* -------- */}
        <Typography variant="h5" gutterBottom component="div" m={0} mt={1} fontStyle="">
          {isEN ? `3.  judging criteria followed by "Which is..."` : isJA ? "3. 判断基準”" : "謎言語"}
        </Typography>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <p style={{ fontSize: "1.3em" }}>{isEN ? "Which Is..." : isJA ? "どっちが..." : "謎言語"}</p>
          <TextField
            name="whichIs"
            value={whichIsText}
            label={isEN ? "Judging Criteria" : isJA ? "判断基準" : "謎言語"}
            helperText={
              isEN
                ? "ex.'stronger', 'interesting', 'your favorite'"
                : isJA
                ? "例:「強い」「リセマラ適正が高い」「好き」"
                : "謎言語"
            }
            size="small"
            variant="standard"
            required
            disabled={isSending}
            onChange={(e) => setWhichIsText(e.target.value)}
          />
          <p style={{ fontSize: "1.3em" }}>?</p>
        </div>
        {/* -------- */}
        {/* タグ×10 */}
        {/* -------- */}
        <Typography variant="h5" gutterBottom component="div" m={0} mt={1} fontStyle="">
          {isEN ? "4. tags (free word, max 10)" : isJA ? "4. タグ（自由入力、10件まで）" : "謎言語"}
        </Typography>
        {/* ↓↓ 「display:"flex",flexWrap:"wrap"」で折り返し有りの左並べになるっぽい ↓↓ */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            [...Array(10)].map((_, i) => (
              <div key={`${i * 1}`} style={{ position: "relative" }}>
                <TextField
                  name="tagName"
                  value={tagNames[i]}
                  label={isEN ? `tag${i + 1}` : isJA ? `タグ${i + 1}` : "謎言語"}
                  size="small"
                  variant="standard"
                  style={{ paddingRight: "10px" }}
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
        <br />
        {/* 1つのボタンで画像を選択する */}
        {/* -------------- */}
        {/* 画像選択ボタン */}
        {/* -------------- */}
        <Typography variant="h5" gutterBottom component="div" m={0} mt={1} fontStyle="">
          {isEN ? "5.Select set of images for the tier list" : isJA ? "5.アップロードする画像を選択 (複数)" : "謎言語"}
        </Typography>
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
        <Typography variant="h5" gutterBottom component="div" m={0} mt={1} fontStyle="">
          {images.length > 0 && isEN ? "6.Input name each images" : images.length > 0 && isJA ? "6.各画像の名称" : ""}
        </Typography>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
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
                variant="standard"
                size="small"
                style={{ width: "100px" }}
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
            {isEN ? "SUBMIT" : isJA ? "登録" : "謎言語"}
          </Button>
        )}
      </form>
    </Paper>
  );
};

export default New;
