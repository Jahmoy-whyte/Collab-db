import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DB_Insertdata,
  DB_Updatedata,
  DB_Deletedata,
} from "../../../../databasefunctions/Customertable_function";
import { toast } from "react-toastify";
import { Userinfo_context } from "../../../../context/Userinfo_context";

const useCustomer = () => {
  const loc = useLocation();
  const nav = useNavigate();
  const rowdata = loc.state?.rowdata;
  const buttonaction = loc.state?.buttonaction;
  const [userinfo, setuserinfo] = useContext(Userinfo_context);
  const [mount, setmount] = useState(false);
  const [isloading, setisloading] = useState({
    update: false,
    delete: false,
    insert: false,
  });
  const [txt, settxt] = useState({
    id: rowdata?.id,
    firstname: rowdata?.firstname,
    lastname: rowdata?.lastname,
    gender: rowdata?.gender,
    address: rowdata?.address,
    created_at: rowdata?.created_at,
  });

  useEffect(() => {
    if (mount === false) {
      setmount(true);
      return;
    }

    userinfo.socket.emit("rowclick", {
      uuid: userinfo.uuid,
      selectedrowid: rowdata?.id,
    });

    return () => {
      userinfo.socket.emit("rowclick", {
        uuid: userinfo.uuid,
        selectedrowid: "",
      });
    };
  }, [mount]);

  const fnsettxt = (textbox, txtval) => {
    if (textbox === "Firstname") {
      settxt((prev) => ({ ...prev, firstname: txtval }));
    } else if (textbox === "Lastname") {
      settxt((prev) => ({ ...prev, lastname: txtval }));
    } else if (textbox === "Gender") {
      settxt((prev) => ({ ...prev, gender: txtval }));
    } else if (textbox === "Address") {
      settxt((prev) => ({ ...prev, address: txtval }));
    }
  };

  const fnchecktxt = () => {
    let bool = true;
    if (txt.firstname === "") {
      toast.info("Please enter firstname");
      bool = false;
    } else if (txt.lastname === "") {
      toast.info("Please enter lastname");
      bool = false;
    } else if (txt.gender === "") {
      toast.info("Please enter gender");
      bool = false;
    } else if (txt.address === "") {
      toast.info("Please enter address");
      bool = false;
    }

    return bool;
  };

  // useEffect(() => {}, []);

  const addrow = async () => {
    try {
      if (!fnchecktxt()) return;
      setisloading((prev) => ({ ...prev, insert: true }));
      const insertedrowdata = await DB_Insertdata(txt);
      userinfo.socket.emit("tablemodified", {
        action: "insert",
        rowdata: insertedrowdata[0],
      });
      toast.success("Row insert successful");
      nav(-1);
      setisloading((prev) => ({ ...prev, insert: false }));
    } catch (error) {
      setisloading((prev) => ({ ...prev, insert: false }));
      toast.error("Error occurred whilst inserting row");
      console.log(error);
    }
  };

  const updaterow = async () => {
    try {
      if (!fnchecktxt()) return;
      setisloading((prev) => ({ ...prev, update: true }));
      const responce = await DB_Updatedata(txt.id, txt);
      userinfo.socket.emit("tablemodified", {
        action: "update",
        rowdata: txt,
      });

      toast.success("Row Update successful");
      nav(-1);
      setisloading((prev) => ({ ...prev, update: false }));
    } catch (error) {
      setisloading((prev) => ({ ...prev, update: false }));
      toast.error("Error occurred whilst Updating row");
      console.log(error);
    }
  };

  const deleterow = async () => {
    try {
      setisloading((prev) => ({ ...prev, delete: true }));
      const responce = await DB_Deletedata(txt.id);
      userinfo.socket.emit("tablemodified", {
        action: "delete",
        rowdata: txt,
      });
      toast.success("Row delete successful");
      nav(-1);
      setisloading((prev) => ({ ...prev, delete: false }));
    } catch (error) {
      setisloading((prev) => ({ ...prev, delete: false }));
      toast.error("Error occurred whilst deleting row");
      console.log(error);
    }
  };

  return [
    txt,
    fnsettxt,
    buttonaction,
    addrow,
    updaterow,
    deleterow,
    isloading,
    nav,
  ];
};

export default useCustomer;
