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

const Toolbarandtable = () => {
  const [
    onlineusers,
    customertable,
    togglecolumn,
    columns,
    selectfilter,
    fn_searchtext,
    searchloading,
    nav,
    socketioref,
  ] = useOutletContext();
  return (
    <>
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
        <Buttonandicon
          txt={"Add Row"}
          icon={plusicon}
          nav={nav}
          rowdata={{
            id: "Auto increment",
            firstname: "",
            lastname: "",
            gender: "Male",
            address: "",
            created_at: "",
          }}
        />
      </div>

      <Customertable
        nav={nav}
        columns={columns}
        customertable={customertable}
        searchloading={searchloading}
        key={"Customertable"}
      />
    </>
  );
};

export default Toolbarandtable;
