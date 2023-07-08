import css from "./CSS.module.css";
import { SyncLoader } from "react-spinners";

const Loading = ({
  cu_size,
  txt = null,
  usererror = false,
  tableerror = false,
}) => {
  return (
    <div className={css.loadingdiv}>
      {!tableerror && !usererror ? (
        <>
          <SyncLoader color="black" size={cu_size ? cu_size : 15} />
          {txt !== null ? <p>{txt}</p> : null}
        </>
      ) : (
        <button onClick={() => location.reload()}>Retry</button>
      )}
    </div>
  );
};

export default Loading;
