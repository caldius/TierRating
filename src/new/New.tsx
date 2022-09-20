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
import { cLog, split } from "../Utils/Utils";
import { siteUrl } from "../Utils/Defines";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

export type Props = {
  //
};

/** NEWコマンドの返り値 新しくできたpage_idを返す 帰ってこなきゃ失敗のはず */
export type NewResponceType = { page_id: number };

/** 言語種類 */
export type LanguageType = "ja" | "en";

const New: React.FC<Props> = (_props) => {
  const [isSending, setIsSending] = useState(false);
  const [pageTitleText, setPageTitleText] = useState<string>("");
  const [pageDescriptionText, setPageDescriptionText] = useState<string>("");
  const [tagNames, setTagNames] = useState<string[]>(["", "", "", "", "", "", "", "", "", ""]);
  const [whichIsText, setWhichIsText] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [imageTitles, setImageTitles] = useState<string[]>([]);
  const inputId = Math.random().toString(32).substring(2);
  const [language, setLanguage] = React.useState<LanguageType>("ja");

  const isJA = language === "ja";
  // const isEN = language === "en";

  /**
   * #### 投稿ボタン押下時の処理
   * // TODO色々ちゃんと書く
   * -
   */
  const handleOnSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    // 本来のSUBMIT処理をpreventDefaultで防ぐ
    e.preventDefault();
    // isSendingで読み込み中にする
    setIsSending(true);

    const target = e.target as typeof e.target & {
      pageTitle: { value: string };
      pageDescription: { value: string };
      whichIs: { value: string };
      language: { value: string };
      pwd: { value: string };
    };

    // -------------
    // 登録処理１
    // -------------

    // 登録データ
    const data = new FormData();

    // DATAに対して各情報を付け足す
    data.append("pageTitle", target.pageTitle?.value || "");
    data.append("pageDescription", target.pageDescription?.value || "");
    data.append("whichIs", target.whichIs?.value || "");
    data.append("language", target.language?.value || "");
    data.append("password", target.pwd?.value || "");

    // 登録タグも配列化して渡す
    tagNames.forEach((tagName) => data.append("tagName[]", tagName));
    // 中身の確認
    cLog(...data.entries());

    // 登録処理実行 登録されたpage_idを返す
    const postedComment = await axios.post<NewResponceType>(`${siteUrl}/api/new/`, data);

    const pageId = `${postedComment?.data?.page_id ?? ""}`;

    if (pageId === "") {
      // pageId=""なら処理失敗と判断、ここで終了
      setIsSending(false);

      return;
    }

    // -------------
    // 登録処理２
    // -------------

    const splittedImages = split(images, 20);
    const splittedImageTitles = split(imageTitles, 20);

    // NOTE FORループにしないと複数登録が安定しないようなのでダサいが仕方なく。。。
    for (let i = 0; i < splittedImages.length; i += 1) {
      const uploadData = new FormData();

      uploadData.append("id", pageId);
      uploadData.append("create_count", `${i}`);

      splittedImages[i].forEach((image) => uploadData.append("images[]", image));
      splittedImageTitles[i].forEach((imageTitle) => uploadData.append("imageTitle[]", imageTitle));

      // 中身の確認
      console.log(...uploadData.entries());

      // eslint-disable-next-line no-await-in-loop
      const uploadResult = await axios.post<NewResponceType>("https://www.tierrating.com/api/uploadfiles/", uploadData);

      console.log(uploadResult);
    }
    // 登録処理に成功してるっぽかったら画面遷移、直接でええやろ(適当)
    // window.location.href = `https://www.tierrating.com/pages/${postedComment?.data?.page_id}`;
    window.location.href = `${siteUrl}/pages/${postedComment?.data?.page_id}`;

    // 読み込み中終了
    setIsSending(false);
  };

  /**
   * ### 画像追加押下時の処理
   * - // TODO色々ちゃんと書く
   */
  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setImages([...images, ...e.target.files]);
    // テキストリスト追加 拡張子を除外したファイル名をデフォルト設定
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
          name="language"
          value={language}
          // 型アサーションでLangageTypeに固定していることに注意
          onChange={(e) => setLanguage(e.target.value as LanguageType)}
        >
          <div style={{ display: "flex" }}>
            <FormControlLabel value="ja" control={<Radio />} label="日本語" />
            <FormControlLabel value="en" control={<Radio />} label="English" />
          </div>
        </RadioGroup>
        <Typography variant="h5" gutterBottom component="div" m={0} mt={1} fontStyle="">
          {isJA ? "1. ページ情報入力" : "1. Input page info"}
        </Typography>
        {/* -------- */}
        {/* タイトル */}
        {/* -------- */}
        <Paper style={{ padding: "1%", marginBottom: "1%" }}>
          <div>
            <TextField
              name="pageTitle"
              value={pageTitleText}
              label={isJA ? "タイトル" : "Page Title"}
              helperText={isJA ? "例:「〇〇強キャラランキング」" : "ex. 'Pokémon Strong Ranking Tier List'"}
              style={{ width: "20em" }}
              size="small"
              required
              disabled={isSending}
              onChange={(e) => setPageTitleText(e.target.value)}
            />
          </div>
          {/* -------- */}
          {/* 詳細     */}
          {/* -------- */}
          <div>
            <TextField
              name="pageDescription"
              value={pageDescriptionText}
              label={isJA ? "詳細" : "Description"}
              helperText={isJA ? "タイトルを補足する説明文" : "description that complements the title"}
              style={{ width: "25em" }}
              size="small"
              // required
              disabled={isSending}
              onChange={(e) => setPageDescriptionText(e.target.value)}
            />
          </div>
          {/* -------- */}
          {/* 判断基準 */}
          {/* -------- */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            <p style={{ fontSize: "1.3em" }}>{isJA ? "どっちが..." : "Which Is..."}</p>
            <TextField
              name="whichIs"
              value={whichIsText}
              style={{ width: "15em" }}
              label={isJA ? "判断基準" : "Judging Criteria"}
              helperText={isJA ? "例:「強い」「好き」" : "ex.'stronger', 'your favorite'"}
              size="small"
              required
              disabled={isSending}
              onChange={(e) => setWhichIsText(e.target.value)}
            />
            <p style={{ fontSize: "1.4em" }}>?</p>
          </div>
          {/* -------- */}
          {/* タグ×10 */}
          {/* -------- */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              [...Array(10)].map((_, i) => (
                <div key={`${i * 1}`} style={{ position: "relative" }}>
                  <TextField
                    name="tagName"
                    value={tagNames[i]}
                    label={isJA ? `タグ${i + 1}` : `Tag${i + 1}`}
                    helperText={i === 0 && isJA ? "自由入力、10件まで" : i === 0 ? "free word, max 10" : ""}
                    size="small"
                    style={{ paddingRight: "10px", width: "7em" }}
                    disabled={isSending}
                    // 配列を書き換えたものをset関数に投げる
                    onChange={(e) => setTagNames(tagNames.map((x, idx) => (i === idx ? e.target.value : x)))}
                  />
                </div>
              ))
            }
          </div>

          {/* ---------- */}
          {/* パスワード */}
          {/* ---------- */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", padding: "2%" }}>
            <TextField
              name="pwd"
              value={pwd}
              style={{ width: "15em" }}
              label={isJA ? "パスワード" : "password"}
              helperText={
                isJA ? "登録後に編集する可能性がなければ不要" : "Unnecessary If not to edit after registration"
              }
              size="small"
              disabled={isSending}
              type="password"
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
        </Paper>
        <br />
        {/* -------------- */}
        {/* 画像選択ボタン */}
        {/* -------------- */}
        <Typography variant="h5" gutterBottom component="div" m={0} mt={1} fontStyle="">
          {isJA ? "2. 画像選択" : "2. Select images and Input name"}
        </Typography>

        <Paper style={{ padding: "1%", marginBottom: "1%" }}>
          <label htmlFor={inputId}>
            <Button variant="contained" component="span">
              {isJA ? "画像追加" : "ADD ITEM IMAGE"}
            </Button>
            <input
              id={inputId}
              type="file"
              multiple
              required
              accept="image/*,.png,.jpg,.jpeg,.gif"
              disabled={isSending}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnAddImage(e)}
              style={{ display: "none" }}
            />
          </label>
          {/* ------------ */}
          {/* 画像一覧↓↓ */}
          {/* ------------ */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", padding: "4%" }}>
            {/* 画像を選択したら選択中のすべての画像のプレビューを表示 */}
            {images.length === 0 && <Typography>画像未選択</Typography>}
            {images.map((image, i) => (
              <Paper
                key={`${image.name}${i * 1}`}
                style={{ position: "relative", padding: "1%", marginBottom: "1%", backgroundColor: "#efffef" }}
              >
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
                  size="small"
                  style={{ width: "7em" }}
                  required
                  disabled={isSending}
                  // 配列を書き換えたものをset関数に投げる
                  onChange={(e) => setImageTitles(imageTitles.map((x, idx) => (i === idx ? e.target.value : x)))}
                />
              </Paper>
            ))}
          </div>
        </Paper>
        <br />

        {isSending ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" type="submit">
            {isJA ? "登録" : "SUBMIT"}
          </Button>
        )}
      </form>
    </Paper>
  );
};

export default New;
