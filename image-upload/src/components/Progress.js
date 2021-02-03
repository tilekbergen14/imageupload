import React from "react";

export default function Progress({progress}) {
  return (
    <div className="progress my-3">
      <div
        className="progress-bar"
        role="progressbar"
        style={{width: `${progress}%`}}
      ></div>
    </div>
  );
}
