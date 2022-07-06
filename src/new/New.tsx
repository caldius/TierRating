// import { Link } from "react-router-dom";
import "../App.css";
import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { getKey } from "../Utils/Utils";

export type Props = {
  // ...
};

const New: React.FC<Props> = (_props) => {
  const [isCommentSending, setIsCommentSending] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imageTitles, setImageTitles] = useState<string[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const inputId = Math.random().toString(32).substring(2);

  /**
   * 投稿ボタン押下時の処理
   * // TODO色々ちゃんと書く
   */
  const handleOnSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    setIsCommentSending(true);

    const target = e.target as typeof e.target & {
      comment: { value: string };
    };

    const data = new FormData();

    images.forEach((image) => {
      data.append("images[]", image);
    });
    data.append("comment", target.comment?.value || "");

    // TODO: DATAに対していろんなテキストを付け足してあげる;

    // 中身の確認vvvvvvvvvvvvvvv
    console.log(...data.entries());
    // 中身の確認^^^^^^^^^^^^^^^^^

    // TODO こうかな？
    const postedComment = await axios.post("https://www.tierrating.com/api/new/", data);
    console.log(postedComment);

    // TODO それともこうかな？
    const postedComment2 = await axios.post("https://www.tierrating.com/api/new/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(postedComment2);

    setIsCommentSending(false);
  };

  /**
   * 画像追加押下時の処理
   * // TODO色々ちゃんと書く
   */
  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages([...images, ...e.target.files]);

    // TODOテキストリスト追加 要動作確認・・・
    setImageTitles(imageTitles.concat(Array(e.target.files.length).fill("")));
  };

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
      <TextField
        name="comment"
        value={commentText}
        multiline
        minRows={1}
        maxRows={20}
        placeholder="コメントを書く"
        fullWidth
        variant="standard"
        disabled={isCommentSending}
        onChange={(e) => setCommentText(e.target.value)}
      />
      {/* 1つのボタンで画像を選択する */}
      <label htmlFor={inputId}>
        <Button variant="contained" component="span">
          画像追加
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
      {/* 画像を選択したら選択中のすべての画像のプレビューを表示 */}
      {images.map((image, i) => (
        <div key={`${image.name}+${getKey(4)}`} style={{ position: "relative", width: "40%" }}>
          <IconButton
            size="small"
            aria-label="delete image"
            style={{ position: "absolute", top: 10, left: 10, color: "#b11" }}
            onClick={() => handleOnRemoveImage(i)}
          >
            <CancelTwoToneIcon />
          </IconButton>
          <img alt={image.name} src={URL.createObjectURL(image)} style={{ height: "100px" }} />
          <TextField
            name="comment"
            value={imageTitles[i]}
            placeholder="コ"
            variant="standard"
            disabled={isCommentSending}
            // 配列を書き換えたものをset関数に投げる
            onChange={(e) => setImageTitles([...imageTitles].splice(i, 1, e.target.value))}
          />
        </div>
      ))}
      <br />
      <br />
      {isCommentSending ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" type="submit" disableElevation disabled={!commentText}>
          投稿
        </Button>
      )}
    </form>
  );
};

export default New;
