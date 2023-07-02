import Joinpage from "./Routes/joinpage/Joinpage";
import Selectcolourspage from "./Routes/Selectcolours/Selectcolourspage";
import Homedbpage from "./Routes/home/Homedbpage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Userinfo_context } from "./context/Userinfo_context";
import { useState } from "react";
import Customerform from "./Routes/home/Routes/customerform/Customerform";
import Toolbarandtable from "./Routes/home/Routes/tableandtoolbar/Toolbarandtable";
import "react-toastify/dist/ReactToastify.css";
const Routing = () => {
  const [userinfo, setuserinfo] = useState({ username: "", colour: null });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Joinpage />,
    },
    {
      path: "/selectcolours",
      element: <Selectcolourspage />,
    },
    {
      path: "/homedb",
      element: <Homedbpage />,
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
