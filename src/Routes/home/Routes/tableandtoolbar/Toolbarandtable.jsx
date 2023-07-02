//import css from "./CSS.module.css";
import Toolbar from "./components/toolbar/Toolbar";
import Customertable from "../../components/customertable/Customertable";
import { useOutletContext } from "react-router-dom";
const Toolbarandtable = () => {
  const [
    onlineusers,
    customertable,
    togglecolumn,
    columns,
    selectfilter,
    fn_searchtext,
    searchloading,
  ] = useOutletContext();
  return (
    <>
      <Toolbar
        columns={columns}
        customertable={customertable}
        fn_searchtext={fn_searchtext}
        selectfilter={selectfilter}
        togglecolumn={togglecolumn}
        key={"toolbar"}
      />
      <Customertable
        columns={columns}
        customertable={customertable}
        searchloading={searchloading}
        key={"Customertable"}
      />
    </>
  );
};

export default Toolbarandtable;
