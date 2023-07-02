import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Userinfo_context } from "../../context/Userinfo_context";
const useSelectcolours = () => {
  const [userinfo, setuserinfo] = useContext(Userinfo_context);
  const nav = useNavigate();
  const [colselected, setcolselected] = useState(null);

  const nextpage = () => {
    if (!colselected) return toast.error("Select A Colour");
    setuserinfo((prev) => ({ ...prev, colour: colselected }));

    nav("/homedb");
  };

  return [colselected, setcolselected, userinfo.username, nextpage];
};

export default useSelectcolours;
