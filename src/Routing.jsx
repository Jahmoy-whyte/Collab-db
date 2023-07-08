import Selectcolourspage from "./Routes/Selectcolours/Selectcolourspage";
import Homedbpage from "./Routes/home/Homedbpage";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Userinfo_context } from "./context/Userinfo_context";
import { useState, useEffect } from "react";
import Customerform from "./Routes/home/Routes/customerform/Customerform";
import Toolbarandtable from "./Routes/home/Routes/tableandtoolbar/Toolbarandtable";
import "react-toastify/dist/ReactToastify.css";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoutes from "./ProtectedRoutes";
import { SyncLoader } from "react-spinners";

const Routing = () => {
  const [userinfo, setuserinfo] = useState({
    username: "",
    colour: null,
    uuid: null,
    socket: null,
  });
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div className={"authloadingdiv"}>
        <SyncLoader color="black" size={15} />
      </div>
    );
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes
          isAuth={isAuthenticated}
          Element={Selectcolourspage}
          loginpage={loginWithRedirect}
        />
      ),
    },
    {
      path: "/homedb",
      element: (
        <ProtectedRoutes
          isAuth={isAuthenticated}
          Element={Homedbpage}
          colour={userinfo.colour}
          testforcolour={true}
          loginpage={loginWithRedirect}
        />
      ),
      children: [
        {
          path: "/homedb/",
          element: <Toolbarandtable />,
        },

        {
          path: "/homedb/form",
          element: <Customerform />,
        },
      ],
    },

    {
      path: "/forms",
      element: <Customerform />,
    },

    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return (
    <>
      <Userinfo_context.Provider value={[userinfo, setuserinfo]}>
        <RouterProvider router={router} />
        <ToastContainer hideProgressBar />
      </Userinfo_context.Provider>
    </>
  );
};

export default Routing;
