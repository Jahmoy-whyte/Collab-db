import { useEffect, useContext, useState, useCallback, useRef } from "react";
import { io } from "socket.io-client";
import { Userinfo_context } from "../../context/Userinfo_context";
import { toast } from "react-toastify";
import { Getuuid } from "../../database-functions/UserTable_functions";
import {
  DB_Getcustomertabledata,
  DB_Getsearchinfo,
} from "../../database-functions/Customertable_function";
const useHome = () => {
  const [userinfo, setuserinfo] = useContext(Userinfo_context);
  const [onlineusers, setonlineusers] = useState({ loading: true, users: [] });
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
  });

  const [searchloading, setsearchloading] = useState(false);

  useEffect(() => {
    //sessionStorage.setItem("lastname", "Smith");
    console.log("=======================  socket");
    const socket = io("http://localhost:3000/");

    socket.on("connect", async () => {
      try {
        setuserinfo((prev) => ({ ...prev, socket: socket }));
        console.log(socket.id);
        const id = await getuserid();
        socket.emit("userjoined", {
          uuid: id,
          username: userinfo.username,
          usercolor: userinfo.colour,
        }); //socketid will be add on with sent to server
      } catch (error) {
        toast.error("Error occurred whilst getting id");
        console.log(error);
      }
    });

    socket.on("userjoined-res", async (data) => {
      try {
        if (data.status === "nok") throw new Error(data.res.code);
        const id = await getuserid();
        console.log(data);
        setonlineusers({
          loading: false,
          users: data.res.filter((users) => users.uuid !== socket),
        });
      } catch (error) {
        toast.error("Error  occurred whilst getting user info");
        console.log(error);
      }
    });

    socket.on("userdisconnected", async (data) => {
      try {
        if (data.status === "nok") throw new Error(data.res.code);
        const id = await getuserid();
        //   console.log(data);
        setonlineusers((prev) => ({
          ...prev,
          users: data.res.filter((users) => users.uuid !== socket),
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

  /*
  const GenID = () => {
    const char = "xxxxxxxx-xxxx-xxxx-xxxx";
    let newarr = char.split("");
    let id = newarr.map((c) => {
      let rnd1 = Math.floor(Math.random() * 123);
      let rnd2 = Math.floor(Math.random() * 10);
      return c !== "-" ? (rnd1 < 97 ? rnd2 : String.fromCharCode(rnd1)) : "-";
    });
    return id;
    // console.log(id.join(""));
  };
  */
  return [
    onlineusers,
    customertable,
    togglecolumn,
    columns,
    selectfilter,
    fn_searchtext,
    searchloading,
  ];
};

export default useHome;
