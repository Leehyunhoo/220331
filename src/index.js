import React from "react";
import ReactDOM from "react-dom";
import Train from "./Train";
import Inference from "./Inference";

ReactDOM.render(
  <React.StrictMode>
    <h2 style={{ color: "blue" }}>Train</h2>
    <Train />
    <br />
    <h2 style={{ color: "blue" }}>Inference</h2>
    <Inference />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
