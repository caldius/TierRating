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
  const { tierItemList } = props;

  return (
    <table style={{ border: "dotted 5Px violet" }}>
      <tbody>
        <tr>
          {tierItemList.some((x) => x.item_rate >= 2000) ? (
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_rate >= 2000)}
              colorCode="#ff7f7f"
              headerTitle="2000~~~"
            />
          ) : undefined}
        </tr>
        <tr>
          {tierItemList.some((x) => x.item_rate >= 1800) ? (
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_rate < 2000 && row.item_rate >= 1800)}
              colorCode="#ffbf7f"
              headerTitle="1800~~~"
            />
          ) : undefined}
        </tr>
        <tr>
          {tierItemList.some((x) => x.item_rate >= 1600) ? (
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_rate < 1800 && row.item_rate >= 1600)}
              colorCode="#ffff7f"
              headerTitle="1600~~~"
            />
          ) : undefined}
        </tr>
        <tr>
          {tierItemList.some((x) => x.item_rate >= 1400) ? (
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_rate < 1600 && row.item_rate >= 1400)}
              colorCode="#bfff7f"
              headerTitle="1400~~~"
            />
          ) : undefined}
        </tr>
        <tr>
          {tierItemList.some((x) => x.item_rate >= 1200) ? (
            <TierTableRow
              tierItemList={tierItemList.filter((row) => row.item_rate < 1400 && row.item_rate >= 1200)}
              colorCode="#7fff7f"
              headerTitle="1200~~~"
            />
          ) : undefined}
        </tr>
      </tbody>
    </table>
  );
};
