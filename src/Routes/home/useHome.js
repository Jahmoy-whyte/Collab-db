import { useEffect, useContext, useState, useCallback, useRef } from "react";
import { io } from "socket.io-client";
import { Userinfo_context } from "../../context/Userinfo_context";
import { toast } from "react-toastify";
import { Getuuid } from "../../databasefunctions/UserTable_functions";
import {
  DB_Getcustomertabledata,
  DB_Getsearchinfo,
  DB_pagination,
} from "../../databasefunctions/CusTable_functions";

import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const useHome = () => {
  const [userinfo, setuserinfo] = useContext(Userinfo_context);
  const [onlineusers, setonlineusers] = useState({
    loading: true,
    users: [],
    error: false,
  });
  const columns = [
    "id",
    "firstname",
    "lastname",
    "gender",
    "address",
    "created_at",
  ];
  const [customertable, setcustomertable] = useState({
    loading: true,
    rows: [],
    showcolumn: columns,
    searchtext: "",
    currentfilter: "id",
    page: 0,
    pagecount: 1,
    showFilterdropdown: false,
    showColumndropdown: false,
    error: false,
  });
  const nav = useNavigate();
  const [searchloading, setsearchloading] = useState(false);
  const { user } = useAuth0();
  useEffect(() => {
    //sessionStorage.setItem("lastname", "Smith");
    console.log("=======================  socket");
    const socket = io("http://collabdb-server.onrender.com");
    const id = user.sub;
    socket.on("connect", async () => {
      console.log(socket.id);
      setuserinfo((prev) => ({ ...prev, socket: socket, uuid: id }));
      socket.emit("userjoined", {
        uuid: id,
        username: userinfo.username,
        usercolor: userinfo.colour,
      }); //socketid will be add on with sent to server
    });

    socket.on("userjoined-res", async (data) => {
      try {
        if (data.status === "nok") throw new Error(data.res.code);
        console.log(data);
        setonlineusers({
          loading: false,
          users: data.res.filter((users) => users.uuid !== id),
        });
      } catch (error) {
        toast.error("Error  occurred whilst getting user info");
        setonlineusers((prev) => ({
          ...prev,
          error: true,
        }));
        console.log(error);
      }
    });

    socket.on("userdisconnected", async (data) => {
      try {
        if (data.status === "nok") throw new Error(data.res.code);
        setonlineusers((prev) => ({
          ...prev,
          users: data.res.filter((users) => users.uuid !== id),
        }));
      } catch (error) {
        toast.error("Error occurred on userdisconnected");
        console.log(error);
      }
    });

    socket.on("tablemodified-res", (data) => {
      console.log(data);
      if (data.action == "insert") {
        setcustomertable((prev) => ({
          ...prev,
          rows: [...prev.rows, data.rowdata],
        }));
      } else if (data.action == "update") {
        setcustomertable((prev) => ({
          ...prev,
          rows: prev.rows.map((row) => {
            return row.id === data.rowdata.id ? data.rowdata : row;
          }),
        }));
      } else if (data.action == "delete") {
        setcustomertable((prev) => ({
          ...prev,
          rows: prev.rows.filter((row) => row.id !== data.rowdata.id),
        }));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getuserid = async () => {
    let userid = localStorage.getItem("uuid");
    if (!userid) {
      const id = await Getuuid();
      localStorage.setItem("uuid", id);
      userid = id;
    }

    return userid;
  };

  // =====================  populate table and togglecolumn functions ======================
  const getcustomertabledata = async () => {
    try {
      const responce = await DB_Getcustomertabledata();
      setcustomertable((prev) => ({
        ...prev,
        loading: false,
        rows: responce,
      }));
    } catch (error) {
      console.log(error);
      setcustomertable((prev) => ({
        ...prev,
        error: true,
      }));
      toast.error("Error occurred whilst getting customerdata");
    }
  };

  const togglecolumn = useCallback(
    (column) => {
      //alert(column);
      let newarr = [];
      if (customertable.showcolumn.includes(column)) {
        newarr = customertable.showcolumn.filter((c) => c !== column);
      } else {
        newarr = [...customertable.showcolumn, column];
      }

      setcustomertable((prev) => ({
        ...prev,
        showcolumn: newarr,
      }));
    },
    [customertable.showcolumn]
  );

  // =====================  Search and filter functions ======================

  useEffect(() => {
    console.log("============ check customertable");
    if (onlineusers.loading === true) return;
    if (customertable.searchtext === "") {
      getcustomertabledata(); // get customer table rows
      setsearchloading(false);
      console.log("log rendertimes");
      return;
    }
    setsearchloading(true);
    console.log("============== customertable");
    const stoptime = setTimeout(() => {
      getsearchinfo(customertable.currentfilter, customertable.searchtext);
    }, 1000);

    return () => clearTimeout(stoptime);
  }, [
    customertable.searchtext,
    customertable.currentfilter,
    onlineusers.loading,
  ]);

  const getsearchinfo = async (column, searchtxt) => {
    try {
      const responce = await DB_Getsearchinfo(column, searchtxt);
      setcustomertable((prev) => ({
        ...prev,
        rows: responce,
      }));
      setsearchloading(false);
    } catch (error) {
      toast.error("Error occurred whilst getting search");
      console.log(error);
    }
  };

  const selectfilter = (txt) => {
    setcustomertable((prev) => ({
      ...prev,
      currentfilter: txt,
    }));
  };

  const fn_searchtext = (txt) => {
    setcustomertable((prev) => ({
      ...prev,
      searchtext: txt,
    }));
  };

  const fn_toggledropdown = (list) => {
    if (list === "filter") {
      setcustomertable((prev) => ({
        ...prev,
        showFilterdropdown: !customertable.showFilterdropdown,
      }));
    } else if (list === "column") {
      setcustomertable((prev) => ({
        ...prev,
        showColumndropdown: !customertable.showColumndropdown,
      }));
    }
  };

  const fn_addbtn = () => {
    const rowdata = {
      id: "Auto increment",
      firstname: "",
      lastname: "",
      gender: "Male",
      address: "",
      created_at: "",
    };
    nav("/homedb/form", {
      state: {
        rowdata: rowdata,
        buttonaction: "add",
      },
    });
  };

  const rowclick = (rowdata) => {
    nav("/homedb/form", {
      state: {
        rowdata: rowdata,
        buttonaction: "deleteandupdate",
      },
    });
  };

  const db_pagination = async (action) => {
    let page = 0;
    let pagecount = 1;
    let rows = [];
    try {
      if (action === "next") {
        page = customertable.page + 20;
        pagecount = customertable.pagecount + 1;
        rows = await DB_pagination(page);
      } else {
        page = customertable.page - 20;
        if (page < 0) return;
        pagecount = customertable.pagecount - 1;
        rows = await DB_pagination(page);
      }

      setcustomertable((prev) => ({
        ...prev,
        rows: rows,
        page: page,
        pagecount: pagecount,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Error occurred getting page");
    }
  };
  return [
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
  ];
};

export default useHome;
