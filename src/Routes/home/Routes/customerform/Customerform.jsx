import css from "./CSS.module.css";
import dbimg from "../../../../assets/images/database3.svg";
import backarrow from "../../../../assets/images/backarrow.svg";
import Labelandinput from "./components/labelandinput/Labelandinput";
import Labelanddropdown from "./components/labelanddropdown/Labelanddropdown";
import Button from "./components/button/Button";
const Customerform = () => {
  return (
    <div className={css.maincontainer}>
      <div className={css.formandbuttoncontainer}>
        <form className={css.formtag}>
          <div className={css.dbiconandtitlediv}>
            <img src={dbimg} />
            <h1>Collab db</h1>
          </div>
          <p>Customers Information</p>
          <Labelandinput txt={"firstname"} lb={"firstname"} />
          <Labelandinput txt={"firstname"} lb={"firstname"} />
          <Labelandinput txt={"firstname"} lb={"firstname"} />
          <Labelandinput txt={"firstname"} lb={"firstname"} />
          <Labelanddropdown txt={"firstname"} lb={"firstname"} />
          <Labelandinput txt={"firstname"} lb={"firstname"} />
          <Labelandinput txt={"firstname"} lb={"firstname"} />
        </form>

        <div className={css.Buttonsdiv}>
          <div className={css.backbuttondiv}>
            <img src={backarrow} />
            <div>
              <h4>back</h4>
              <p>Go back to home page.</p>
            </div>
          </div>

          <div className={css.buttondiv}>
            <Button txt={"Delete"} color="red" />
            <Button txt={"Update"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customerform;
