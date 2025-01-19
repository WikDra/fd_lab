import React from "react";
import ReactDOM from "react-dom/client";
import DataDisplayApp from "./DataDisplayApp";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataDisplayApp />
  </React.StrictMode>
);

//npx json-server --watch db.json --port 3001
