import React from "react";
import { useNavigate } from "react-router-dom";

export const PrevPageButton = () => {
  const navigate = useNavigate();
  const handelBack=(event)=>{
      navigate(-1);
      // event.preventDefault();
      // event.stopPropagation();
      // event.nativeEvent.stopImmediatePropagation();
      // console.log(event)
  }
  return (
    <button
      className="btn btn-sm btn-secondary"
      tabIndex={1000}
      type="button"
      onClick={(e)=> navigate(-1)}
    >
      بازگشت
    </button>
  );
};
