import css from "./CSS.module.css";
import { memo } from "react";
const FilterDropdown = ({
  fn_toggledropdown,
  showlist,
  icon,
  columns,
  selectfilter,
  currentfilter,
}) => {
  return (
    <>
      {showlist ? (
        <span
          className={css.backdrop}
          onClick={() => fn_toggledropdown("filter")}
        ></span>
      ) : null}
      <button
        className={css.filter}
        onClick={() => fn_toggledropdown("filter")}
      >
        <span>
          <img src={icon} /> <p>{currentfilter}</p>
        </span>
        {showlist ? (
          <div onClick={(e) => e.stopPropagation()}>
            {columns.map((column) => {
              return (
                <p onClick={() => selectfilter(column)} key={column}>
                  {column}
                </p>
              );
            })}
          </div>
        ) : null}
      </button>
    </>
  );
};

export default memo(FilterDropdown);
