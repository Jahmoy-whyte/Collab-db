import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Userinfo_context } from "../../context/Userinfo_context";

const useJoinpage = () => {
  const [userinfo, setuserinfo] = useContext(Userinfo_context);
  const [username, setusername] = useState("");
  const nav = useNavigate();

  const Gotonextpage = () => {
    if (!username) {
      toast.error("Enter A Username");
      return;
    }

    setuserinfo((prev) => ({ ...prev, username: username }));
    nav("/selectcolours");
  };

  return [username, setusername, Gotonextpage];
};
export default useJoinpage;
