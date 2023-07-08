import css from "./CSS.module.css";
import Customertable from "./components/customertable/Customertable";
import { useOutletContext } from "react-router-dom";

import Textboxandicon from "./components/Textboxandicon/Textboxandicon";
import FilterDropdown from "./components/filterDropdown/FilterDropdown";
import ColumnsDropdown from "./components/columnsDropdown/ColumnsDropdown";
import Buttonandicon from "./components/Buttonandicon/Buttonandicon";
import searchicon from "../../../../assets/images/searchicon.svg";
import columnicon from "../../../../assets/images/column.svg";
import filtericon from "../../../../assets/images/filter.svg";
import plusicon from "../../../../assets/images/plus.svg";
import { useNavigate } from "react-router-dom";
import arrowleft from "../../../../assets/images/arrowleft.svg";
import arrowright from "../../../../assets/images/arrowright.svg";
const Toolbarandtable = () => {
  const [
    onlineusers,
    customertable,
    togglecolumn,
    columns,
    selectfilter,
    fn_searchtext,
    searchloading,
    rowclick,
    db_pagination,
    fn_toggledropdown,
    fn_addbtn,
  ] = useOutletContext();

  return (
    <>
      <div className={css.toolbar}>
        <div className={css.toolgroup}>
          <Textboxandicon
            placeholdtxt={"Search"}
            icon={searchicon}
            fn_searchtext={fn_searchtext}
            searchtext={customertable.searchtext}
          />
          <FilterDropdown
            fn_toggledropdown={fn_toggledropdown}
            showlist={customertable.showFilterdropdown}
            icon={filtericon}
            columns={columns}
            selectfilter={selectfilter}
            currentfilter={customertable.currentfilter}
          />
        </div>
        <div className={css.toolgroup}>
          <ColumnsDropdown
            fn_toggledropdown={fn_toggledropdown}
            showlist={customertable.showColumndropdown}
            icon={columnicon}
            togglecolumn={togglecolumn}
            checkedstate={customertable.showcolumn}
            columns={columns}
          />
          <Buttonandicon
            txt={"Add Row"}
            icon={plusicon}
            fn_addbtn={fn_addbtn}
          />
        </div>
      </div>

      <Customertable
        onlineusers={onlineusers}
        rowclick={rowclick}
        columns={columns}
        customertable={customertable}
        searchloading={searchloading}
        key={"Customertable"}
      />

      <footer className={css.footer}>
        <div>
          <img src={arrowleft} onClick={() => db_pagination("back")} />
          <p>{customertable.pagecount}</p>
          <img src={arrowright} onClick={() => db_pagination("next")} />
        </div>
      </footer>
    </>
  );
};

export default Toolbarandtable;
