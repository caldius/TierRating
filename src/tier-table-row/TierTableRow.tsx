import { Typography } from "@material-ui/core";
import "../App.css";

export type TierTableRowProps = {
  tierItemList: tierItem[];
  colorCode: string;
  headerTitle: string;

  isDispItemInfo: boolean;
};

export type tierItem = { item_id: number; item_name: string; item_rate: number; item_image_path: string };

export const TierTableRow = (props: TierTableRowProps) => {
  const { tierItemList, colorCode, headerTitle, isDispItemInfo } = props;

  return (
    <>
      <th style={{ backgroundColor: colorCode, whiteSpace: "nowrap", padding: "0.5em" }}>{headerTitle}</th>
      <td>
        {tierItemList.map((x) => (
          <div style={{ display: "inline-block", textAlign: "center" }} key={x.item_id}>
            <img
              src={`${x.item_image_path}`}
              alt={`${x.item_name}`}
              title={`${x.item_name} / ${x.item_rate}`}
              width={60}
            />
            {isDispItemInfo ? (
              <>
                <Typography style={{ marginBlock: 0, fontSize: 8, color: "#CCC" }}>{x.item_name}</Typography>
                <Typography style={{ marginBlock: 0, fontSize: 8, color: "#CCC" }}>{`R${x.item_rate}`}</Typography>
              </>
            ) : undefined}
          </div>
        ))}
      </td>
    </>
  );
};
