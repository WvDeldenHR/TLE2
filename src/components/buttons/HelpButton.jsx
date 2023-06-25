import React from "react";
import { useNavigate } from "react-router-dom";

export function HelpButton({ postId }) {
  const navigate = useNavigate();

  const handleHelpClick = () => {
    navigate(`/reservation/${postId}`);
  };

  return (
    <div className="fixed w-full bottom-28 z-20 flex justify-center items-center">
      <button className="drop-shadow-lg font-semibold py-3 w-80 bg-primary rounded-3xl text-white" onClick={handleHelpClick}>
        Help
      </button>
    </div>
  );
}
