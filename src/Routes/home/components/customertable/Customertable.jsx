import css from "./CSS.module.css";
import Loading from "../loading/Loading";
import TableRows from "./components/tablerows/TableRows";
const Customertable = ({ columns, customertable, searchloading }) => {
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
                <Loading />
              </td>
            </tr>
          ) : (
            customertable.rows.map((data) => (
              <TableRows
                data={data}
                showcolumn={customertable.showcolumn}
                key={data.id}
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
