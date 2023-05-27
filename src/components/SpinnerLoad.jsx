import React from "react";

export default function SpinnerLoad({ colorClass, isSmall, inline }) {
  return (
    <span
      className={`text-center ${!inline ? "d-block" : "mx-2"} ${colorClass}`}
    >
      <div
        className={`spinner-border ${isSmall ? "spinner-border-sm" : ""}`}
        role="status"
      ></div>
    </span>
  );
}
