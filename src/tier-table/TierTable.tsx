import { useState } from "react";
import "../App.css";
import { TierTableRow } from "../tier-table-row/TierTableRow";

export type TierTableProps = {
  tierItemList: tierItem[];
};

export type tierItem = {
  item_id: number;
  item_name: string;
  item_rate: number;
  item_hensachi: number;
  item_image_path: string;
};

export const TierTable = (props: TierTableProps) => {
  const [isDispItemInfo, setIsDispItemInfo] = useState(false);

  const { tierItemList } = props;

  return (
    <>
      <label htmlFor="isDispItemName">
        <input
          type="checkbox"
          checked={isDispItemInfo}
          id="isDispItemName"
          onChange={() => setIsDispItemInfo(!isDispItemInfo)}
        />
        レート表示
      </label>
      <table style={{ backgroundColor: "black" }}>
        <tbody style={{ backgroundColor: "dimgray" }}>
          <tr>
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_hensachi >= 80)}
              colorCode="#ff7f7f"
              headerTitle="S+"
              isDispItemInfo={isDispItemInfo}
            />
          </tr>
          <tr>
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_hensachi < 80 && row.item_hensachi >= 70)}
              colorCode="#ffbf7f"
              headerTitle="S"
              isDispItemInfo={isDispItemInfo}
            />
          </tr>
          <tr>
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_hensachi < 70 && row.item_hensachi >= 60)}
              colorCode="#ffff7f"
              headerTitle="A"
              isDispItemInfo={isDispItemInfo}
            />
          </tr>
          <tr>
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_hensachi < 60 && row.item_hensachi >= 50)}
              colorCode="#bfff7f"
              headerTitle="B"
              isDispItemInfo={isDispItemInfo}
            />
          </tr>
          <tr>
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_hensachi < 50 && row.item_hensachi >= 40)}
              colorCode="#7fff7f"
              headerTitle="C"
              isDispItemInfo={isDispItemInfo}
            />
          </tr>
          <tr>
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_hensachi < 40 && row.item_hensachi >= 30)}
              colorCode="#7fffff"
              headerTitle="D"
              isDispItemInfo={isDispItemInfo}
            />
          </tr>
          <tr>
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_hensachi < 30)}
              colorCode="#7fbfff"
              headerTitle="E"
              isDispItemInfo={isDispItemInfo}
            />
          </tr>
        </tbody>
      </table>
    </>
  );
};
