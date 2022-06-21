import { useState } from "react";
import "../App.css";
import { TierTableRow } from "../tier-table-row/TierTableRow";

export type TierTableProps = {
  // item_id: number;
  // item_name: string;
  // item_rate: number;
  // item_image_path: string;
  tierItemList: tierItem[];
};

export type tierItem = {
  item_id: number;
  item_name: string;
  item_rate: number;
  item_image_path: string;
};

export const TierTable = (props: TierTableProps) => {
  const [isDispItemInfo, setIsDispItemInfo] = useState(false);

  // const handleChangeIsDispItemInfo = (e: React.ChangeEvent<HTMLInputElement >) => {
  //   console.log(e);
  //   setIsDispItemInfo(e.target.);
  // };

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
              tierItemList={tierItemList.filter((row) => row.item_rate >= 2000)}
              colorCode="#ff7f7f"
              headerTitle="2000 - "
              isDispItemInfo={isDispItemInfo}
            />
          </tr>
          <tr>
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_rate < 2000 && row.item_rate >= 1800)}
              colorCode="#ffbf7f"
              headerTitle="1800 - "
              isDispItemInfo={isDispItemInfo}
            />
          </tr>
          <tr>
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_rate < 1800 && row.item_rate >= 1600)}
              colorCode="#ffff7f"
              headerTitle="1600 - "
              isDispItemInfo={isDispItemInfo}
            />
          </tr>
          <tr>
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_rate < 1600 && row.item_rate >= 1400)}
              colorCode="#bfff7f"
              headerTitle="1400 - "
              isDispItemInfo={isDispItemInfo}
            />
          </tr>
          <tr>
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_rate < 1400 && row.item_rate >= 1200)}
              colorCode="#7fff7f"
              headerTitle="1200 - "
              isDispItemInfo={isDispItemInfo}
            />
          </tr>
          <tr>
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_rate < 1200 && row.item_rate >= 1000)}
              colorCode="#7fffff"
              headerTitle="1000 - "
              isDispItemInfo={isDispItemInfo}
            />
          </tr>
          <tr>
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_rate < 1000)}
              colorCode="#7fbfff"
              headerTitle=" - 999"
              isDispItemInfo={isDispItemInfo}
            />
          </tr>
        </tbody>
      </table>
    </>
  );
};
