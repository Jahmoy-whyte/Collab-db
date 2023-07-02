import css from "./CSS.module.css";
const Labelanddropdown = ({
  lb,
  txt,
  settxt,
  options = ["wd", "wdwd", "wdwd"],
}) => {
  return (
    <div className={css.labelandtxt}>
      <label>{lb + ":"}</label>
      <select onChange={(e) => settxt(lb, e.target.value)}>
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
