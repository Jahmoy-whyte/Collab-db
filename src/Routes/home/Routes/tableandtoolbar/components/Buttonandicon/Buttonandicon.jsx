import css from "./CSS.module.css";
const Buttonandicon = ({ txt, width = 0, icon, fn_addbtn }) => {
  return (
    <button
      onClick={() => fn_addbtn()}
      className={css.buttonandtxt}
      style={{ width: width != 0 ? width : null }}
    >
      <img src={icon} />
      <p>{txt}</p>
    </button>
  );
};

export default Buttonandicon;
