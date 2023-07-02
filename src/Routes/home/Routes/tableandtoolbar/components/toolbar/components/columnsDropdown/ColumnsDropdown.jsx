import css from "./CSS.module.css";
import { memo } from "react";
const ColumnsDropdown = ({ icon, togglecolumn, checkedstate, columns }) => {
  return (
    <button className={css.csdropdown}>
      <div className={css.csdropdowntitle}>
        <img src={icon} />
        <p>Column</p>
      </div>
      <div className={css.csdropdownlistdiv}>
        {columns.map((column) => {
          return (
            <div key={column} className={css.csdropdownlistdivitem}>
              <input
                id={column}
                type="checkbox"
                onChange={() => {
                  togglecolumn(column);
                }}
                checked={checkedstate.includes(column)}
              />
              <label htmlFor={column}>{column}</label>
            </div>
          );
        })}
      </div>
    </button>
  );
};

export default memo(ColumnsDropdown);
