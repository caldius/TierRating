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
        {tierItemList.map((row) => (
          <div style={{ display: "inline-block", textAlign: "center" }} key={row.item_id}>
            <img
              // key={row.item_id}
              src={`${row.item_image_path}`}
              alt={`${row.item_name}`}
              title={`${row.item_name} / ${row.item_rate}`}
              width={60}
            />
            {isDispItemInfo ? (
              <>
                <p style={{ marginBlock: 0, fontSize: 8 }}>{row.item_name}</p>
                <p style={{ marginBlock: 0, fontSize: 8 }}>{`/ ${row.item_rate}`}</p>
              </>
            ) : undefined}
          </div>
        ))}
      </td>
    </>
  );
};
