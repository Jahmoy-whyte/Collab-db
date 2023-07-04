import css from "./CSS.module.css";
const Labelandinput = ({ lb, txt, fnsettxt, disable = false }) => {
  return (
    <div className={css.labelandtxt}>
      <label>{lb + ":"}</label>
      <input
        disabled={disable}
        type="text"
        placeholder={"enter " + lb}
        onChange={(e) => fnsettxt(lb, e.target.value)}
        value={txt}
      />
    </div>
  );
};

export default Labelandinput;
