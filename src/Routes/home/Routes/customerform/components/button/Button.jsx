import css from "./CSS.module.css";
import { ClipLoader } from "react-spinners";
const Button = ({ loading, txt, color = "black", fn }) => {
  return (
    <button
      disabled={loading}
      onClick={() => fn()}
      className={css.buttoncss}
      style={{ backgroundColor: color }}
    >
      {loading ? <ClipLoader color="white" size={12} /> : txt}
    </button>
  );
};

export default Button;
