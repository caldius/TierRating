import { useState } from "react";
import "../App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { siteUrl } from "../Utils/Defines";

export type GoToUpdateProps = { pageId: number; language: string };

export type tierItem = {
  item_id: number;
  item_name: string;
  item_rate: number;
  item_hensachi: number;
  item_image_path: string;
};

/** パスワード判定コマンドの返り値 Boolで成否を返す */
export type PasswordCheckResultType = { is_verified: boolean };

export const GoToUpdate = (props: GoToUpdateProps) => {
  const [password, setPassword] = useState<string>("");
  const { pageId, language } = props;
  const isJA = language === "ja";

  /**
   * #### 投稿ボタン押下時の処理
   * -- TODO色々ちゃんと書く
   * -
   */
  const handleOnSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    // 本来のSUBMIT処理をpreventDefaultで防ぐ
    e.preventDefault();
    // // isSendingで読み込み中にする
    // setIsSending(true);

    const target = e.target as typeof e.target & { password: { value: string } };

    // 登録データ
    const data = new FormData();
    // DATAに対して各情報を付け足す
    data.append("password", target.password?.value || "");
    data.append("pageId", pageId.toString());

    // パスワード認証実行 boolを返す（ことにする）
    const passwordCheckResult = await axios.post<PasswordCheckResultType>(`${siteUrl}/api/verify/`, data);

    // 成功した場合は/edit/NNNNに移動
    if (passwordCheckResult.data.is_verified === true) {
      window.location.href = `${siteUrl}/edit/${pageId}`;
    }
  };

  return (
    <form action="" onSubmit={(e) => handleOnSubmit(e)}>
      <TextField
        name="password"
        type="password"
        id="passwordInput"
        label={isJA ? "パスワード" : "Password"}
        value={password}
        size="small"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" type="submit">
        {isJA ? "編集" : "EDIT"}
      </Button>
    </form>
  );
};
