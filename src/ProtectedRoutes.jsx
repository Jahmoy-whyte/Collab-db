import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({
  isAuth,
  Element,
  colour,
  testforcolour = false,
  loginpage,
}) => {
  if (testforcolour) {
    if (isAuth) {
      return colour ? <Element /> : <Navigate to={"/"} />;
    } else {
      loginpage();
      return <div></div>;
    }
  } else {
    if (isAuth) {
      return <Element />;
    } else {
      loginpage();
      return <div></div>;
    }
  }
};

export default ProtectedRoutes;
