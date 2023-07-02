import { useEffect, useContext, useState, useCallback } from "react";
import { io } from "socket.io-client";
import { Userinfo_context } from "../../context/Userinfo_context";
import { toast } from "react-toastify";
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
        console.log(socket.id);
        const id = await getuuid();
        socket.emit("userjoined", {
          uuid: id,
          username: userinfo.username,
          usercolor: userinfo.colour,
        }); //socketid will be add on with sent to server
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("userjoined-res", async (data) => {
      try {
        if (data.status === "nok") throw new Error(data.res.code);
        const id = await getuuid();
        console.log(data);
        setonlineusers({
          loading: false,
          users: data.res.filter((users) => users.uuid !== socket),
        });
      } catch (error) {
        toast.error("Error getting user info");
        console.log(error);
      }
    });

    socket.on("userdisconnected", async (data) => {
      try {
        if (data.status === "nok") throw new Error(data.res.code);
        const id = await getuuid();
        //   console.log(data);
        setonlineusers((prev) => ({
          ...prev,
          users: data.res.filter((users) => users.uuid !== socket),
        }));
      } catch (error) {
        toast.error("Error userdisconnected");
        console.log(error);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getuuid = async (socket) => {
    let id = localStorage.getItem("uuid");
    if (!id) {
      try {
        const getid = await fetch("http://localhost:3000/getid");
        const jsondata = await getid.json();
        localStorage.setItem("uuid", jsondata.uuid);
        id = jsondata.uuid;
      } catch (error) {
        throw new Error(error);
      }
    }

    return id;
  };
  // =====================  populate table and togglecolumn functions ======================
  const getcustomertabledata = async () => {
    try {
      const res = await fetch("http://localhost:3000/customerdata");
      if (!res.ok) throw new Error("error getting customerdata");
      const jsondata = await res.json();
      if (jsondata.status === "nok") throw new Error(jsondata.res.code);

      setcustomertable((prev) => ({
        ...prev,
        loading: false,
        rows: jsondata.res,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Error getting customerdata");
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

  useEffect(() => {
    console.log("============ check customertable");
    if (onlineusers.loading === true) return;
    if (customertable.searchtext === "") {
      getcustomertabledata(); // get customer
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
      const data = await fetch(
        `http://localhost:3000/customerdatasearch/${column}/${searchtxt}`
      );
      if (!data.ok) throw new Error("error getting searchdata");
      const jsondata = await data.json();
      if (jsondata.status === "nok") throw new Error(jsondata.res.code);
      setcustomertable((prev) => ({
        ...prev,
        rows: jsondata.res,
      }));
      setsearchloading(false);
    } catch (error) {
      toast.error("Error getting searchdata");
      console.log("getdata error  " + error);
    }
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
