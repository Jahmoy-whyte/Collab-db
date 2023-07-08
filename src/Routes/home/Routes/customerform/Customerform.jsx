import css from "./CSS.module.css";
import dbimg from "../../../../assets/images/database1.svg";
import backarrow from "../../../../assets/images/backarrow.svg";
import Labelandinput from "./components/labelandinput/Labelandinput";
import Labelanddropdown from "./components/labelanddropdown/Labelanddropdown";
import Button from "./components/button/Button";
import useCustomer from "./useCustomer";
import { useOutletContext } from "react-router-dom";
const Customerform = () => {
  const [
    txt,
    fnsettxt,
    buttonaction,
    insertrow,
    updaterow,
    deleterow,
    isloading,
    nav,
  ] = useCustomer();

  return (
    <div className={css.maincontainer}>
      <div className={css.formandbuttoncontainer}>
        <form className={css.formtag}>
          <div className={css.dbiconandtitlediv}>
            <h1>Collab db</h1>
          </div>
          <p>Customers Information</p>
          <Labelandinput
            key={1}
            txt={txt.id}
            lb={"Id"}
            disable={true}
            fnsettxt={fnsettxt}
          />
          <Labelandinput
            key={2}
            txt={txt.firstname}
            lb={"Firstname"}
            fnsettxt={fnsettxt}
          />
          <Labelandinput
            key={3}
            txt={txt.lastname}
            lb={"Lastname"}
            fnsettxt={fnsettxt}
          />
          <Labelanddropdown
            key={4}
            txt={txt.gender}
            lb={"Gender"}
            options={["Male", "Female"]}
            fnsettxt={fnsettxt}
          />
          <Labelandinput
            key={5}
            txt={txt.address}
            lb={"Address"}
            fnsettxt={fnsettxt}
          />
        </form>

        <div className={css.Buttonsdiv}>
          <button className={css.backbuttondiv} onClick={() => nav(-1)}>
            <img src={backarrow} />
            <div>
              <h4>Back</h4>
              <p>Go back to table.</p>
            </div>
          </button>

          <div className={css.buttondiv}>
            {buttonaction === "deleteandupdate" ? (
              <>
                <Button
                  txt={"Delete"}
                  color="red"
                  fn={() => deleterow()}
                  loading={isloading.delete}
                />
                <Button
                  txt={"Update"}
                  fn={() => updaterow()}
                  loading={isloading.update}
                />
              </>
            ) : (
              <Button
                txt={"Add"}
                fn={() => insertrow()}
                loading={isloading.insert}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customerform;
