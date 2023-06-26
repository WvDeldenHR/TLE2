import React from "react";
import { useNavigate } from "react-router-dom";

export function ProfileButton() {
    const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/profile'); // Go back to the previous page
  };

  return (
    <div>
      <button
        onClick={handleGoBack}
        className="fixed top-5 left-5 px-3 py-1 text-xl m-4 bg-gray-200 text-black rounded-full"
      >
        <i class="fa-solid fa-chevron-left"></i>
      </button>
    </div>
  );
}
