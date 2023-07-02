import css from "./CSS.module.css";
import { CircleLoader } from "react-spinners";
const Button = ({ loading, txt, color = "black" }) => {
  return (
    <button className={css.buttoncss} style={{ backgroundColor: color }}>
      {loading ? <CircleLoader /> : txt}
    </button>
  );
};

export default Button;
