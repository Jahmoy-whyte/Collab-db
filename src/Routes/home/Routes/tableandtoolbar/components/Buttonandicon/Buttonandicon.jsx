import css from "./CSS.module.css";
const Buttonandicon = ({ txt, width = 0, icon, nav, rowdata }) => {
  return (
    <button
      onClick={() =>
        nav("/homedb/form", {
          state: {
            rowdata: rowdata,
            buttonaction: true,
          },
        })
      }
      className={css.buttonandtxt}
      style={{ width: width != 0 ? width : null }}
    >
      <img src={icon} />
      <p>{txt}</p>
    </button>
  );
};

export default Buttonandicon;
