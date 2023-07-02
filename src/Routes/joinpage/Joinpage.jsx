import css from "./joinpage.module.css";
import database from "../../assets/images/database1.svg";
import useJoinpage from "./useJoinpage";

const Joinpage = () => {
  const [username, setusername, Gotonextpage] = useJoinpage();
  return (
    <>
      <div className={css.maincontainer}>
        <div className={css.container}>
          <div className={css.headingcontainer}>
            <div>
              <img src={database} />
              <h1>Collab db</h1>
            </div>
            <p>
              Collab db is a collaborative online database for anyone to use.
            </p>
          </div>

          <div className={css.inputcontainer}>
            <p>Username:</p>
            <input
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setusername(e.target.value)}
              value={username}
            />
          </div>
          <div className={css.btnandtxt}>
            <button className={css.btn} onClick={() => Gotonextpage()}>
              JOIN
            </button>
            <p className={css.tos}>
              Click <b>Here</b> To Read Our Terms Of Service.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Joinpage;
