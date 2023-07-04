import css from "./CSS.module.css";
const Labelanddropdown = ({ lb, txt, fnsettxt, options = ["1", "2"] }) => {
  return (
    <div className={css.labelandtxt}>
      <label>{lb + ":"}</label>
      <select value={txt} onChange={(e) => fnsettxt(lb, e.target.value)}>
        {options.map((txt) => {
          return (
            <option key={txt} value={txt}>
              {txt}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Labelanddropdown;
