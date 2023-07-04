import css from "./CSS.module.css";
import { memo } from "react";
const FilterDropdown = ({ icon, columns, selectfilter, currentfilter }) => {
  return (
    <button className={css.filter}>
      <span>
        <img src={icon} /> <p>{currentfilter}</p>
      </span>

      <div>
        {columns.map((column) => {
          return (
            <p onClick={() => selectfilter(column)} key={column}>
              {column}
            </p>
          );
        })}
      </div>
    </button>
  );
};

export default memo(FilterDropdown);
