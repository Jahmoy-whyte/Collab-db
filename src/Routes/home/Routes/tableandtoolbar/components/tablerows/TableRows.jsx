import css from "./CSS.module.css";

const TableRows = ({ onlineusers, rowclick, rowdata, showcolumn, columns }) => {
  const res = onlineusers.users.findIndex(
    (user) => user.selectedrowid == rowdata.id
  );

  return (
    <tr
      onClick={() => rowclick(rowdata)}
      style={{
        border: res > -1 ? "1px solid" + onlineusers.users[res].colour : "none",
      }}
    >
      {columns.map((column, index) => {
        return showcolumn.includes(column) ? (
          <td key={index}>{rowdata[column]}</td>
        ) : null;
      })}
    </tr>
  );
};

export default TableRows;
