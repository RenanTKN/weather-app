import React from "react";
import gif from "../img/loading.gif";

function Loading(props) {
  return (
    <div className="loading">
      <img src={gif} alt="loading" />
    </div>
  );
}

export default Loading;
