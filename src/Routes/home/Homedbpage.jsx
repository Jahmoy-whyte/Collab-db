import useHome from "./useHome";
import css from "./hompage.module.css";
import Header from "./components/header/Header";
import Loading from "./components/loading/Loading";

import { Outlet } from "react-router-dom";
const Homedbpage = () => {
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
  ] = useHome();

  return (
    <>
      <div className={css.maincontainer}>
        <Header onlineusers={onlineusers} key={"header"} />
        {customertable.loading ? (
          <Loading
            txt={"It may take a while to connect to server.."}
            tableerror={customertable.error}
            usererror={onlineusers.error}
          />
        ) : (
          <>
            <Outlet
              context={[
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
              ]}
            />
          </>
        )}
      </div>
    </>
  );
};
export default Homedbpage;
