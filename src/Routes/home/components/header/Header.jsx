import css from "./CSS.module.css";
import Usericons from "./components/usericons/Usericons";
import dbimg from "../../../../assets/images/database1light.svg";

const Header = ({ onlineusers }) => {
  return (
    <div className={css.headingbardiv}>
      <div className={css.iconandtitlediv}>
        <img src={dbimg} />
        <div>
          <h1>Collab db</h1>
        </div>
      </div>
      <div className={css.useraccounts}>
        {onlineusers.users.map((userdata, index) => {
          if (index < 2) {
            return (
              <Usericons
                key={userdata.uuid}
                name={userdata.username}
                colour={userdata.colour}
                num={index}
              />
            );
          }
        })}

        {onlineusers.users.length > 2 ? (
          <Usericons
            key={"number"}
            name={String(onlineusers.users.length - 2)}
            colour={"black"}
            added="+"
            num={2}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Header;
