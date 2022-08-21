/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Card, Chip, InputLabel, Paper, Typography } from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";
import { Divider } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
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

type IErrorResponse = { message: string };

const PageList: FC = () => {
  const [jsonLists, setJsonLists] = useState<jsonPost[]>([]);

  const [currentTag, setcurrentTag] = useState<string>("");

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

  type jsonTagName = { tag_name: string };

  const [jsonTagName, setJsonTagName] = useState<jsonTagName[]>([]);

  useEffect(() => {
    axios
      .get<jsonTagName[]>(`https://www.tierrating.com/api/taglist/?key=${getKey(8)}`)
      .then((res) => {
        setJsonTagName(res.data);
      })
      .catch((e) => console.error("err"));
  }, []);

  useEffect(() => {
    setJsonLists(
      jsonLists.map((x) =>
        x.tag_name?.includes(currentTag) || currentTag === "" ? { ...x, isDisp: true } : { ...x, isDisp: false }
      )
    );
  }, [currentTag]);

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
          onChange={(e) => setcurrentTag(e.target.value)}
          value={currentTag}
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
                    <div style={{ display: "flex" }}>
                      <Link to={`/pages/${row.page_id}`}>
                        <ArticleTwoToneIcon style={iconStyle} />
                        {row.page_name}
                      </Link>
                      <LocalOfferIcon style={iconStyle} />
                      {row.tag_name?.map((x) => (
                        <Chip
                          size="small"
                          style={{ fontSize: "0.8em" }}
                          key={x}
                          label={x}
                          variant="outlined"
                          onClick={(_e) => setcurrentTag(x)}
                        />
                      ))}
                    </div>
                  }
                  secondary={`・${row.page_description}`}
                />
              </ListItem>
              <Divider variant="middle" />
            </Fragment>
          ))}
      </List>
    </>
  );
};

export default PageList;
