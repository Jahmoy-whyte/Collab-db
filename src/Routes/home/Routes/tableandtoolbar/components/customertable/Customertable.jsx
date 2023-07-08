import css from "./CSS.module.css";
import Loading from "../../../../components/loading/Loading";
import TableRows from "../tablerows/TableRows";
const Customertable = ({
  onlineusers,
  rowclick,
  columns,
  customertable,
  searchloading,
}) => {
  return (
    <div className={css.tablediv}>
      <table>
        <tbody>
          <tr>
            {columns.map((column) => {
              return customertable.showcolumn.includes(column) ? (
                <th key={column}>{column}</th>
              ) : null;
            })}
          </tr>
          {searchloading ? (
            <tr>
              <td colSpan={customertable.showcolumn.length}>
                <Loading cu_size={10} />
              </td>
            </tr>
          ) : (
            customertable.rows.map((rowdata) => (
              <TableRows
                onlineusers={onlineusers}
                rowclick={rowclick}
                rowdata={rowdata}
                showcolumn={customertable.showcolumn}
                key={rowdata.id}
                columns={columns}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Customertable;
