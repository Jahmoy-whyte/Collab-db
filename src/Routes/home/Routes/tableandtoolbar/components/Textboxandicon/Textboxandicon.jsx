import css from "./CSS.module.css";
const Textboxandicon = ({
  placeholdtxt,
  width = 0,
  children,
  icon,
  fn_searchtext,
  searchtext,
}) => {
  return (
    <div
      className={css.textboxdiv}
      style={{ width: width != 0 ? width : null }}
    >
      <img src={icon} />
      <input
        type="text"
        placeholder={placeholdtxt}
        onChange={(e) => fn_searchtext(e.target.value)}
        value={searchtext}
      />
    </div>
  );
};

export default Textboxandicon;
