import React from "react";
import { useLocation } from "react-router-dom";
import { PrevPageButton } from "../../components/PrevPageButton";

export const CategoryChildren = () => {
  const location = useLocation();

  return (
    <div className="pay-3 d-flex justify-content-between">
      
      <h5 className="text-center">
        <span >زیر گروه:</span>
        <span className="text-info"> {location.state.parentData.title} </span>
      </h5>
      <PrevPageButton/>
    </div>
  );
};
