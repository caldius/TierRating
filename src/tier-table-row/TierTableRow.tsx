import "../App.css";

export type TierTableRowProps = {
  tierItemList: tierItem[];
  /** カラーコード */
  colorCode: string;
  /** 行ヘッダ文字列 */
  headerTitle: string;
};

export type tierItem = {
  item_id: number;
  item_name: string;
  item_rate: number;
  item_image_path: string;
};

export const TierTableRow = (props: TierTableRowProps) => {
  const { tierItemList, colorCode, headerTitle } = props;

  return (
    <tr>
      <th style={{ backgroundColor: colorCode }}>{headerTitle}</th>
      <td>
        {tierItemList.map((row) => (
          <img
            key={row.item_id}
            src={`https://www.tierrating.com/create${row.item_image_path.slice(1)}`}
            alt={`${row.item_name}`}
            title={`${row.item_name} / ${row.item_rate}`}
            width={60}
          />
        ))}
      </td>
    </tr>
  );
};
