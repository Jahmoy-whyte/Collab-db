import css from "./CSS.module.css";

import FilterDropdown from "./components/filterDropdown/Filterdropdown";
import Buttonandicon from "./components/Buttonandicon/Buttonandicon";
import Textboxandicon from "./components/Textboxandicon/Textboxandicon";
import ColumnsDropdown from "./components/columnsDropdown/ColumnsDropdown";
import searchicon from "../../../../../../assets/images/searchicon.svg";
import columnicon from "../../../../../../assets/images/column.svg";
import filtericon from "../../../../../../assets/images/filter.svg";
import plusicon from "../../../../../../assets/images/plus.svg";

const Toolbar = ({
  fn_searchtext,
  customertable,
  columns,
  selectfilter,
  togglecolumn,
}) => {
  return (
    <div className={css.toolbar}>
      <Textboxandicon
        placeholdtxt={"Search"}
        icon={searchicon}
        fn_searchtext={fn_searchtext}
        searchtext={customertable.searchtext}
      />
      <FilterDropdown
        icon={filtericon}
        columns={columns}
        selectfilter={selectfilter}
        currentfilter={customertable.currentfilter}
      />
      <ColumnsDropdown
        icon={columnicon}
        togglecolumn={togglecolumn}
        checkedstate={customertable.showcolumn}
        columns={columns}
      />
      <Buttonandicon txt={"Add Row"} icon={plusicon} />
    </div>
  );
};

export default Toolbar;
