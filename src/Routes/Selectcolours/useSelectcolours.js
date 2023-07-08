import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Userinfo_context } from "../../context/Userinfo_context";
import { useAuth0 } from "@auth0/auth0-react";
const useSelectcolours = () => {
  const [userinfo, setuserinfo] = useContext(Userinfo_context);
  const nav = useNavigate();
  const [colselected, setcolselected] = useState(null);
  const { user } = useAuth0();
  const nextpage = () => {
    if (!colselected) return toast.error("Select A Colour");
    setuserinfo((prev) => ({
      ...prev,
      colour: colselected,
      username: user.name,
    }));

    nav("/homedb");
  };

  return [colselected, setcolselected, user.name, nextpage];
};

export default useSelectcolours;
