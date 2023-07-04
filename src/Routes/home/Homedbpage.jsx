import useHome from "./useHome";
import css from "./hompage.module.css";
import Header from "./components/header/Header";
import Loading from "./components/loading/Loading";

import { Outlet, useNavigate } from "react-router-dom";
const Homedbpage = () => {
  const [
    onlineusers,
    customertable,
    togglecolumn,
    columns,
    selectfilter,
    fn_searchtext,
    searchloading,
  ] = useHome();
  const nav = useNavigate();
  return (
    <>
      <div className={css.maincontainer}>
        <Header onlineusers={onlineusers} key={"header"} />
        {customertable.loading ? (
          <Loading />
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
                nav,
              ]}
            />
          </>
        )}
      </div>
    </>
  );
};
export default Homedbpage;
