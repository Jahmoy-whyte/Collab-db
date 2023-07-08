import css from "./CSS.module.css";
import { memo } from "react";
const ColumnsDropdown = ({
  fn_toggledropdown,
  showlist,
  icon,
  togglecolumn,
  checkedstate,
  columns,
}) => {
  return (
    <>
      {showlist ? (
        <span
          className={css.backdrop}
          onClick={() => fn_toggledropdown("column")}
        ></span>
      ) : null}
      <button
        className={css.csdropdown}
        onClick={() => fn_toggledropdown("column")}
      >
        <div className={css.csdropdowntitle}>
          <img src={icon} />
          <p>Column</p>
        </div>

        {showlist ? (
          <div
            className={css.csdropdownlistdiv}
            onClick={(e) => e.stopPropagation()}
          >
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
        ) : null}
      </button>
    </>
  );
};

export default memo(ColumnsDropdown);
