import "../App.css";

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

// function App() {
//   return (
export const TierTable = (props: TierTableProps) => {
  // const a = "123";
  const { tierItemList } = props;

  return (
    <table style={{ border: "dotted 5Px violet" }}>
      <tbody>
        <tr>
          {tierItemList.some((x) => x.item_rate >= 2000) ? (
            <>
              <th style={{ color: "#ff7f7f" }}>2000~</th>
              <td>
                {tierItemList
                  .filter((row) => row.item_rate >= 2000)
                  .map((row) => (
                    <img
                      key={row.item_id}
                      src={`https://www.tierrating.com/create${row.item_image_path.slice(1)}`}
                      alt={`${row.item_name}`}
                      title={`${row.item_name} / ${row.item_rate}`}
                      width={60}
                    />
                  ))}
              </td>
            </>
          ) : undefined}
        </tr>
        <tr>
          {tierItemList.some((x) => x.item_rate >= 1800) ? (
            <>
              <th style={{ color: "#ffbf7f" }}>1800~</th>
              <td>
                {tierItemList
                  .filter((row) => row.item_rate < 2000 && row.item_rate >= 1800)
                  .map((row) => (
                    <img
                      key={row.item_id}
                      src={`https://www.tierrating.com/create${row.item_image_path.slice(1)}`}
                      alt={`${row.item_name}`}
                      title={`${row.item_name} / ${row.item_rate}`}
                      width={60}
                    />
                  ))}
              </td>
            </>
          ) : undefined}
        </tr>
        <tr>
          {tierItemList.some((x) => x.item_rate >= 1600) ? (
            <>
              <th style={{ backgroundColor: "#ffff7f" }}>1600~</th>
              <td>
                {tierItemList
                  .filter((row) => row.item_rate < 1800 && row.item_rate >= 1600)
                  .map((row) => (
                    <img
                      key={row.item_id}
                      src={`https://www.tierrating.com/create${row.item_image_path.slice(1)}`}
                      alt={`${row.item_name}`}
                      title={`${row.item_name} / ${row.item_rate}`}
                      width={60}
                    />
                  ))}
              </td>
            </>
          ) : undefined}
        </tr>
        <tr>
          {tierItemList.some((x) => x.item_rate >= 1400) ? (
            <>
              <th style={{ backgroundColor: "#bfff7f" }}>1400~</th>
              <td>
                {tierItemList
                  .filter((row: { item_rate: number }) => row.item_rate < 1600 && row.item_rate >= 1400)
                  .map((row) => (
                    <img
                      key={row.item_id}
                      src={`https://www.tierrating.com/create${row.item_image_path.slice(1)}`}
                      alt={`${row.item_name}`}
                      title={`${row.item_name} / ${row.item_rate}`}
                      width={60}
                    />
                  ))}
              </td>
            </>
          ) : undefined}
        </tr>
        <tr>
          {tierItemList.some((x) => x.item_rate >= 1200) ? (
            <>
              <th style={{ backgroundColor: "#7fff7f" }}>1200~</th>
              <td>
                {tierItemList
                  .filter((row) => row.item_rate < 1400 && row.item_rate >= 1200)
                  .map((row) => (
                    <img
                      key={row.item_id}
                      src={`https://www.tierrating.com/create${row.item_image_path.slice(1)}`}
                      alt={`${row.item_name}`}
                      title={`${row.item_name} / ${row.item_rate}`}
                      width={60}
                    />
                  ))}
              </td>
            </>
          ) : undefined}
        </tr>
      </tbody>
    </table>
  );
};
