import css from "./selectcolours.module.css";
import databaseimg from "../../assets/images/database1.svg";
import Colourselecter from "./components/Colourselecter";
import useSelectcolours from "./useSelectcolours";

const Selectcolourspage = () => {
  const [colselected, setcolselected, username, nextpage] = useSelectcolours();
  return (
    <>
      <div className={css.maincontainer}>
        <div className={css.container}>
          <div className={css.headingcontainer}>
            <div>
              <img src={databaseimg} />
              <h1>Collab db</h1>
            </div>
            <p>Select Your Colour.</p>
          </div>

          <div className={css.colourdiv}>
            <Colourselecter
              colour={"#FF4D4D"}
              colselected={colselected}
              setcolselected={setcolselected}
              username={username}
            />
            <Colourselecter
              colour={"#5EEE3B"}
              colselected={colselected}
              setcolselected={setcolselected}
              username={username}
            />
            <Colourselecter
              colour={"#F47A00"}
              colselected={colselected}
              setcolselected={setcolselected}
              username={username}
            />
            <Colourselecter
              colour={"#007FF4"}
              colselected={colselected}
              setcolselected={setcolselected}
              username={username}
            />
            <Colourselecter
              colour={"#8D22B2"}
              colselected={colselected}
              setcolselected={setcolselected}
              username={username}
            />
          </div>

          <button onClick={() => nextpage()} className={css.btn}>
            NEXT
          </button>
        </div>
      </div>
    </>
  );
};

export default Selectcolourspage;
