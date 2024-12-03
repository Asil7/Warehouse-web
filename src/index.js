import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, useNavigate } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import store from "./store";
import {
  requestNotificationPermission,
  setupOnMessageListener,
} from "./firebaseMessaging";

const RootApp = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    requestNotificationPermission();
    setupOnMessageListener(navigate);
  }, [navigate]);

  return <App />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RootApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
