/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Chip, InputLabel } from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";
import { Divider } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

import { getKey } from "../Utils/Utils";

type jsonPost = {
  page_id: number;
  page_name: string;
  page_description: string;
  create_date: string;
  tag_name: string[];
  isDisp?: boolean;
};

type IErrorResponse = {
  message: string;
};

const PageList: FC = () => {
  const [jsonLists, setJsonLists] = useState<jsonPost[]>([]);

  useEffect(() => {
    axios
      .get<jsonPost[]>(`https://www.tierrating.com/api/pagelist/?key=${getKey(8)}`)
      .then((res) => {
        // NOTE 検証用
        console.log(res.data);

        setJsonLists(res.data);
      })
      .catch(() => console.error("err"));
  }, []);

  type jsonTagName = {
    tag_name: string;
  };

  const [jsonTagName, setJsonTagName] = useState<jsonTagName[]>([]);

  useEffect(() => {
    axios
      .get<jsonTagName[]>(`https://www.tierrating.com/api/taglist/?key=${getKey(8)}`)
      .then((res) => {
        setJsonTagName(res.data);
      })
      .catch((e) => console.error("err"));
  }, []);

  /** コンボボックス変更時のイベント
   *  選択したタグを含んでいる行はisDisp=True それ以外はFalse
   */
  const handleChangeTagCombo = (event: SelectChangeEvent) => {
    setJsonLists(
      jsonLists.map((x) =>
        x.tag_name?.includes(event.target.value) || event.target.value === ""
          ? { ...x, isDisp: true }
          : { ...x, isDisp: false }
      )
    );
  };

  const iconStyle: React.CSSProperties = { verticalAlign: "middle", display: "inline-flex" };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        {/* TODO↓このへんいろいろなおす */}
        <InputLabel id="tag-combobox-label">Filter</InputLabel>
        <Select
          labelId="tag-combobox-label"
          id="tag-combobox"
          label="TESTTESTTEST"
          onChange={handleChangeTagCombo}
          defaultValue=""
        >
          <MenuItem value="">_</MenuItem>
          {jsonTagName.map((x) => (
            <MenuItem key={x.tag_name} value={x.tag_name}>
              {x.tag_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <List>
        {/* isDispがFalseのものは表示しない ※初期値のundefinedは許可 */}
        {jsonLists
          .filter((x) => x.isDisp !== false)
          .map((row) => (
            <Fragment key={row.page_id}>
              <ListItem disablePadding>
                <ListItemText
                  primary={
                    <>
                      <Link to={`/pages/${row.page_id}`}>
                        <ArticleTwoToneIcon style={iconStyle} />
                        {row.page_name}
                      </Link>
                      {row.tag_name?.map((x) => (
                        <Chip
                          color="primary"
                          size="small"
                          style={{ fontSize: "0.2em" }}
                          key={x}
                          label={x}
                          variant="outlined"
                        />
                      ))}
                    </>
                  }
                  // ↓page_descriptionを受け取って表示するように変更する
                  secondary={row.page_description}
                />
              </ListItem>
              <Divider />
            </Fragment>
          ))}
      </List>
    </>
  );
};

export default PageList;
