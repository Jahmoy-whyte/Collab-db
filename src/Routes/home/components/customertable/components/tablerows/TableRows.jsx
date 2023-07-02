import css from "./CSS.module.css";

const TableRows = ({ data, showcolumn, columns }) => {
  return (
    <tr>
      {columns.map((column, index) => {
        return showcolumn.includes(column) ? (
          <td key={index}>{data[column]}</td>
        ) : null;
      })}
    </tr>
  );
};

export default TableRows;
