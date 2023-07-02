import css from "./CSS.module.css";
import { SyncLoader } from "react-spinners";
const Loading = ({ cu_size }) => {
  return (
    <div className={css.loadingdiv}>
      <SyncLoader color="black" size={cu_size ? cu_size : 15} />
    </div>
  );
};

export default Loading;
