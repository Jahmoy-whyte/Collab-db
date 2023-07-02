import css from "./CSS.module.css";
const Labelandinput = ({ lb, txt, settxt }) => {
  return (
    <div className={css.labelandtxt}>
      <label>{lb + ":"}</label>
      <input
        type="text"
        placeholder={"enter " + lb}
        onChange={(e) => settxt(lb, e.target.value)}
        value={txt}
      />
    </div>
  );
};

export default Labelandinput;
