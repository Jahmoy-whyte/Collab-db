import css from "./CSS.module.css";
import Usericons from "../usericons/Usericons";
import dbimg from "../../../../assets/images/database1light.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { Userinfo_context } from "../../../../context/Userinfo_context";
import { useContext } from "react";
const Header = ({ onlineusers }) => {
  const { logout } = useAuth0();
  const [userinfo, setuserinfo] = useContext(Userinfo_context);
  return (
    <>
      <div className={css.headingbardiv}>
        <div className={css.iconandtitlediv}>
          <img src={dbimg} />
          <div>
            <h1>Collab db</h1>
          </div>
        </div>

        <button className={css.logoutbtn} onClick={() => logout()}>
          Logout
        </button>
      </div>
      {onlineusers.loading === false ? (
        <div className={css.onlinediv}>
          <h3>Online:</h3>
          <div className={css.useraccountsdiv}>
            <Usericons
              key={userinfo.uuid}
              name={userinfo.username}
              colour={userinfo.colour}
            />

            {onlineusers.users.map((userdata, index) => {
              return (
                <Usericons
                  key={userdata.uuid}
                  name={userdata.username}
                  colour={userdata.colour}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Header;
