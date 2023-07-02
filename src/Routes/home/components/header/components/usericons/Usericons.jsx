import css from "./CSS.module.css";
import { memo } from "react";
const Usericons = ({ name, colour, num, added = "" }) => {
  return (
    <div
      className={css.usericons}
      style={{ backgroundColor: colour, right: num * 20 }}
    >
      <h3>{name?.substring(0, 1).toUpperCase() + "" + added}</h3>
    </div>
  );
};

export default Usericons;
