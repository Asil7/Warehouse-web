import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider
import { BrowserRouter } from "react-router-dom"; // Only one Router here
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App /> {/* Only the App component should be inside the Router */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
