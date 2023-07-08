import React from "react";
import ReactDOM from "react-dom/client";
import Routing from "./Routing.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
const domain = import.meta.env.VITE_REACT_AUTH0_DOMAIN;
const clientid = import.meta.env.VITE_REACT_AUTH0_CLIENTID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientid}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Routing />
    </Auth0Provider>
  </React.StrictMode>
);
