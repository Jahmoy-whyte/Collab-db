import css from "../selectcolours.module.css";
import selected from "../../../assets/images/check.svg";
const Colourselecter = ({ colour, colselected, setcolselected, username }) => {
  return (
    <button
      onClick={() => setcolselected(colour)}
      className={css.btnselect}
      style={{ backgroundColor: colour }}
    >
      {colour === colselected ? (
        <img src={selected} />
      ) : (
        username.substring(0, 1).toUpperCase()
      )}
    </button>
  );
};

export default Colourselecter;
