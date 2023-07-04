import css from "./CSS.module.css";

const TableRows = ({ nav, data, showcolumn, columns }) => {
  return (
    <tr
      onClick={() =>
        nav("/homedb/form", {
          state: {
            rowdata: data,
            buttonaction: "deleteandupdate",
          },
        })
      }
    >
      {columns.map((column, index) => {
        return showcolumn.includes(column) ? (
          <td key={index}>{data[column]}</td>
        ) : null;
      })}
    </tr>
  );
};

export default TableRows;
